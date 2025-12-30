import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import BentoGrid from '../components/ui/BentoGrid';
import HeroChat from '../components/ui/HeroChat';

const Home = () => {
    return (
        <div className="flex flex-col">

            {/* HERO SECTION */}
            <div className="min-h-screen flex flex-col justify-center items-start pt-20 relative">

                {/* Intro Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center space-x-3 mb-6"
                >
                    <span className="h-px w-12 bg-cyan-400"></span>
                    <span className="text-cyan-400 tracking-widest uppercase text-sm font-medium">
                        System Online
                    </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-6xl md:text-8xl font-bold leading-tight mb-8"
                >
                    Architecting <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                        Digital Void
                    </span>
                </motion.h1>

                {/* Subheadline (Branding Updated) */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
                >
                    Identity: <span className="text-white font-semibold">Adarsh Pradhan</span> (aka AdarshInDev).<br />
                    Front-end Architect & Product Thinker based in the Grid.
                    Building immersive web experiences with physics-based interactions
                    and clean code.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-wrap gap-6"
                >
                    <Link
                        to="/projects"
                        className="group relative px-8 py-4 bg-transparent border border-cyan-500/30 text-cyan-400 uppercase tracking-widest font-semibold overflow-hidden transition-all hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                    >
                        <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                            View Missions
                        </span>
                        <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>

                    <button
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                        className="px-8 py-4 text-gray-400 hover:text-white uppercase tracking-widest font-semibold transition-colors flex items-center gap-2"
                    >
                        Explore Sectors <span className="transform rotate-90 inline-block">→</span>
                    </button>
                </motion.div>

                {/* Chat Module */}
                {/* Chat Module */}
                <div className="w-full mt-12 lg:mt-0 lg:w-auto lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:mr-12 z-40 relative">
                    <HeroChat />
                </div>

            </div>

            {/* BENTO GRID NAVIGATION */}
            <div className="min-h-screen w-full relative z-10 flex flex-col justify-center">
                <div className="text-center mb-10">
                    <span className="text-cyan-400 font-mono tracking-widest uppercase text-sm">Navigation Matrix</span>
                    <h2 className="text-4xl font-bold mt-2">Access Sectors</h2>
                </div>
                <BentoGrid />
            </div>

            {/* FOOTER */}
            <Footer />

        </div>
    );
};

export default Home;
