import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Cpu, Coins, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectStats from '../components/ProjectStats';

const Home = () => {
  const navigate = useNavigate();

  const handleStartNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/find-talent');
  };

  const dummyStats = {
    pending: 15,
    active: 42,
    completed: 156
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Revolutionizing Freelance Work for Everyone
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Join Bitify for a seamless freelancing experience powered by AI and secure payments.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartNow}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold text-lg flex items-center mx-auto hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            Start Now <ArrowRight className="ml-2" />
          </motion.button>
        </motion.div>
      </section>

      {/* Project Stats Section */}
      <ProjectStats stats={dummyStats} />

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Bitify?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-12 h-12 text-blue-500" />}
              title="Secure Payments"
              description="Blockchain-powered secure transactions with instant settlements"
            />
            <FeatureCard
              icon={<Cpu className="w-12 h-12 text-purple-500" />}
              title="AI-Powered Matching"
              description="Smart project matching based on your skills and preferences"
            />
            <FeatureCard
              icon={<Coins className="w-12 h-12 text-pink-500" />}
              title="Low Fees"
              description="Minimal transaction fees thanks to blockchain technology"
            />
          </div>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">Trusted by Industry Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <CompanyLogo name="Tech Corp" />
            <CompanyLogo name="Innovation Labs" />
            <CompanyLogo name="Future Systems" />
            <CompanyLogo name="Global Solutions" />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="p-6 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const CompanyLogo = ({ name }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center justify-center p-6 rounded-lg bg-gray-800/30 border border-gray-700"
  >
    <Building className="w-8 h-8 mr-2 text-gray-400" />
    <span className="text-gray-400 font-semibold">{name}</span>
  </motion.div>
);

export default Home;