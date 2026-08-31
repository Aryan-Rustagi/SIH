import React from 'react';
import { Camera, Upload, ImagePlus } from 'lucide-react';

export const PhotoUploader: React.FC<{ onUpload: (url: string) => void }> = ({ onUpload }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-8 flex flex-col items-center justify-center text-slate-500 cursor-pointer transition-all duration-300 bg-gradient-to-br from-slate-50 to-white group hover:from-teal-50/50 hover:to-white border-2 border-dashed border-slate-300 hover:border-teal-400">
      {/* Background decorative circle */}
      <div className="absolute w-32 h-32 rounded-full bg-teal-500/5 -bottom-8 -right-8 group-hover:scale-150 transition-transform duration-500" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-teal-100 group-hover:to-teal-200 flex items-center justify-center mb-3 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-105">
          <ImagePlus size={28} className="text-slate-400 group-hover:text-teal-600 transition-colors duration-300" />
        </div>
        <span className="font-bold text-sm text-slate-700 group-hover:text-teal-700 transition-colors">Tap to Capture or Upload</span>
        <span className="text-xs mt-1.5 text-slate-400 font-medium">GPS coordinates will be embedded automatically</span>
      </div>
    </div>
  );
};
