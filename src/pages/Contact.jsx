import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, send data here
        alert("Transmission Sent! (Demo Mode)");
    };

    return (
        <div className="min-h-screen pt-24 md:pt-32 pb-20 max-w-4xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 px-6">

            {/* Text Side */}
            <div className="md:w-1/2">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-cyan-400 font-mono tracking-widest uppercase text-sm">
                        Signal Link
                    </span>
                    <h1 className="text-5xl font-bold mt-4 mb-6 leading-tight">
                        Initiate <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                            Transmission
                        </span>
                    </h1>
                    <p className="text-gray-400 mb-10 leading-relaxed">
                        Ready to collaborate on the next big system?
                        My frequency is open for opportunities in frontend architecture,
                        full-stack development, and product design.
                    </p>

                    <div className="space-y-4">
                        <a href="mailto:hello@example.com" className="flex items-center space-x-4 text-white hover:text-cyan-400 transition-colors bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan-400/50">
                            <div className="bg-cyan-500/20 p-3 rounded-full text-cyan-400">
                                <FaEnvelope />
                            </div>
                            <span className="font-mono">hello@adarshdev.com</span>
                        </a>

                        <div className="flex space-x-6 mt-8 pt-6 border-t border-white/10">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl"><FaGithub /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl"><FaLinkedin /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl"><FaTwitter /></a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Form Side */}
            <div className="md:w-1/2">
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-glass-panel p-8 rounded-2xl border border-white/10"
                >
                    <div className="mb-6">
                        <label className="block text-gray-400 text-sm font-mono mb-2">Identity</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-400 text-sm font-mono mb-2">Frequency (Email)</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-gray-400 text-sm font-mono mb-2">Coordinates (Message)</label>
                        <textarea
                            rows="4"
                            placeholder="Describe your mission..."
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                            value={formState.message}
                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold py-4 rounded-lg uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex justify-center items-center gap-2 group"
                    >
                        Send Transmission
                        <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </motion.form>

                {/* Secret Access Node */}
                <div className="flex justify-end mt-2">
                    <button
                        onClick={() => {
                            // Subtle "glitch" sound could go here
                            navigate('/dashboard-secret-x9z');
                        }}
                        className="text-white/5 hover:text-[#f26419] transition-colors p-2 rounded-full hover:bg-white/5 group"
                        title="Restricted Access"
                    >
                        <span className="text-xs group-hover:block hidden font-mono mr-2">ADMIN</span>
                        🔒
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Contact;
