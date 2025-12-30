import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaCode, FaEnvelope, FaMousePointer, FaRocket, FaUserAstronaut } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import techStack from '../../data/techStack';
import TechModal from './TechModal';

const BentoItem = ({ to, className, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/50 transition-colors duration-500 ${className}`}
    >
        <Link to={to} className="block h-full w-full p-8 relative z-10 flex flex-col justify-between">
            {children}
        </Link>

        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
);

const BentoGrid = () => {
    const [selectedTech, setSelectedTech] = useState(null);

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-6 h-[120vh] md:h-[80vh]">

                {/* Project Command Center (Large) */}
                <BentoItem to="/projects" className="md:col-span-2 md:row-span-3 bg-gradient-to-b from-white/5 to-cyan-900/10">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-cyan-500/20 rounded-full text-cyan-400">
                            <FaRocket size={24} />
                        </div>
                        <span className="text-xs text-gray-500 font-mono">COMMAND CENTER</span>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold mb-2 text-white">Discoveries</h3>
                        <p className="text-gray-400 max-w-sm">
                            Explore the deployed missions. A collection of complex systems and experimental interfaces.
                        </p>
                    </div>
                    <div className="absolute right-4 bottom-4 opacity-50 text-9xl text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-700">
                        <FaCode />
                    </div>
                </BentoItem>

                {/* About Module (Medium) */}
                <BentoItem to="/about" className="md:col-span-2 md:row-span-1" delay={0.1}>
                    <div className="flex justify-between items-center">
                        <div className="p-2 bg-purple-500/20 rounded-full text-purple-400">
                            <FaUserAstronaut size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">Trajectory</h3>
                    </div>
                    <p className="mt-4 text-gray-400 text-sm">
                        Read the biography of Adarsh Pradhan. From the first line of code to system architecture.
                    </p>
                </BentoItem>

                {/* Tech Stack (Small) - Interactive Capsules */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="md:col-span-1 md:row-span-2 rounded-3xl border border-white/10 bg-black/40 flex flex-col justify-center items-center p-6 text-center relative overflow-hidden"
                >
                    <span className="text-cyan-400 font-mono text-xs mb-6 tracking-widest uppercase">Core Systems</span>

                    <div className="flex flex-wrap justify-center gap-3 relative z-10">
                        {techStack.map((tech) => (
                            <motion.button
                                key={tech.id}
                                onClick={() => setSelectedTech(tech)}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                whileHover={{ scale: 1.1, y: -2, borderColor: 'rgba(255,255,255,0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300
                                  ${tech.bg} ${tech.border} ${tech.color}
                                  hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]
                                `}
                            >
                                {tech.name}
                            </motion.button>
                        ))}
                    </div>

                    {/* Interaction Hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-5 right-5 flex items-center gap-3 pointer-events-none"
                    >
                        <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">Inspect</span>
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <FaMousePointer className="text-cyan-400 text-lg drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                        </motion.div>
                    </motion.div>

                    {/* Background glow effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
                </motion.div>

                {/* Contact Link (Medium) */}
                <BentoItem to="/contact" className="md:col-span-1 md:row-span-2 bg-gradient-to-t from-purple-900/10 to-transparent" delay={0.3}>
                    <div className="h-full flex flex-col justify-center items-center text-center">
                        <div className="p-4 bg-white/5 rounded-full mb-4 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300">
                            <FaEnvelope size={24} />
                        </div>
                        <h3 className="text-lg font-bold">Open Channel</h3>
                        <span className="text-xs text-gray-500 mt-2 font-mono group-hover:text-cyan-400">INITIATE_CONTACT</span>
                    </div>
                </BentoItem>

            </div>

            <AnimatePresence>
                {selectedTech && (
                    <TechModal
                        tech={selectedTech}
                        onClose={() => setSelectedTech(null)}
                    />
                )}
            </AnimatePresence>

        </div>
    );
};

export default BentoGrid;
