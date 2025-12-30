import { FaGithub, FaHeart, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-md pt-12 pb-8 mt-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

                {/* Brand */}
                <h2 className="text-2xl font-bold font-heading tracking-tight mb-6">
                    Adarsh<span className="text-cyan-400">InDev</span>
                </h2>

                {/* Links */}
                <div className="flex space-x-8 mb-8 text-gray-400">
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                        <FaGithub size={24} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                        <FaLinkedin size={24} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                        <FaTwitter size={24} />
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-center text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} Adarsh Pradhan. All systems nominal.</p>
                    <p className="mt-2 flex items-center justify-center gap-1">
                        Built with <FaHeart className="text-red-500/50" /> in the Digital Void
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
