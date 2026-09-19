import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { Menu, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isOwner } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Route Guard: Unauthenticated or non-owner users cannot access admin screens
  if (!isAuthenticated || !isOwner) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-[#09090B] text-zinc-900 dark:text-zinc-50 flex transition-colors">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative z-10 w-64">
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* Right Operational Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="h-16 bg-white dark:bg-[#121215] border-b border-zinc-200 dark:border-zinc-800 px-6 flex items-center justify-between md:hidden z-20">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Facility Operations</span>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400"
          >
            {isDark ? <Sun className="w-4 h-4 text-zinc-200" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 pb-20 md:pb-12 w-full max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
