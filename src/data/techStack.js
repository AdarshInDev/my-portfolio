import { FaNodeJs, FaReact } from 'react-icons/fa';
import { SiDocker, SiFlutter, SiGit, SiMongodb, SiNextdotjs, SiTailwindcss, SiTypescript } from 'react-icons/si';

const techStack = [
  // Frontline (Frontend)
  {
    id: "react",
    name: "React",
    category: "Frontline",
    icon: FaReact,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    level: "Expert",
    exp: "3Years",
    description: "Component-based UI architecture. My primary weapon for building interactive interfaces.",
    docs: "https://react.dev"
  },
  {
    id: "next",
    name: "Next.js",
    category: "Frontline",
    icon: SiNextdotjs,
    color: "text-white",
    bg: "bg-white/10",
    border: "border-white/20",
    level: "Advanced",
    exp: "2Years",
    description: "Production-grade React framework for SSR and SSG.",
    docs: "https://nextjs.org"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontline",
    icon: SiTailwindcss,
    color: "text-cyan-300",
    bg: "bg-cyan-300/10",
    border: "border-cyan-300/20",
    level: "Expert",
    exp: "3Years",
    description: "Utility-first CSS for rapid UI development.",
    docs: "https://tailwindcss.com"
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "Frontline",
    icon: SiFlutter,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    level: "Advanced",
    exp: "2Years",
    description: "Cross-platform mobile development framework.",
    docs: "https://flutter.dev"
  },
  {
      id: "typescript",
      name: "TypeScript",
      category: "Frontline",
      icon: SiTypescript,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      level: "Intermediate",
      exp: "1Year",
      description: "Type-safe JavaScript superset.",
      docs: "https://www.typescriptlang.org"
  },

  // Core Systems (Backend)
  {
    id: "node",
    name: "Node.js",
    category: "Core Systems",
    icon: FaNodeJs,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    level: "Advanced",
    exp: "2Years",
    description: "Server-side JavaScript runtime.",
    docs: "https://nodejs.org"
  },
  {
      id: "mongodb",
      name: "MongoDB",
      category: "Core Systems",
      icon: SiMongodb,
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20",
      level: "Intermediate",
      exp: "1.5Years",
      description: "NoSQL Database for modern applications.",
      docs: "https://www.mongodb.com"
  },

  // Ordnance (Tools)
  {
      id: "git",
      name: "Git / GitHub",
      category: "Ordnance",
      icon: SiGit,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      level: "Expert",
      exp: "3Years",
      description: "Version control and collaboration.",
      docs: "https://git-scm.com"
  },
   {
      id: "docker",
      name: "Docker",
      category: "Ordnance",
      icon: SiDocker,
      color: "text-blue-600",
      bg: "bg-blue-600/10",
      border: "border-blue-600/20",
      level: "Beginner",
      exp: "6Months",
      description: "Containerization platform.",
      docs: "https://www.docker.com"
  },
];

export default techStack;
