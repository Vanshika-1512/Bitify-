import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Check, X } from 'lucide-react';
import type { Contract as ContractType } from '../types';

interface ContractProps {
  contract: ContractType;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
}

const Contract = ({ contract, onAccept, onDecline, onClose }: ContractProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 p-6 max-w-2xl w-full"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold">Project Contract</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Contract Terms</h3>
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <pre className="whitespace-pre-wrap text-gray-300">
                {contract.terms}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Payment Details</h3>
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <p className="text-gray-300">
                Total Amount: ${contract.amount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAccept}
              className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-medium flex items-center justify-center space-x-2"
            >
              <Check className="w-5 h-5" />
              <span>Accept Contract</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDecline}
              className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg font-medium flex items-center justify-center space-x-2"
            >
              <X className="w-5 h-5" />
              <span>Decline</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contract;