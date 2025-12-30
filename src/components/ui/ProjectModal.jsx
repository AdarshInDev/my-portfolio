import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaCodeBranch, FaExternalLinkAlt, FaGithub, FaServer, FaTimes } from 'react-icons/fa';

const ProjectModal = ({ project, onClose }) => {
    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        }
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // If no project, we don't render anything (AnimatePresence in parent handles exit)
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
        >
            {/* Darkened Backdrop */}
            <div
                className="absolute inset-0 bg-black/90"
                onClick={onClose}
            />

            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full max-w-6xl bg-[#030305] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.7)] flex flex-col md:flex-row max-h-[90vh]"
            >
                {/* Decorative Corner Brackets */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-2xl z-20 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/50 rounded-br-2xl z-20 pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/60 hover:bg-red-500/20 text-white rounded-full transition-colors border border-white/10"
                >
                    <FaTimes size={18} />
                </button>

                {/* Image Section (Left/Top) */}
                <div className="w-full md:w-3/5 relative h-64 md:h-auto overflow-hidden group border-r border-white/5">

                    {/* Grid Overlay on Image */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] z-10 pointer-events-none" />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent z-10" />

                    {/* Cyberpunk Scan Line Effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 shadow-[0_0_15px_rgba(0,255,255,0.5)] z-20 opacity-0 group-hover:opacity-100 animate-scan pointer-events-none" />

                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale-[0.2] group-hover:grayscale-0"
                    />

                    {/* Status Badge */}
                    <div className="absolute bottom-6 left-6 z-20 flex flex-col items-start gap-1">
                        <div className="text-[10px] font-mono text-cyan-500/80 uppercase tracking-widest bg-black/50 px-2 py-1 rounded border border-cyan-500/20 backdrop-blur-md">
                            System Identity
                        </div>
                        <span className="text-2xl md:text-4xl font-bold text-white tracking-tighter drop-shadow-lg">
                            {project.title.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="h-1 w-1 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs font-mono text-green-400">OPERATIONAL</span>
                        </div>
                    </div>
                </div>

                {/* Content Section (Right/Bottom) */}
                <div className="w-full md:w-2/5 flex flex-col bg-[#050508] relative">
                    {/* Tech Pattern Background */}
                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                    <div className="p-8 overflow-y-auto custom-scrollbar flex-1 relative z-10">
                        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                            <span className="font-mono text-xs text-cyan-500/60">SYS_ID: {project.id.toUpperCase()}</span>
                            <span className="font-mono text-xs text-gray-600">{project.year}</span>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-300 leading-relaxed mb-8 text-sm md:text-base space-y-4 font-light"
                        >
                            <p>{project.description}</p>

                            <div className="bg-white/5 border border-white/5 p-4 rounded-lg mt-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaServer className="text-purple-400 text-xs" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">System Architecture</span>
                                </div>
                                <p className="text-xs text-gray-500 italic">
                                    "Additional technical specifications and expanded project details could be loaded here. Currently showing high-level system summary for {project.title}."
                                </p>
                            </div>
                        </motion.div>

                        <div className="mb-8">
                            <h3 className="text-cyan-500/60 text-[10px] font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                                <FaCodeBranch /> Tech Matrix
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map(tech => (
                                    <span key={tech} className="px-3 py-1.5 text-xs font-medium bg-cyan-900/10 border border-cyan-500/20 text-cyan-100 rounded hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-colors cursor-default">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-white/10 bg-black/20 flex gap-4 mt-auto relative z-10">
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] group"
                            >
                                <FaExternalLinkAlt className="group-hover:rotate-45 transition-transform" /> Live Demo
                            </a>
                        )}
                        <a
                            href="#"
                            className="flex-1 bg-transparent hover:bg-white/5 text-white border border-white/20 py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:border-white/40"
                        >
                            <FaGithub /> Source Code
                        </a>
                    </div>

                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;
