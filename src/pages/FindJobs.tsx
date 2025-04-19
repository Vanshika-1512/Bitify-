import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Briefcase, DollarSign, Clock, X } from 'lucide-react';

const skillOptions = [
  // Development
  "JavaScript", "TypeScript", "React", "Vue.js", "Angular", "Node.js", "Python", "Java", "PHP", "Ruby",
  "C#", ".NET", "AWS", "Azure", "Docker", "Kubernetes", "MongoDB", "PostgreSQL", "MySQL", "Redis",
  // Design
  "UI Design", "UX Design", "Graphic Design", "Web Design", "Logo Design", "Illustration", "Figma",
  "Adobe XD", "Photoshop", "Illustrator",
  // Marketing
  "Digital Marketing", "SEO", "Content Writing", "Social Media", "Email Marketing", "Google Ads",
  "Facebook Ads", "Marketing Strategy", "Brand Strategy", "Analytics",
  // Business
  "Business Analysis", "Project Management", "Scrum", "Agile", "Product Management", "Data Analysis",
  "Financial Analysis", "Consulting", "Strategy", "Operations",
  // Other
  "Customer Service", "Virtual Assistant", "Data Entry", "Translation", "Transcription", "Video Editing",
  "Voice Over", "3D Modeling", "Animation", "Game Development"
];

interface JobPost {
  id: string;
  title: string;
  description: string;
  skills: string[];
  rate: number;
  availability: string;
  name: string;
  experience: string;
}

const FindJobs = () => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: [] as string[],
    rate: '',
    availability: '',
    name: '',
    experience: ''
  });

  const handleSkillSelect = (skill: string) => {
    if (formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: formData.skills.filter(s => s !== skill)
      });
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: JobPost = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      skills: formData.skills,
      rate: Number(formData.rate),
      availability: formData.availability,
      name: formData.name,
      experience: formData.experience
    };

    setJobPosts([newJob, ...jobPosts]);
    setShowPostForm(false);
    setFormData({
      title: '',
      description: '',
      skills: [],
      rate: '',
      availability: '',
      name: '',
      experience: ''
    });

    // Store in localStorage
    const existingPosts = JSON.parse(localStorage.getItem('jobPosts') || '[]');
    localStorage.setItem('jobPosts', JSON.stringify([newJob, ...existingPosts]));
  };

  const JobPostCard = ({ post }: { post: JobPost }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{post.title}</h3>
        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
          {post.rate} BITS/hr
        </span>
      </div>
      <p className="text-gray-400 mb-4">{post.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {post.availability}
          </span>
          <span>{post.experience} experience</span>
        </div>
        <span>{post.name}</span>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Find Jobs</h1>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="pl-10 pr-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPostForm(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Post a Job
            </motion.button>
          </div>
        </div>

        {showPostForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-8 rounded-xl border border-gray-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Post a Job</h2>
                <button onClick={() => setShowPostForm(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Full Stack Developer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Describe your expertise and what you can offer..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Skills
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleSkillSelect(skill)}
                          className="ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="max-h-40 overflow-y-auto p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {skillOptions.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleSkillSelect(skill)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            formData.skills.includes(skill)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Hourly Rate (BITS)
                    </label>
                    <input
                      type="number"
                      value={formData.rate}
                      onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Availability
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select experience</option>
                      <option value="Entry Level">Entry Level</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowPostForm(false)}
                    className="px-6 py-2 bg-gray-700 rounded-lg text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white"
                  >
                    Post Job
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPosts.map((post) => (
            <JobPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindJobs;