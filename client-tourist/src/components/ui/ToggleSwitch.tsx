import React from 'react';

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label = 'Simulate Offline Mode' }) => (
  <label className="inline-flex items-center gap-3 cursor-pointer text-gray-600">
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 rounded-full transition-colors duration-200 ${checked ? 'bg-red-500' : 'bg-green-500'}`}
    >
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
    <span>{label}</span>
  </label>
);
