import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Blocks, MessageSquare, Wallet, Home, Info, Menu, X, Briefcase, Users } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-black/50 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <Blocks className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Bitify
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link"><Home className="h-4 w-4 inline mr-1" /> Home</Link>
            <Link to="/find-talent" className="nav-link"><Users className="h-4 w-4 inline mr-1" /> Find Talent</Link>
            <Link to="/find-jobs" className="nav-link"><Briefcase className="h-4 w-4 inline mr-1" /> Find Jobs</Link>
            <Link to="/wallet" className="nav-link"><Wallet className="h-4 w-4 inline mr-1" /> Wallet</Link>
            <Link to="/messages" className="nav-link"><MessageSquare className="h-4 w-4 inline mr-1" /> Messages</Link>
            <Link to="/about" className="nav-link"><Info className="h-4 w-4 inline mr-1" /> About Us</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="px-4 py-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="mobile-nav-link">Home</Link>
            <Link to="/find-talent" className="mobile-nav-link">Find Talent</Link>
            <Link to="/find-jobs" className="mobile-nav-link">Find Jobs</Link>
            <Link to="/wallet" className="mobile-nav-link">Wallet</Link>
            <Link to="/messages" className="mobile-nav-link">Messages</Link>
            <Link to="/about" className="mobile-nav-link">About Us</Link>
            <Link to="/login" className="mobile-nav-link">Login</Link>
            <Link to="/signup" className="mobile-nav-link">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;