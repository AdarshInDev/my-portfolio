import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

const ProjectDetails = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const projectData = {
    title: "Project Name",
    description: "A detailed description of the project, including the problem it solves, your approach, and key features.",
    longDescription: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      
      Key Features:
      - Feature 1 with detailed explanation
      - Feature 2 with implementation details
      - Technical challenges overcome
      
      The development process involved careful planning and iterative improvements based on user feedback.
    `,
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/yourusername/project",
    live: "https://project.com",
    mockups: [
      {
        url: "/mockup1.png",
        caption: "Homepage Design"
      },
      {
        url: "/mockup2.png",
        caption: "Dashboard Interface"
      },
      {
        url: "/mockup3.png",
        caption: "Mobile Responsive View"
      }
    ]
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-primary via-darkGray to-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Project Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-textPrimary mb-4">
            {projectData.title}
          </h1>
          <p className="text-xl text-textSecondary mb-6">
            {projectData.description}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={projectData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <FaGithub className="mr-2" /> View Code
            </a>
            <a
              href={projectData.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <FaExternalLinkAlt className="mr-2" /> Live Demo
            </a>
          </div>
        </div>

        {/* Mockups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projectData.mockups.map((mockup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(mockup)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={mockup.url}
                  alt={mockup.caption}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-secondary font-mono text-sm">Click to enlarge</p>
                </div>
              </div>
              <p className="mt-2 text-center text-textSecondary font-mono text-sm">
                {mockup.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Project Details */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-textPrimary mb-4">About the Project</h2>
          <div className="prose prose-invert max-w-none">
            {projectData.longDescription.split('\n').map((paragraph, index) => (
              <p key={index} className="text-textSecondary mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-bold text-textPrimary mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {projectData.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-lightNavy text-secondary rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="relative max-w-5xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-secondary hover:text-white transition-colors"
              >
                <FaTimes size={24} />
              </button>
              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <p className="text-center text-textSecondary mt-4">
                {selectedImage.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetails;