import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building } from 'lucide-react';

const Login = () => {
  const [loginType, setLoginType] = useState('freelancer');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        {/* Login Type Selector */}
        <div className="flex rounded-lg bg-gray-800/30 p-1 mb-8">
          <button
            onClick={() => setLoginType('freelancer')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
              loginType === 'freelancer'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Freelancer
          </button>
          <button
            onClick={() => setLoginType('company')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
              loginType === 'company'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Building className="w-4 h-4 mr-2" />
            Company
          </button>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/30 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/30 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="rounded bg-gray-800 border-gray-700 text-blue-500 focus:ring-blue-500" />
              <span className="ml-2 text-gray-300">Remember me</span>
            </label>
            <a href="#" className="text-blue-500 hover:text-blue-400">Forgot password?</a>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            Sign In
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{' '}
          <a href="#" className="text-blue-500 hover:text-blue-400">Sign up</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;