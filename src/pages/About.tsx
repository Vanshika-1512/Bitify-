import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Coins, Users, Globe, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            About Bitify
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            We're revolutionizing the freelancing industry by leveraging blockchain
            technology and artificial intelligence to create a more secure,
            efficient, and transparent ecosystem for freelancers and businesses.
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-12 h-12 text-blue-500" />}
              title="Secure Payments"
              description="Smart contracts ensure secure and automated payments upon project completion"
            />
            <FeatureCard
              icon={<Cpu className="w-12 h-12 text-purple-500" />}
              title="AI-Powered Matching"
              description="Advanced algorithms match the perfect freelancers with your projects"
            />
            <FeatureCard
              icon={<Coins className="w-12 h-12 text-pink-500" />}
              title="Low Fees"
              description="Minimal transaction fees thanks to blockchain technology"
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-green-500" />}
              title="Global Community"
              description="Connect with talented professionals from around the world"
            />
            <FeatureCard
              icon={<Globe className="w-12 h-12 text-yellow-500" />}
              title="Borderless Platform"
              description="Work and hire without geographical limitations"
            />
            <FeatureCard
              icon={<Award className="w-12 h-12 text-red-500" />}
              title="Quality Assurance"
              description="Verified profiles and rating system for quality control"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="10K+" label="Active Users" />
            <StatCard number="5K+" label="Completed Projects" />
            <StatCard number="$2M+" label="Paid to Freelancers" />
            <StatCard number="150+" label="Countries Reached" />
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

const StatCard = ({ number, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
      {number}
    </div>
    <div className="text-gray-400">{label}</div>
  </motion.div>
);

export default About;