import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaSearch } from 'react-icons/fa';
import { RiCloseLine, RiMenu4Line } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import GlobalSearch from '../ui/GlobalSearch';

const NavLink = ({ to, children, isActive }) => (
  <Link
    to={to}
    className={`relative px-4 py-2 text-sm uppercase tracking-wider transition-colors duration-300
      ${isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}
    `}
  >
    {children}
    {isActive && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
    )}
  </Link>
);

const SocialLink = ({ href, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
  >
    <Icon size={20} />
  </a>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Mission', path: '/' },
    { name: 'Trajectory', path: '/about' },
    { name: 'Discoveries', path: '/projects' },
    { name: 'Arsenal', path: '/skills' },
    // { name: 'Audio Logs', path: '/music' },
    { name: 'Transmission', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent
          ${isScrolled ? 'glass-panel py-4' : 'bg-transparent py-6'}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo / Identity */}
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
            Adarsh<span className="text-cyan-400">InDev</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all"
              title="AI Command Search"
            >
              <FaSearch size={18} />
            </button>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex space-x-4">
              <SocialLink href="https://github.com" icon={FaGithub} />
              <SocialLink href="https://linkedin.com" icon={FaLinkedin} />
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-400 hover:text-cyan-400"
            >
              <FaSearch size={20} />
            </button>
            <button
              className="text-white hover:text-cyan-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <RiMenu4Line size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Global AI Search Overlay */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl transition-transform duration-500 flex flex-col justify-center items-center space-y-8
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <button
          className="absolute top-6 right-6 text-white/50 hover:text-white"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <RiCloseLine size={32} />
        </button>

        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl font-light tracking-widest hover:text-cyan-400 transition-colors"
          >
            {link.name}
          </Link>
        ))}

        <button
          onClick={() => {
            setIsMobileMenuOpen(false);
            navigate('/dashboard-secret-x9z');
          }}
          className="absolute bottom-8 text-white/5 active:text-[#f26419] transition-colors p-4"
        >
          🔒
        </button>
      </div>
    </>
  );
};

export default Navbar;
