import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FindTalent from './pages/Projects';
import FindJobs from './pages/FindJobs';
import Messages from './pages/Messages';
import Wallet from './pages/Wallet';
import About from './pages/About';
import FreelancerProfile from './pages/FreelancerProfile';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/find-talent" element={<FindTalent />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/about" element={<About />} />
          <Route path="/freelancer/:id" element={<FreelancerProfile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;