import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

export default NavigationPlanet;