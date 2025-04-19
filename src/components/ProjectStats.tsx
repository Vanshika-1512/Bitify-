import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface ProjectStatsProps {
  stats: {
    pending: number;
    active: number;
    completed: number;
  };
}

const ProjectStats = ({ stats }: ProjectStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 py-12">
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-semibold">Pending Projects</h3>
        </div>
        <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-semibold">Active Projects</h3>
        </div>
        <p className="text-3xl font-bold text-blue-500">{stats.active}</p>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700"
      >
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-semibold">Completed Projects</h3>
        </div>
        <p className="text-3xl font-bold text-green-500">{stats.completed}</p>
      </motion.div>
    </div>
  );
};

export default ProjectStats;