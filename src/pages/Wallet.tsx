import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, History, Coins } from 'lucide-react';
import type { Transaction } from '../types';

const tokenPackages = [
  { amount: 1000, tokens: 100000, bonus: 5000 },
  { amount: 5000, tokens: 550000, bonus: 50000 },
  { amount: 10000, tokens: 1200000, bonus: 200000 },
];

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const handleTopUp = async () => {
    if (selectedPackage === null) return;
    
    const selectedTokenPackage = tokenPackages[selectedPackage];
    // TODO: Implement actual payment processing
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      wallet_id: 'user_wallet',
      amount: selectedTokenPackage.amount,
      type: 'deposit',
      status: 'completed',
      created_at: new Date().toISOString()
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance(balance + selectedTokenPackage.tokens + selectedTokenPackage.bonus);
    setSelectedPackage(null);
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-8 rounded-xl border border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <WalletIcon className="w-8 h-8 text-blue-500" />
                <h2 className="text-2xl font-bold">Your Balance</h2>
              </div>
            </div>
            <div className="text-4xl font-bold mb-6">
              {balance.toLocaleString()} BITS
            </div>
            <p className="text-gray-400">
              1 USD = 100 BITS
            </p>
          </motion.div>

          {/* Token Packages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 space-y-4"
          >
            {tokenPackages.map((pkg, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPackage(index)}
                className={`p-6 rounded-xl border cursor-pointer transition-all ${
                  selectedPackage === index
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500'
                    : 'bg-gradient-to-b from-gray-800/50 to-gray-900/50 border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-6 h-6 text-blue-500" />
                    <span className="font-semibold">${pkg.amount}</span>
                  </div>
                  <span className="text-sm text-gray-400">Best Value</span>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-blue-400">
                    {pkg.tokens.toLocaleString()} BITS
                  </p>
                  {pkg.bonus > 0 && (
                    <p className="text-green-500 text-sm">
                      +{pkg.bonus.toLocaleString()} Bonus BITS
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTopUp}
              disabled={selectedPackage === null}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Purchase Tokens
            </motion.button>
          </motion.div>

          {/* Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-3 bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-8 rounded-xl border border-gray-700"
          >
            <div className="flex items-center space-x-3 mb-6">
              <History className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold">Recent Transactions</h2>
            </div>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {transaction.type === 'deposit' ? (
                      <ArrowDownLeft className="w-5 h-5 text-green-500" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">
                        {transaction.type.charAt(0).toUpperCase() +
                          transaction.type.slice(1)}
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-medium ${
                      transaction.type === 'deposit'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {transaction.type === 'deposit' ? '+' : '-'}$
                    {transaction.amount.toLocaleString()}
                  </span>
                </div>
              ))}
              {transactions.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  No transactions yet
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;