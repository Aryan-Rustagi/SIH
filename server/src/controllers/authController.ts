import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { User, IUser, UserRole } from '../models/User.js';
import { AuthRequest } from '../middleware/auth.js';

// Helper to generate JWT
const generateToken = (id: string, role: UserRole): string => {
  const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_tourist_safety_2026';
  return jwt.sign({ id, role }, secret, {
    expiresIn: '30d',
  });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'A user with this email already exists',
      });
      return;
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      role: role || 'FIELD_OFFICER',
    });

    const token = generateToken(user._id.toString(), user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    const token = generateToken(user._id.toString(), user.role);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }

    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        role: req.user.role,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }

    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      user: {
        id: user?._id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        role: user?.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { credential, role } = req.body;
    if (!credential) {
      res.status(400).json({ success: false, message: 'Google credential token is required' });
      return;
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      res.status(400).json({ success: false, message: 'Invalid Google token payload' });
      return;
    }

    const { email, name, sub: googleId, picture: avatar } = payload;

    let user = await User.findOne({
      $or: [{ googleId }, { email: email.toLowerCase() }],
    });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
      }
      if (avatar && !user.avatar) {
        user.avatar = avatar;
      }
      await user.save();
    } else {
      user = await User.create({
        name: name || 'Google User',
        email: email.toLowerCase(),
        googleId,
        avatar,
        role: role || 'FIELD_OFFICER',
      });
    }

    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Google Auth Error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Google authentication failed',
    });
  }
};

export const getTourists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.find()
      .select('-password -__v')
      .sort('-createdAt');
      
    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};
