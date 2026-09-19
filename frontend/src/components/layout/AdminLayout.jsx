import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isOwner } = useAuth();

  // Route Guard: Unauthenticated or non-owner users cannot access admin screens
  if (!isAuthenticated || !isOwner) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-[#1A050C] text-[#FAF7F5] flex">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative z-10 w-64">
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* Right Operational Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="h-16 bg-[#240812] border-b border-[rgba(247,214,220,0.08)] px-6 flex items-center justify-between md:hidden z-20">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg text-[#D1C7C9] hover:text-[#FAF7F5]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-xs font-semibold text-[#FAF7F5]">Facility Control</span>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 pb-20 md:pb-12 w-full max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}