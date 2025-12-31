import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import { getChatResponse } from '../../services/gemini';

const HeroChat = () => {
    // Use Global Context state
    const { messages, setMessages, isOpen, setIsOpen } = useChat();

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    // Set initial open state logic - only run once on mount if needed, 
    // but better to respect current context state if it was already set.
    // If context is fresh (e.g. refresh), check window size.
    useEffect(() => {
        // Only set default if it hasn't been touched? 
        // For now, let's just respect the component logic:
        // If it's the very first load (one message), we can check width.
        if (messages.length === 1 && window.innerWidth >= 1024) {
            setIsOpen(true);
        }
    }, []);

    // Auto-scroll logic
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]); // Add isOpen dependency to scroll when opened

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setInput('');

        // Add User Message
        const newMessages = [...messages, { role: 'user', text: userMsg }];
        setMessages(newMessages);
        setIsLoading(true);

        const aiResponse = await getChatResponse([], userMsg);

        setMessages(prev => [...prev, {
            role: 'model',
            text: aiResponse.text,
            suggestion: aiResponse.suggestion
        }]);
        setIsLoading(false);
    };

    if (!isOpen) return (
        <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            onClick={() => setIsOpen(true)}
            className="w-full lg:w-auto flex items-center justify-center gap-3 p-4 lg:p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-xl lg:rounded-full lg:bg-cyan-500 lg:shadow-[0_0_20px_rgba(0,240,255,0.5)] z-40 text-cyan-400 lg:text-black hover:bg-cyan-500/30 lg:hover:bg-cyan-400 transition-all"
        >
            <FaRobot size={24} />
            <span className="lg:hidden font-mono text-sm uppercase tracking-widest">Initialise AI Link</span>
        </motion.button>
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:max-w-md bg-black/60 lg:bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[350px] lg:h-[400px] shadow-[0_0_30px_rgba(0,0,0,0.5)] relative"
        >
            {/* Mobile Close Button */}
            <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden absolute top-4 right-4 z-50 text-gray-400 hover:text-white"
            >
                ✕
            </button>
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                    <span className="font-mono text-sm tracking-widest text-cyan-400">AI_ASSISTANT v2.5</span>
                </div>
                {/* <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                    <FaTimes />
                </button> */}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" ref={scrollRef}>
                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        <div className={`
                            max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed mb-1
                            ${msg.role === 'user'
                                ? 'bg-cyan-500/20 text-cyan-100 rounded-br-none border border-cyan-500/30'
                                : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/10'}
                        `}>
                            {msg.text}
                        </div>

                        {/* Render Suggestion Capsule if present */}
                        {msg.suggestion && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => navigate(msg.suggestion.path)}
                                className="mt-2 text-xs flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all cursor-pointer"
                            >
                                <span>{msg.suggestion.label}</span>
                                <span className="text-[10px]">↗</span>
                            </motion.button>
                        )}
                    </motion.div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white/5 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/20 relative z-20">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about Adarsh..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all font-mono"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default HeroChat;
