import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Terminal from '../components/ui/Terminal';
import timelineData from '../data/timeline.json';

const TimelineNode = ({ item, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={`relative flex items-center justify-between mb-24 w-full ${isEven ? 'flex-row-reverse' : ''}`}
        >
            {/* Content Side */}
            <div className="w-5/12">
                <div className={`p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/30 transition-colors duration-500
          ${isEven ? 'text-right' : 'text-left'}
        `}>
                    <span className="text-cyan-400 font-mono text-sm tracking-widest">{item.year}</span>
                    <h3 className="text-2xl font-bold text-white mt-1 mb-2">{item.subtitle}</h3>
                    <h4 className="text-purple-400 text-sm font-semibold uppercase tracking-wider mb-3">{item.title}</h4>
                    <p className="text-gray-400 leading-relaxed text-sm">
                        {item.description}
                    </p>
                </div>
            </div>

            {/* Center Node */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.8)] z-10" />
                <div className="w-8 h-8 rounded-full border border-cyan-400/30 absolute top-1/2 -translate-y-1/2 animate-pulse" />
            </div>

            {/* Empty Side (for balance) */}
            <div className="w-5/12" />
        </motion.div>
    );
};

const About = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={targetRef} className="pt-32 pb-32 relative">

            {/* Header */}
            <div className="text-center mb-20">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-cyan-400 font-mono tracking-widest uppercase text-sm"
                >
                    Career Trajectory
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl md:text-6xl font-bold mt-4"
                >
                    My Journey
                </motion.h1>
            </div>

            {/* Timeline Container */}
            <div className="relative max-w-5xl mx-auto px-6">

                {/* The Central Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
                    {/* Active Line (fills on scroll) */}
                    <motion.div
                        style={{ height }}
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                    />
                </div>

                {/* Nodes */}
                <div className="relative z-10">
                    {timelineData.map((item, index) => (
                        <TimelineNode key={index} item={item} index={index} />
                    ))}
                </div>

            </div>


            {/* Terminal Section */}
            <div className="mt-32 max-w-3xl mx-auto px-6">
                <div className="text-center mb-8">
                    <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                        // DIRECT_INTERFACE_DETECTED
                    </span>
                </div>
                <Terminal />
            </div>

        </div >
    );
};

export default About;
