import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Search } from 'lucide-react';
import type { Message, User } from '../types';

const Messages = () => {
  const [conversations, setConversations] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    // TODO: Implement message sending
    setNewMessage('');
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 overflow-hidden">
        <div className="grid grid-cols-12 h-[calc(100vh-160px)]">
          {/* Conversations List */}
          <div className="col-span-4 border-r border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%-73px)]">
              {conversations.map((user) => (
                <motion.div
                  key={user.id}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  className={`p-4 cursor-pointer ${
                    selectedUser?.id === user.id ? 'bg-blue-500/10' : ''
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      {user.name[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-400">Last message preview...</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="col-span-8 flex flex-col">
            {selectedUser ? (
              <>
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      {selectedUser.name[0].toUpperCase()}
                    </div>
                    <h3 className="font-medium">{selectedUser.name}</h3>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender_id === 'currentUser'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender_id === 'currentUser'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-700 text-gray-100'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;