import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-lg' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`relative w-full ${maxWidth} z-10 bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden text-zinc-900 dark:text-zinc-50`}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
              <div>
                <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="mt-4">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
