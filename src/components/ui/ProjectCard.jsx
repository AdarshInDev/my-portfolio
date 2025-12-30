import { motion } from 'framer-motion';

const ProjectCard = ({ project, index, onClick }) => {
    return (
        <motion.div
            layoutId={`project-${project.id}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => onClick(project)}
            className="group relative w-full md:w-[45%] lg:w-[30%] bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-colors duration-500 cursor-pointer"
        >
            {/* Image Overlay */}
            <div className="relative h-48 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            {/* Content */}
            <div className="p-6 relative z-10 pointer-events-none">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-cyan-400 text-xs font-mono tracking-widest">{project.year}</span>
                    <span className="text-xs text-gray-500 font-mono group-hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100">// INSPECT</span>
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-xs text-cyan-200 bg-cyan-900/20 border border-cyan-900/50 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="px-3 py-1 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full">
                            +{project.tech.length - 3}
                        </span>
                    )}
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-xl transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
};

export default ProjectCard;
