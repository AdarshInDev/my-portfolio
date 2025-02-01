import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FaRocket } from "react-icons/fa";

const timelineData = [
  {
    year: "2018",
    title: "Started Coding Journey",
    description: "Wrote my first line of code in Python",
    icon: "🎓",
  },
  {
    year: "2019",
    title: "First Internship",
    description: "Frontend Developer at Tech Corp",
    icon: "💼",
  },
  {
    year: "2020",
    title: "Bachelor's Degree",
    description: "Computer Science & Engineering",
    icon: "🎓",
  },
  {
    year: "2021",
    title: "First Job",
    description: "Full Stack Developer at StartupX",
    icon: "🚀",
  },
  {
    year: "2022",
    title: "Led Development Team",
    description: "Managed team of 5 developers",
    icon: "👥",
  },
  {
    year: "2023",
    title: "Started Freelancing",
    description: "Working with global clients",
    icon: "🌍",
  },
];

const Timeline = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const rocketY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "calc(100% - 50px)"]
  );

  const rocketX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["0px", "50px", "-50px", "50px", "-50px", "0px"]
  );

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.timeline-item');
      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const centerY = window.innerHeight / 2;
        if (rect.top <= centerY && rect.bottom >= centerY) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-darkGray to-primary py-20">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="section-title text-textPrimary mb-20"
      >
        My Journey
      </motion.h2>

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Rocket */}
        <motion.div
          style={{ y: rocketY, x: rocketX }}
          className="fixed left-1/2 text-secondary text-4xl z-20"
        >
          <FaRocket className="transform rotate-90" />
        </motion.div>

        {/* Timeline Track */}
        <div className="absolute left-1/2 top-0 w-1 h-full bg-lightNavy transform -translate-x-1/2" />

        {/* Timeline Items */}
        <div ref={containerRef} className="relative space-y-24">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`timeline-item relative ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`}
            >
              {/* Timeline Point */}
              <motion.div
                className={`absolute left-1/2 w-5 h-5 rounded-full -translate-x-1/2 z-10 transition-all duration-300
                  ${activeIndex === index ? 'scale-150 bg-secondary shadow-[0_0_20px_rgba(100,255,218,0.7)]' : 'bg-lightNavy'}`}
              />

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`w-[calc(50%-40px)] glass-card p-6 ${
                  index % 2 === 0 ? 'ml-auto' : 'mr-auto'
                }`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-secondary font-mono mb-2">{item.year}</div>
                <h3 className="text-xl font-bold text-textPrimary mb-2">
                  {item.title}
                </h3>
                <p className="text-textSecondary">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;