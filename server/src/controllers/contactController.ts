import { Response, NextFunction } from 'express';
import { EmergencyContact } from '../models/EmergencyContact.js';
import { AuthRequest } from '../middleware/auth.js';

// Get contacts for logged in user
export const getContacts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }

    const contacts = await EmergencyContact.find({ userId: req.user._id }).sort({
      isPrimary: -1,
      createdAt: 1,
    });

    res.json({
      success: true,
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

// Add an emergency contact
export const addContact = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }

    const { name, phone, relationship, isPrimary } = req.body;

    if (!name || !phone) {
      res.status(400).json({
        success: false,
        message: 'Contact name and phone number are required',
      });
      return;
    }

    // If setting as primary, demote other primary contacts
    if (isPrimary) {
      await EmergencyContact.updateMany(
        { userId: req.user._id },
        { isPrimary: false }
      );
    }

    const contact = await EmergencyContact.create({
      userId: req.user._id,
      name,
      phone,
      relationship,
      isPrimary: Boolean(isPrimary),
    });

    res.status(201).json({
      success: true,
      message: 'Emergency contact added',
      contact,
    });
  } catch (error) {
    next(error);
  }
};

// Update contact
export const updateContact = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }

    const { id } = req.params;
    const { name, phone, relationship, isPrimary } = req.body;

    const contact = await EmergencyContact.findOne({
      _id: id,
      userId: req.user._id,
    });

    if (!contact) {
      res.status(404).json({ success: false, message: 'Contact not found' });
      return;
    }

    if (isPrimary) {
      await EmergencyContact.updateMany(
        { userId: req.user._id },
        { isPrimary: false }
      );
    }

    contact.name = name || contact.name;
    contact.phone = phone || contact.phone;
    contact.relationship = relationship !== undefined ? relationship : contact.relationship;
    contact.isPrimary = isPrimary !== undefined ? isPrimary : contact.isPrimary;
    await contact.save();

    res.json({
      success: true,
      message: 'Emergency contact updated',
      contact,
    });
  } catch (error) {
    next(error);
  }
};

// Delete contact
export const deleteContact = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }

    const { id } = req.params;
    const contact = await EmergencyContact.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!contact) {
      res.status(404).json({ success: false, message: 'Contact not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Emergency contact deleted',
    });
  } catch (error) {
    next(error);
  }
};
