import React, { useState } from 'react';
import { useParking } from '../../context/ParkingContext';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

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
        <span className="text-xs font-mono uppercase text-[#F7D6DC] tracking-wider font-semibold">
          Account Balance
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#FAF7F5] mt-0.5">
          Transit Wallet
        </h1>
      </div>

      {/* Balance Card */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.1)] space-y-5 shadow-sm">
        <div>
          <span className="text-xs font-mono uppercase text-[#A8989C]">
            Available Funds
          </span>
          <div className="text-4xl sm:text-5xl font-extrabold font-mono text-[#FAF7F5] mt-1.5">
            ₹{walletBalance.toFixed(2)}
          </div>
        </div>

        <Button
          onClick={() => setIsTopupModalOpen(true)}
          variant="primary"
          size="lg"
          className="w-full font-bold"
        >
          + Add Money
        </Button>
      </div>

      {/* Transactions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#D1C7C9]">
          <span>RECENT ACTIVITY</span>
        </div>

        <div className="space-y-2.5">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-4 rounded-xl bg-[#240812] border border-[rgba(247,214,220,0.08)] flex items-center justify-between text-xs font-mono shadow-sm"
            >
              <div>
                <div className="font-bold text-[#FAF7F5]">
                  {tx.title}
                </div>
                <div className="text-[11px] text-[#A8989C] mt-0.5">
                  {tx.date} {tx.duration ? `• ${tx.duration}` : ''}
                </div>
              </div>

              <div className="text-right">
                <div className={`font-bold text-sm ${tx.type === 'credit' ? 'text-emerald-300' : 'text-[#FAF7F5]'}`}>
                  {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toFixed(2)}
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
                className={`py-3 rounded-lg border font-mono font-bold text-sm transition-all ${
                  topupAmount === amt
                    ? 'bg-[#B23C59] text-[#FAF7F5] border-[#B23C59]'
                    : 'bg-[#1A050C] text-[#D1C7C9] border-[rgba(247,214,220,0.1)] hover:text-[#FAF7F5]'
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>

          <Button
            onClick={handleConfirmTopup}
            variant="primary"
            size="lg"
            className="w-full font-bold"
          >
            Add ₹{topupAmount}
          </Button>
        </div>
      </Modal>
    </div>
  );
}