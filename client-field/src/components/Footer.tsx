import React from 'react';

export const Footer: React.FC<{ portal: string }> = ({ portal }) => {
  return (
    <footer className="py-6 border-t border-slate-200 text-center text-slate-500 text-xs font-semibold">
      &copy; {new Date().getFullYear()} NER Smart Logistics Accessibility Intelligence Platform. <br/> Built for Smart India Hackathon.
    </footer>
  );
};
