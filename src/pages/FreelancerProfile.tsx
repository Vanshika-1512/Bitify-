import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, DollarSign, Award, Briefcase, ThumbsUp, MessageSquare, Mail, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const dummyFreelancers = {
  '1': {
    id: '1',
    name: "Sarah Chen",
    title: "Full Stack Developer",
    rating: 4.9,
    completedProjects: 47,
    hourlyRate: 750,
    totalEarned: 156000,
    email: "sarah.chen@example.com",
    skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker"],
    bio: "Full-stack developer with 6+ years of experience building scalable web applications. Specialized in React and Node.js ecosystem with a strong focus on performance and user experience.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    recentProjects: [
      {
        title: "E-commerce Platform",
        description: "Built a full-featured e-commerce platform with React, Node.js, and AWS",
        duration: "3 months",
        cost: 45000,
        rating: 5,
        review: "Sarah delivered exceptional work. Her attention to detail and problem-solving skills were outstanding."
      },
      {
        title: "Real-time Analytics Dashboard",
        description: "Developed a real-time analytics dashboard using React, Socket.io, and D3.js",
        duration: "2 months",
        cost: 32000,
        rating: 4.8,
        review: "Great communication and technical expertise. Would definitely hire again."
      },
      {
        title: "Social Media Management Tool",
        description: "Created a comprehensive social media management platform with content scheduling",
        duration: "4 months",
        cost: 58000,
        rating: 5,
        review: "Sarah went above and beyond our expectations. Her code quality is excellent."
      }
    ],
    testimonials: [
      {
        name: "John Smith",
        company: "TechCorp",
        content: "Sarah is an exceptional developer. Her technical skills and professionalism are outstanding.",
        rating: 5
      },
      {
        name: "Emily Brown",
        company: "StartupX",
        content: "Working with Sarah was a pleasure. She delivered high-quality work ahead of schedule.",
        rating: 4.8
      }
    ]
  },
  '2': {
    id: '2',
    name: "Michael Rodriguez",
    title: "UI/UX Designer",
    rating: 4.8,
    completedProjects: 38,
    hourlyRate: 650,
    totalEarned: 124000,
    email: "michael.r@example.com",
    skills: ["Figma", "Adobe XD", "UI Design", "User Research", "Prototyping", "Design Systems"],
    bio: "Passionate UI/UX designer with 5+ years of experience creating beautiful and functional interfaces. Focused on user-centered design and accessibility.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    recentProjects: [
      {
        title: "Mobile Banking App Redesign",
        description: "Complete redesign of a mobile banking application focusing on user experience",
        duration: "3 months",
        cost: 39000,
        rating: 4.9,
        review: "Michael's design work transformed our app. User satisfaction increased significantly."
      },
      {
        title: "E-learning Platform UI",
        description: "Designed the interface for an online learning platform",
        duration: "2.5 months",
        cost: 28000,
        rating: 4.7,
        review: "Excellent work on creating an intuitive and engaging learning interface."
      }
    ],
    testimonials: [
      {
        name: "Sarah Wilson",
        company: "EduTech",
        content: "Michael's design skills are exceptional. He truly understands user needs.",
        rating: 4.9
      }
    ]
  },
  '3': {
    id: '3',
    name: "Emily Watson",
    title: "Backend Developer",
    rating: 4.7,
    completedProjects: 52,
    hourlyRate: 800,
    totalEarned: 187000,
    email: "emily.watson@example.com",
    skills: ["Python", "Django", "PostgreSQL", "Docker", "AWS", "System Architecture"],
    bio: "Backend developer specializing in building robust and scalable systems. Expert in Python and database optimization.",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
    recentProjects: [
      {
        title: "Payment Processing System",
        description: "Built a secure payment processing system handling millions of transactions",
        duration: "5 months",
        cost: 65000,
        rating: 4.8,
        review: "Emily's work on our payment system was exceptional. Great attention to security."
      },
      {
        title: "Data Analytics Pipeline",
        description: "Developed a real-time data analytics pipeline processing terabytes of data",
        duration: "4 months",
        cost: 52000,
        rating: 4.6,
        review: "Solid architecture and excellent performance optimization."
      }
    ],
    testimonials: [
      {
        name: "David Chen",
        company: "FinTech Solutions",
        content: "Emily's technical expertise in backend development is outstanding.",
        rating: 4.7
      }
    ]
  }
};

const FreelancerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const freelancer = dummyFreelancers[id || '1'];
  const [showContactModal, setShowContactModal] = useState(false);
  const [showHireModal, setShowHireModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isHired, setIsHired] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    if (freelancer) {
      const hired = JSON.parse(localStorage.getItem('hiredFreelancers') || '[]');
      setIsHired(hired.some(f => f.id === freelancer.id));
    }
  }, [freelancer?.id]);

  if (!freelancer) {
    return <div>Freelancer not found</div>;
  }

  const handleHire = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const existingHired = JSON.parse(localStorage.getItem('hiredFreelancers') || '[]');
    
    if (!existingHired.some(f => f.id === freelancer.id)) {
      const updatedHired = [...existingHired, freelancer];
      localStorage.setItem('hiredFreelancers', JSON.stringify(updatedHired));
      setIsHired(true);
    }
    
    setShowHireModal(false);
    navigate('/find-talent');
  };

  const handleUnhire = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const existingHired = JSON.parse(localStorage.getItem('hiredFreelancers') || '[]');
    const updatedHired = existingHired.filter(f => f.id !== freelancer.id);
    localStorage.setItem('hiredFreelancers', JSON.stringify(updatedHired));
    setIsHired(false);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    const newReview = {
      name: "Anonymous User",
      company: "Client",
      content: reviewText,
      rating: rating
    };

    // Add review to localStorage
    const existingReviews = JSON.parse(localStorage.getItem(`reviews_${freelancer.id}`) || '[]');
    localStorage.setItem(`reviews_${freelancer.id}`, JSON.stringify([...existingReviews, newReview]));

    setShowReviewModal(false);
    setRating(0);
    setReviewText('');
  };

  const StarRating = ({ value, onHover, onClick }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-8 h-8 cursor-pointer ${
              star <= (hoveredStar || value)
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-gray-400'
            }`}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={() => onHover(0)}
            onClick={() => onClick(star)}
          />
        ))}
      </div>
    );
  };

  const ContactModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        e.stopPropagation();
        setShowContactModal(false);
      }}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700 max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Contact Information</h3>
          <button onClick={() => setShowContactModal(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-lg">
            <Mail className="w-5 h-5 text-blue-500" />
            <a href={`mailto:${freelancer.email}`} className="text-blue-400 hover:text-blue-300">
              {freelancer.email}
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            Usually responds within 24 hours
          </p>
        </div>
      </motion.div>
    </motion.div>
  );

  const HireModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        e.stopPropagation();
        setShowHireModal(false);
      }}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700 max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Hire {freelancer.name}</h3>
          <button onClick={() => setShowHireModal(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-gray-300">
            You are about to hire {freelancer.name} for your project. Their rate is {freelancer.hourlyRate} BITS per hour.
          </p>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowHireModal(false)}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleHire}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              Confirm Hire
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const ReviewModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setShowReviewModal(false)}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700 max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Rate {freelancer.name}</h3>
          <button onClick={() => setShowReviewModal(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmitReview} className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <label className="text-sm font-medium text-gray-300">Your Rating</label>
            <StarRating
              value={rating}
              onHover={setHoveredStar}
              onClick={setRating}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Share your experience working with this freelancer..."
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowReviewModal(false)}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white disabled:opacity-50"
            >
              Submit Review
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 p-8 mb-8"
        >
          <div className="flex items-start gap-8">
            <img
              src={freelancer.imageUrl}
              alt={freelancer.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{freelancer.name}</h1>
              <h2 className="text-xl text-gray-300 mb-4">{freelancer.title}</h2>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span>{freelancer.rating} Rating</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 text-blue-500 mr-2" />
                  <span>{freelancer.completedProjects} Projects</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                  <span>{freelancer.hourlyRate} BITS/hr</span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{freelancer.bio}</p>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowContactModal(true);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white flex items-center"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact
                </motion.button>
                {isHired ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleUnhire}
                      className="px-6 py-2 bg-red-500 rounded-lg text-white flex items-center"
                    >
                      <X className="w-5 h-5 mr-2" />
                      Unhire
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowReviewModal(true)}
                      className="px-6 py-2 bg-yellow-500 rounded-lg text-white flex items-center"
                    >
                      <Star className="w-5 h-5 mr-2" />
                      Leave Review
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowHireModal(true);
                    }}
                    className="px-6 py-2 bg-gray-700 rounded-lg text-white flex items-center"
                  >
                    <Briefcase className="w-5 h-5 mr-2" />
                    Hire Now
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 p-8 mb-8"
        >
          <h3 className="text-xl font-bold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {freelancer.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 p-6">
            <DollarSign className="w-8 h-8 text-green-500 mb-2" />
            <h4 className="text-lg font-semibold mb-1">Total Earned</h4>
            <p className="text-2xl font-bold">{freelancer.totalEarned.toLocaleString()} BITS</p>
          </div>
          <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 p-6">
            <Briefcase className="w-8 h-8 text-blue-500 mb-2" />
            <h4 className="text-lg font-semibold mb-1">Completed Projects</h4>
            <p className="text-2xl font-bold">{freelancer.completedProjects}</p>
          </div>
          <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 p-6">
            <Star className="w-8 h-8 text-yellow-500 mb-2" />
            <h4 className="text-lg font-semibold mb-1">Rating</h4>
            <p className="text-2xl font-bold">{freelancer.rating}/5.0</p>
          </div>
        </motion.div>

        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 p-8 mb-8"
        >
          <h3 className="text-xl font-bold mb-6">Recent Projects</h3>
          <div className="space-y-6">
            {freelancer.recentProjects.map((project, index) => (
              <div
                key={index}
                className="border-b border-gray-700 last:border-0 pb-6 last:pb-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold">{project.title}</h4>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>{project.rating}</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-3">{project.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {project.duration}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {project.cost} BITS
                  </div>
                </div>
                <blockquote className="border-l-4 border-blue-500 pl-4 text-gray-400 italic">
                  "{project.review}"
                </blockquote>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 p-8"
        >
          <h3 className="text-xl font-bold mb-6">Client Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {freelancer.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800/30 rounded-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" />
                  <span>{testimonial.rating}</span>
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showContactModal && <ContactModal />}
        {showHireModal && <HireModal />}
        {showReviewModal && <ReviewModal />}
      </AnimatePresence>
    </div>
  );
};

export default FreelancerProfile;