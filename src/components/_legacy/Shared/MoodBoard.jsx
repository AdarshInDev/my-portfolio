import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaBook,
  FaCamera,
  FaChess,
  FaCoffee,
  FaGamepad,
  FaGuitar,
  FaHeadphones,
  FaMountain,
  FaPalette,
  FaPlane,
} from "react-icons/fa";

const interests = [
  {
    icon: <FaGamepad />,
    label: "Gaming",
    color: "#2D3250",
    description: "Love exploring virtual worlds and strategic games",
  },
  {
    icon: <FaGuitar />,
    label: "Music",
    color: "#424769",
    description: "Playing guitar and discovering new genres",
  },
  {
    icon: <FaCamera />,
    label: "Photography",
    color: "#676F9D",
    description: "Capturing moments and editing shots",
  },
  {
    icon: <FaBook />,
    label: "Reading",
    color: "#7C3E66",
    description: "Sci-fi and technical books enthusiast",
  },
  {
    icon: <FaPlane />,
    label: "Travel",
    color: "#243763",
    description: "Exploring new places and cultures",
  },
  {
    icon: <FaPalette />,
    label: "Art",
    color: "#4F4557",
    description: "Digital art and UI/UX design",
  },
  {
    icon: <FaHeadphones />,
    label: "Podcasts",
    color: "#1B2430",
    description: "Tech and true crime podcasts",
  },
  {
    icon: <FaCoffee />,
    label: "Coffee",
    color: "#395B64",
    description: "Coffee brewing enthusiast",
  },
  {
    icon: <FaChess />,
    label: "Chess",
    color: "#2C3639",
    description: "Strategic thinking and tournaments",
  },
  {
    icon: <FaMountain />,
    label: "Hiking",
    color: "#374259",
    description: "Weekend adventures and nature photography",
  },
];

const InterestBubble = ({ interest, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="relative flex flex-col items-center justify-center h-48" // Added fixed height and flex
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-4xl cursor-pointer glass-card text-textPrimary"
        style={{
          backgroundColor: interest.color,
          boxShadow: `0 0 20px ${interest.color}`,
        }}
        whileHover={{ scale: 1.1 }}
        animate={{
          rotate: isHovered ? [0, 10, -10, 0] : 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {interest.icon}
      </motion.div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 p-3 bg-lightNavy/90 rounded-lg shadow-xl z-10"
        >
          <p className="text-sm font-mono text-center text-textPrimary font-bold">
            {interest.label}
          </p>
          <p className="text-xs text-textSecondary text-center mt-2">
            {interest.description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

const MoodBoard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary via-darkGray to-primary py-20">
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title text-textPrimary mb-16"
        >
          Beyond Coding
        </motion.h2>

        <motion.div className="max-w-6xl mx-auto p-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {interests.map((interest, index) => (
            <InterestBubble key={index} interest={interest} index={index} />
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
};

export default MoodBoard;