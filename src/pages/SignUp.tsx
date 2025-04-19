import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building, Mail, Lock, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [accountType, setAccountType] = useState('freelancer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    skills: '',
    companyName: '',
    industry: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signup logic with Supabase
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Create Your Account
        </h2>

        {/* Account Type Selector */}
        <div className="flex rounded-lg bg-gray-800/30 p-1 mb-8">
          <button
            onClick={() => setAccountType('freelancer')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
              accountType === 'freelancer'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Freelancer
          </button>
          <button
            onClick={() => setAccountType('company')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
              accountType === 'company'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Building className="w-4 h-4 mr-2" />
            Company
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Common Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {accountType === 'freelancer' ? 'Full Name' : 'Company Name'}
            </label>
            <input
              type="text"
              name={accountType === 'freelancer' ? 'name' : 'companyName'}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/30 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={accountType === 'freelancer' ? 'Enter your name' : 'Enter company name'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/30 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/30 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
            />
          </div>

          {/* Freelancer-specific fields */}
          {accountType === 'freelancer' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
                <input
                  type="text"
                  name="skills"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/30 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., React, Node.js, UI/UX Design"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea
                  name="bio"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/30 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about yourself"
                />
              </div>
            </>
          )}

          {/* Company-specific fields */}
          {accountType === 'company' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
              <input
                type="text"
                name="industry"
                className="w-full px-4 py-3 rounded-lg bg-gray-800/30 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Technology, Healthcare, Finance"
              />
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            Create Account
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:text-blue-400">
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;