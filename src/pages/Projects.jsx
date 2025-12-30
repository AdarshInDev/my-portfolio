import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectModal from '../components/ui/ProjectModal';
import projectsData from '../data/projects.json';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">

            {/* Header */}
            <div className="mb-16">
                <motion.h1
                    className="text-5xl md:text-7xl font-bold mb-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Mission <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                        Log
                    </span>
                </motion.h1>
                <motion.p
                    className="text-gray-400 text-lg max-w-xl"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    A collection of deployed systems, experiments, and architectural patterns.
                    Click on a mission to inspect secure details.
                </motion.p>
            </div>

            {/* Grid */}
            <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                {projectsData.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        onClick={setSelectedProject}
                    />
                ))}
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

        </div>
    );
};

export default Projects;
