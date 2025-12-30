import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaChevronRight, FaSearch, FaTerminal } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getNavigationIntent } from '../../services/gemini';

const GlobalSearch = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);


    // Active Search removed to avoid API rate limits
    // useEffect(() => {}, [query]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        const intent = await getNavigationIntent(query);
        setPrediction(intent);
        setIsLoading(false);
    };

    const executeNavigation = () => {
        if (prediction && prediction.path) {
            navigate(prediction.path);
            onClose();
            setQuery('');
            setPrediction(null);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] px-4"
                >
                    {/* Blurred Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-lg"
                        onClick={onClose}
                    />

                    {/* Search Container */}
                    <motion.div
                        initial={{ scale: 0.9, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-2xl"
                    >
                        {/* Input Box */}
                        <div className="relative bg-[#0a0a12] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)]">
                            <form onSubmit={handleSearch} className="flex items-center p-6">
                                <FaTerminal className="text-cyan-500 text-xl mr-4 animate-pulse" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Enter command or natural query..."
                                    className="flex-1 bg-transparent text-xl text-white placeholder-gray-600 outline-none font-mono"
                                    autoComplete="off"
                                />
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <button type="submit" className="text-gray-500 hover:text-white transition-colors">
                                        <FaSearch />
                                    </button>
                                )}
                            </form>

                            {/* Separator / Decoration */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-900 to-transparent" />

                            {/* Results Area */}
                            <div className="min-h-[100px] p-4 bg-black/20 flex flex-col justify-center items-center text-center">
                                {!prediction && !isLoading && (
                                    <p className="text-gray-600 text-sm font-mono">
                                        AI Nav System Ready. Try "Show projects" or "Who are you?"
                                    </p>
                                )}

                                {prediction && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={executeNavigation}
                                        className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all w-full text-left"
                                    >
                                        <div className="p-3 rounded-full bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                                            <FaChevronRight />
                                        </div>
                                        <div>
                                            <div className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-1">
                                                AI Suggestion
                                            </div>
                                            <div className="text-white font-bold text-lg">
                                                {prediction.label}
                                            </div>
                                            <div className="text-gray-500 text-xs mt-1 font-mono">
                                                Route: {prediction.path}
                                            </div>
                                        </div>
                                        <div className="ml-auto text-xs text-gray-600 font-mono">
                                            [ENTER] to confirm
                                        </div>
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalSearch;
