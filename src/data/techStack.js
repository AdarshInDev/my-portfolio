import { FaJava, FaNodeJs, FaPython, FaReact, FaSalesforce } from 'react-icons/fa';
import { SiDart, SiFirebase, SiFlutter, SiGithub, SiTailwindcss, SiTypescript } from 'react-icons/si';

const techStack = [
  // Frontline (Frontend & Mobile)
  {
    id: "flutter",
    name: "Flutter",
    category: "Frontline",
    icon: SiFlutter,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    level: "Expert",
    exp: "2+ Years",
    description: "Cross-platform mobile architect. Built multiple production-grade apps.",
    docs: "https://flutter.dev"
  },
  {
    id: "react",
    name: "React",
    category: "Frontline",
    icon: FaReact,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    level: "Advanced",
    exp: "2 Years",
    description: "Building interactive, modern web interfaces (like this one).",
    docs: "https://react.dev"
  },
  {
    id: "dart",
    name: "Dart",
    category: "Frontline",
    icon: SiDart,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    level: "Expert",
    exp: "2+ Years",
    description: "The primary language for my mobile development arsenal.",
    docs: "https://dart.dev"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontline",
    icon: SiTailwindcss,
    color: "text-cyan-300",
    bg: "bg-cyan-300/10",
    border: "border-cyan-300/20",
    level: "Advanced",
    exp: "2 Years",
    description: "Rapid UI/UX styling engine.",
    docs: "https://tailwindcss.com"
  },

  // Core Systems (Backend & Enterprise)
  {
    id: "salesforce",
    name: "Salesforce CRM",
    category: "Core Systems",
    icon: FaSalesforce,
    color: "text-blue-600",
    bg: "bg-blue-600/10",
    border: "border-blue-600/20",
    level: "Intermediate",
    exp: "6 Months",
    description: "Enterprise solutions, Apex, Visualforce & LWC.",
    docs: "https://developer.salesforce.com"
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "Core Systems",
    icon: SiFirebase,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    level: "Advanced",
    exp: "2 Years",
    description: "Real-time databases, auth, and serverless backend.",
    docs: "https://firebase.google.com"
  },
  {
    id: "node",
    name: "Node.js",
    category: "Core Systems",
    icon: FaNodeJs,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    level: "Intermediate",
    exp: "1.5 Years",
    description: "Backend logic and API development.",
    docs: "https://nodejs.org"
  },
  {
     id: "java",
     name: "Java",
     category: "Core Systems",
     icon: FaJava,
     color: "text-red-500",
     bg: "bg-red-500/10",
     border: "border-red-500/20",
     level: "Advanced",
     exp: "3 Years",
     description: "Object-oriented programming and enterprise backend logic.",
     docs: "https://www.java.com"
  },

  // Ordnance (Tools & Langs)
  {
      id: "git",
      name: "Git / GitHub",
      category: "Ordnance",
      icon: SiGithub,
      color: "text-white",
      bg: "bg-white/10",
      border: "border-white/20",
      level: "Expert",
      exp: "3 Years",
      description: "Version control and CI/CD workflows.",
      docs: "https://git-scm.com"
  },
  {
      id: "cpp",
      name: "C++",
      category: "Ordnance",
      icon: SiTypescript, // Using generic code icon as C++ icon might be missing in simple packs, or could import specific one if available. Keeping TS icon as placeholder or removing. Let's use FaPython instead if C++ unavailable or just generic.
      // Actually let's just stick to what we imported or knowns. I'll rely on the existing imports + FaJava.
      // I will leave C++ out of the visual cards for now to prevent broken icons, or swap for Python if preferred.
      // Let's use Python as it was in the resume.
      id: "python",
      name: "Python",
      category: "Ordnance",
      icon: FaPython,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20",
      level: "Intermediate",
      exp: "2 Years",
      description: "Scripting, DSA, and automation.",
      docs: "https://python.org"
  }
];

export default techStack;
