import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, Clock, DollarSign } from 'lucide-react';
import type { Project } from '../types';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetails = ({ project, onClose }: ProjectDetailsProps) => {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');

  const handleApply = async () => {
    // TODO: Implement application logic
    setShowChat(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // TODO: Implement message sending
    setMessage('');
  };

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
        className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2 text-gray-300">
            <Clock className="w-5 h-5" />
            <span>{project.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <DollarSign className="w-5 h-5" />
            <span>${project.budget}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-300">{project.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {!showChat ? (
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleApply}
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium"
            >
              Apply Now
            </motion.button>
          </div>
        ) : (
          <div className="border-t border-gray-700 pt-6">
            <h3 className="font-semibold mb-4">Chat with Company</h3>
            <div className="h-60 overflow-y-auto mb-4 p-4 bg-gray-800/30 rounded-lg">
              {/* Chat messages will appear here */}
            </div>
            <form onSubmit={handleSendMessage}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
                >
                  <MessageSquare className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetails;