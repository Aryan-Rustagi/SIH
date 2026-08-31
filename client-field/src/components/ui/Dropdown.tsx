import React, { useState, useRef, useEffect } from 'react';

export interface DropdownItem {
  label: string;
  value: any;
  icon?: React.ReactNode;
  divider?: boolean;
  dangerous?: boolean;
}

interface DropdownProps {
  items: DropdownItem[];
  onSelect: (value: any) => void;
  trigger: React.ReactNode;
  align?: 'left' | 'right';
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  onSelect,
  trigger,
  align = 'left',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: any) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center"
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200/60 overflow-hidden z-50 animate-fade-in ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.divider ? (
                <div className="h-px bg-slate-200/50" />
              ) : (
                <button
                  onClick={() => handleSelect(item.value)}
                  className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center gap-3 ${
                    item.dangerous
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  {item.label}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
