import React, { useState } from 'react';
import { Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { formatCurrency } from '../../utils/formatters';

export function Wallet() {
  const { walletBalance, transactions, topupWallet } = useParking();
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
  const [topupAmount, setTopupAmount] = useState(250);

  const handleConfirmTopup = () => {
    topupWallet(topupAmount);
    setIsTopupModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-6 w-full">
      {/* Header */}
      <div>
        <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider font-semibold">
          Account Balance
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-zinc-50 mt-0.5">
          Transit Wallet
        </h1>
      </div>

      {/* Balance Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 space-y-5 shadow-card hover:shadow-elevated transition-all">
        <div>
          <span className="text-xs font-mono uppercase text-zinc-600 dark:text-zinc-400 font-medium">
            Available Funds
          </span>
          <div className="text-4xl sm:text-5xl font-extrabold font-mono text-zinc-900 dark:text-zinc-50 mt-1.5">
            {formatCurrency(walletBalance, true)}
          </div>
        </div>

        <Button
          onClick={() => setIsTopupModalOpen(true)}
          variant="primary"
          size="lg"
          icon={Plus}
          iconPosition="left"
          className="w-full font-bold"
        >
          Add Money
        </Button>
      </div>

      {/* Transactions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <span>RECENT ACTIVITY</span>
        </div>

        <div className="space-y-2.5">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-4 rounded-xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between text-xs font-mono shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  tx.type === 'credit' 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                }`}>
                  {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>

                <div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-100">
                    {tx.title}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {tx.date} {tx.duration ? `• ${tx.duration}` : ''}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={`font-bold text-sm ${tx.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                  {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount, true)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Money Modal */}
      <Modal
        isOpen={isTopupModalOpen}
        onClose={() => setIsTopupModalOpen(false)}
        title="Add Transit Balance"
        subtitle="Select amount to top up"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2.5">
            {[100, 250, 500, 1000].map((amt) => (
              <button
                key={amt}
                onClick={() => setTopupAmount(amt)}
                className={`py-3 rounded-xl border font-mono font-bold text-sm transition-colors ${
                  topupAmount === amt
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent shadow-sm'
                    : 'bg-zinc-100 dark:bg-[#18181B] text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                }`}
              >
                {formatCurrency(amt)}
              </button>
            ))}
          </div>

          <Button
            onClick={handleConfirmTopup}
            variant="primary"
            size="lg"
            className="w-full font-bold"
          >
            Add {formatCurrency(topupAmount)}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
