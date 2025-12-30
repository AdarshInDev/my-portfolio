import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaBook, FaExternalLinkAlt, FaLayerGroup, FaMicrochip, FaTimes } from 'react-icons/fa';

const TechModal = ({ tech, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        }
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!tech) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
        >
            {/* Darkened Backdrop */}
            <div
                className="absolute inset-0 bg-black/90"
                onClick={onClose}
            />

            {/* Modal Card */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-2xl bg-[#030305] border border-cyan-500/30 rounded-xl overflow-hidden shadow-[0_0_100px_rgba(0,240,255,0.1)] flex flex-col md:flex-row"
            >
                {/* Decorative Corner Brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500 rounded-tl-xl z-20" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500 rounded-tr-xl z-20" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500 rounded-bl-xl z-20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500 rounded-br-xl z-20" />


                {/* Left Side: Visual / Icon */}
                <div className="w-full md:w-1/3 bg-white/5 relative flex items-center justify-center p-12 overflow-hidden">
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />

                    {/* Glowing Orb/Icon Container */}
                    <div className="relative z-10">
                        <div className={`absolute inset-0 ${tech.bg} blur-2xl opacity-40 animate-pulse`} />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className={`w-24 h-24 rounded-full border-2 border-dashed ${tech.border} flex items-center justify-center`}
                        >
                        </motion.div>
                        <tech.icon className={`absolute inset-0 m-auto text-5xl ${tech.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]`} />
                    </div>

                    {/* Metadata decorations */}
                    <div className="absolute top-4 left-4 text-[10px] font-mono text-cyan-500/50">
                        SYS_ID: {tech.id.toUpperCase()}
                    </div>
                    <div className="absolute bottom-4 right-4 text-[10px] font-mono text-cyan-500/50">
                        STATUS: ACTIVE
                    </div>
                </div>

                {/* Right Side: Data */}
                <div className="w-full md:w-2/3 p-8 relative bg-black/40 backdrop-blur-md">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-30 p-2 text-cyan-500 hover:text-white hover:bg-cyan-500/20 rounded-full transition-all"
                    >
                        <FaTimes size={18} />
                    </button>

                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl font-bold font-heading text-white tracking-wide">{tech.name}</h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                        </div>
                        <div className="flex gap-2">
                            <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest border ${tech.border} ${tech.color} rounded bg-black/50`}>
                                {tech.level}
                            </span>
                            <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest border border-white/10 text-gray-400 rounded bg-black/50">
                                CORE_MODULE
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3">
                            <FaMicrochip className="mt-1 text-cyan-500/70" size={14} />
                            <p className="text-gray-300 text-sm leading-relaxed font-light">
                                {tech.description}
                            </p>
                        </div>

                        <div className="p-3 rounded bg-white/5 border border-white/5 flex items-center gap-3">
                            <FaLayerGroup className="text-purple-400" size={16} />
                            <div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Usage Frequency</div>
                                <div className="h-1.5 w-32 bg-gray-700 rounded-full mt-1 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "85%" }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                        className={`h-full ${tech.bg.replace('/10', '')} bg-opacity-100`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <a
                        href={tech.docs}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative w-full flex items-center justify-center gap-2 py-3 bg-cyan-900/10 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-400 font-mono text-sm tracking-wider uppercase transition-all overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <FaBook /> Access Documentation <FaExternalLinkAlt size={10} />
                        </span>

                        {/* Hover fill animation */}
                        <div className="absolute inset-0 bg-cyan-400/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    </a>

                </div>

            </motion.div>
        </motion.div>
    );
};

export default TechModal;
