import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Briefcase, Star, Clock, DollarSign, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types';

const dummyFreelancers = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Full Stack Developer',
    rating: 4.9,
    hourlyRate: 750, // in tokens
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    completedProjects: 47,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    title: 'UI/UX Designer',
    rating: 4.8,
    hourlyRate: 650,
    skills: ['Figma', 'Adobe XD', 'UI Design', 'User Research'],
    completedProjects: 38,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: '3',
    name: 'Emily Watson',
    title: 'Backend Developer',
    rating: 4.7,
    hourlyRate: 800,
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    completedProjects: 52,
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFreelancers, setShowFreelancers] = useState(true);
  const [hiredFreelancers, setHiredFreelancers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const hired = JSON.parse(localStorage.getItem('hiredFreelancers') || '[]');
    setHiredFreelancers(hired);
  }, []);

  const handleUnhire = (freelancerId) => {
    const updatedHired = hiredFreelancers.filter(f => f.id !== freelancerId);
    localStorage.setItem('hiredFreelancers', JSON.stringify(updatedHired));
    setHiredFreelancers(updatedHired);
  };

  const FreelancerCard = ({ freelancer, isHired = false }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-6 rounded-xl border ${
        isHired ? 'border-green-500' : 'border-gray-700'
      }`}
      onClick={() => navigate(`/freelancer/${freelancer.id}`)}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start space-x-4">
        <img
          src={freelancer.imageUrl}
          alt={freelancer.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-white">{freelancer.name}</h3>
              {isHired && (
                <div className="flex items-center">
                  <span className="text-sm text-green-500 mr-2">Hired</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnhire(freelancer.id);
                    }}
                    className="p-1 hover:bg-red-500/20 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span>{freelancer.rating}</span>
            </div>
          </div>
          <p className="text-gray-400 mb-2">{freelancer.title}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-1" />
              {freelancer.completedProjects} projects
            </div>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              {freelancer.hourlyRate} BITS/hr
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {freelancer.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ProjectCard = ({ project }: { project: Project }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
          ${project.budget}
        </span>
      </div>
      <p className="text-gray-400 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">Duration: {project.duration}</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );

  const availableFreelancers = dummyFreelancers.filter(
    f => !hiredFreelancers.some(hired => hired.id === f.id)
  );

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Find Talent</h1>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="flex space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              showFreelancers
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800/30 text-gray-400'
            }`}
            onClick={() => setShowFreelancers(true)}
          >
            Freelancers
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              !showFreelancers
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800/30 text-gray-400'
            }`}
            onClick={() => setShowFreelancers(false)}
          >
            Projects
          </button>
        </div>

        {showFreelancers && hiredFreelancers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Hired Freelancers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hiredFreelancers.map((freelancer) => (
                <FreelancerCard key={freelancer.id} freelancer={freelancer} isHired={true} />
              ))}
            </div>
          </div>
        )}

        {showFreelancers && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Available Freelancers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableFreelancers.map((freelancer) => (
                <FreelancerCard key={freelancer.id} freelancer={freelancer} />
              ))}
            </div>
          </div>
        )}

        {!showFreelancers && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;