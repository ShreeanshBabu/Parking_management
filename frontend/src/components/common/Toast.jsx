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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.15 }}
          className="fixed bottom-20 md:bottom-8 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#240911] text-[#FDF2F4] border border-[#6D1D32] shadow-2xl max-w-md"
        >
          <div className="text-[#F7D6DC] shrink-0">
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-[#E07A94]" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <div className="text-xs font-normal text-[#FDF2F4]">
            {toastMessage.message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}