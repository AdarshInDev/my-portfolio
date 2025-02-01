import { motion } from "framer-motion";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-primary/90 backdrop-blur-sm shadow-lg z-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-secondary font-mono text-xl font-bold group"
          >
            <span className="text-textPrimary group-hover:text-secondary transition-colors">
              &lt;
            </span>
            <span className="group-hover:text-textPrimary transition-colors">
              AdarshInDev
            </span>
            <span className="text-textPrimary group-hover:text-secondary transition-colors">
              /&gt;
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/projects" className="nav-link">
              Projects
            </Link>
            <Link to="/music" className="nav-link">
              Music
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
            <a
              href="/resume.pdf"
              className="btn-outline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-textPrimary hover:text-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="md:hidden fixed top-16 right-0 bottom-0 w-3/4 bg-lightNavy p-6"
      >
        <div className="flex flex-col items-center space-y-6">
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link
            to="/projects"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>
          <Link
            to="/music"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Music
          </Link>
          <Link
            to="/contact"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <a
            href="/resume.pdf"
            className="btn-outline text-sm"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
          >
            Resume
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
