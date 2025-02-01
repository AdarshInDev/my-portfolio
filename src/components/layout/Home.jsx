import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaNodeJs,
  FaReact,
  FaTwitter,
} from "react-icons/fa";
import {
  SiDart,
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiPython,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { useNavigate } from "react-router-dom";
import MoodBoard from "../Shared/MoodBoard";
import ParticlesBackground from "../Shared/ParticlesBackground";
import Terminal from "../Shared/Terminal";
import Timeline from "../Shared/Timeline";

const techStack = [
  { name: "React", icon: <FaReact size={40} className="text-[#61DAFB]" /> },
  { name: "Node.js", icon: <FaNodeJs size={40} className="text-[#339933]" /> },
  { name: "MongoDB", icon: <SiMongodb size={40} className="text-[#47A248]" /> },
  {
    name: "TypeScript",
    icon: <SiTypescript size={40} className="text-[#3178C6]" />,
  },
  {
    name: "JavaScript",
    icon: <SiJavascript size={40} className="text-[#F7DF1E]" />,
  },
  { name: "Python", icon: <SiPython size={40} className="text-[#3776AB]" /> },
  { name: "Docker", icon: <SiDocker size={40} className="text-[#2496ED]" /> },
  {
    name: "Kubernetes",
    icon: <SiKubernetes size={40} className="text-[#326CE5]" />,
  },
  { name: "Flutter", icon: <SiFlutter size={40} className="text-[#02569B]" /> },
  { name: "Dart", icon: <SiDart size={40} className="text-[#0175C2]" /> },
  {
    name: "Firebase",
    icon: <SiFirebase size={40} className="text-[#FFCA28]" />,
  },
  {
    name: "Tailwind",
    icon: <SiTailwindcss size={40} className="text-[#06B6D4]" />,
  },
];
const TechStackCube = ({ tech, isVisible, onClose }) => {
  if (!tech) return null;
  return (
    <motion.div
      initial={{ scale: 0, rotateY: 0 }}
      animate={{
        scale: isVisible ? 1 : 0,
        rotateY: isVisible ? 360 : 0,
      }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative preserve-3d w-64 h-64"
        animate={{ rotateY: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 flex items-center justify-center glass-card bg-lightNavy/80">
          <div className="text-center">
            <div className="text-8xl mb-4">{tech.icon}</div>
            <h3 className="text-2xl font-mono text-secondary">{tech.name}</h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
const NavigationPlanet = ({
  size,
  color,
  glowColor,
  delay,
  className,
  text,
  path,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3, delay }}
      onClick={() => navigate(path)}
      className={`absolute rounded-full cursor-pointer flex items-center justify-center group ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, ${color}, rgba(10,25,47,0.4))`,
        boxShadow: `0 0 ${size / 3}px ${glowColor}`,
        animation: `float ${6 + delay}s ease-in-out infinite`,
      }}
    >
      <span className="text-white font-mono text-lg font-medium group-hover:text-secondary transition-colors drop-shadow-lg">
        {text}
      </span>
    </motion.div>
  );
};

const Home = () => {
  const [selectedTech, setSelectedTech] = useState(null);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-primary via-darkGray to-primary overflow-hidden">
        <ParticlesBackground />

        {/* Navigation Planets */}
        <NavigationPlanet
          size="120px"
          color="#FF6B6B"
          glowColor="rgba(255,107,107,0.6)"
          delay={0}
          className="top-[15%] right-[20%] animate-float"
          text="Projects"
          path="/projects"
        />
        <NavigationPlanet
          size="100px"
          color="#4ECDC4"
          glowColor="rgba(78,205,196,0.6)"
          delay={0.3}
          className="bottom-[20%] left-[15%] animate-float-slow"
          text="Contact"
          path="/contact"
        />
        <NavigationPlanet
          size="90px"
          color="#FFE66D"
          glowColor="rgba(255,230,109,0.6)"
          delay={0.6}
          className="top-[25%] left-[25%] animate-float"
          text="Resume"
          path="/resume.pdf"
        />

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-4 flex items-center justify-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 max-w-6xl">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="text-center md:text-left max-w-xl"
            >
              <motion.div variants={item} className="mb-4">
                <span className="text-secondary font-mono">Hi there, I'm</span>
              </motion.div>

              <motion.h1
                variants={item}
                className="text-6xl md:text-7xl font-bold mb-6"
              >
                Adarsh
                <br />
                <span className="bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#FFE66D] text-transparent bg-clip-text">
                  Pradhan
                </span>
              </motion.h1>

              <motion.div
                variants={item}
                className="h-[2px] w-24 bg-secondary mb-6 mx-auto md:mx-0"
              />

              <motion.p
                variants={item}
                className="text-xl text-textSecondary mb-8"
              >
                Full Stack Developer & Android Engineer specializing in building
                exceptional digital experiences
              </motion.p>

              <motion.div
                variants={item}
                className="flex gap-4 justify-center md:justify-start"
              >
                <a href="#" className="social-link">
                  <FaGithub size={24} />
                </a>
                <a href="#" className="social-link">
                  <FaLinkedin size={24} />
                </a>
                <a href="#" className="social-link">
                  <FaTwitter size={24} />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden border-4 border-[#4ECDC4] relative glass-card">
                <img
                  src="https://i.ytimg.com/vi/hhKym69hwUM/oardefault.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLA9T_CPJL2wSryMWvBWG5UghMCSTQ"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary/40" />
              </div>
              <div className="absolute -left-12 top-1/2 w-24 h-[2px] bg-[#4ECDC4]" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary via-darkGray to-primary">
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full py-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-title text-textPrimary"
          >
            Tech Stack
          </motion.h2>
          <div className="perspective-1000 relative h-[600px] max-w-5xl mx-auto">
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="preserve-3d relative w-full h-full"
            >
              {techStack.map((tech, index) => {
                const angle = (index / techStack.length) * Math.PI * 2;
                const radius = 250;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d"
                    style={{
                      transform: `translate3d(${x}px, 0, ${z}px)`,
                    }}
                    onClick={() => setSelectedTech(tech)}
                  >
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setSelectedTech(tech)}
                      className="glass-card p-8 cursor-pointer flex flex-col items-center gap-4"
                    >
                      <div className="text-6xl">{tech.icon}</div>
                      <span className="text-lg font-mono text-textSecondary whitespace-nowrap">
                        {tech.name}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>
      </div>
      {/*Time line section */}
      <Timeline />

      {/* Terminal Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary via-darkGray to-primary">
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full py-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-title text-textPrimary"
          >
            Terminal
          </motion.h2>
          <Terminal />
        </motion.section>
      </div>
      <MoodBoard />

      {/* Cube Modal */}
      <TechStackCube
        tech={selectedTech}
        isVisible={!!selectedTech}
        onClose={() => setSelectedTech(null)}
      />
    </>
  );
};

export default Home;
