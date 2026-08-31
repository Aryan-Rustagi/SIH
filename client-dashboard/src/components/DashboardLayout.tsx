import React from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardTopBar } from './DashboardTopBar';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <DashboardTopBar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
