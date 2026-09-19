import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';

export function Toast() {
  const { toastMessage } = useParking();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.15 }}
          className="fixed bottom-20 md:bottom-8 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border border-zinc-700 dark:border-zinc-200 shadow-2xl max-w-md"
        >
          <div className="shrink-0">
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-500" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            )}
          </div>
          <div className="text-xs font-medium">
            {toastMessage.message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
