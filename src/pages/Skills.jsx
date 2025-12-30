import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaLaptopCode, FaServer, FaTools } from 'react-icons/fa';
import techStack from '../data/techStack';


const Skills = () => {
    const [filter, setFilter] = useState('All');

    const categories = [
        { name: 'All', icon: null },
        { name: 'Frontline', icon: FaLaptopCode },
        { name: 'Core Systems', icon: FaServer },
        { name: 'Ordnance', icon: FaTools },
    ];

    const filteredTech = filter === 'All'
        ? techStack
        : techStack.filter(t => t.category === filter);

    return (
        <div className="pt-32 pb-20 min-h-screen px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-cyan-400 font-mono tracking-widest uppercase text-sm"
                    >
                        // ARSENAL_INVENTORY
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold mt-4 mb-6 text-white"
                    >
                        Tech Armory
                    </motion.h1>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        A categorized manifest of weapons-grade tools and frameworks deployed across my projects.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setFilter(cat.name)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 font-mono text-sm tracking-wider uppercase
                              ${filter === cat.name
                                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                                    : 'bg-black/40 border-white/10 text-gray-500 hover:border-white/30 hover:text-white'}
                            `}
                        >
                            {cat.icon && <cat.icon />}
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredTech.map((tech) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={tech.id}
                            className="bg-zinc-900/80 border border-white/10 p-6 rounded-2xl relative group hover:border-cyan-500/50 hover:bg-zinc-800 transition-all duration-500 overflow-hidden"
                        >
                            {/* Background Grid Pattern */}
                            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05]" />

                            <div className="flex items-start justify-between mb-6 relative z-10">
                                <div className={`p-4 rounded-xl ${tech.bg} ${tech.color} text-3xl group-hover:scale-110 transition-transform duration-500`}>
                                    <tech.icon />
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">Level</div>
                                    <div className={`text-xs font-bold ${tech.color} px-2 py-1 rounded bg-white/5 inline-block`}>
                                        {tech.level.toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{tech.name}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 h-12 overflow-hidden">
                                    {tech.description}
                                </p>

                                {/* Stats Bar */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs font-mono text-gray-500">
                                        <span>PROFICIENCY</span>
                                        <span>{tech.level === 'Expert' ? '98%' : tech.level === 'Advanced' ? '85%' : '70%'}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: tech.level === 'Expert' ? '98%' : tech.level === 'Advanced' ? '85%' : '70%' }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className={`h-full ${tech.color.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`}
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                                    <span className="text-xs text-gray-600 font-mono">EXP: {tech.exp}</span>
                                    <a
                                        href={tech.docs}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs text-cyan-500 hover:text-white transition-colors uppercase tracking-wider font-bold"
                                    >
                                        Docs_Link ↗
                                    </a>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Skills;
