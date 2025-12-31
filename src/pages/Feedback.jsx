import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaArrowRight, FaBug, FaCommentDots, FaLightbulb } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { submitFeedback } from '../services/feedbackService';

const flow = {
    start: {
        id: 'start',
        title: '🚨 Mission Debrief Initiated',
        subtitle: 'Help improve the system. Select where the anomaly occurred.',
        type: 'select',
        options: [
            'Mission Control (Home)',
            'Trajectory (About)',
            'Discoveries (Projects)',
            'Arsenal (Skills)',
            'Audio Logs (Music)',
            'Transmission (Contact)',
            'Global AI Search (AI Command)',
            'General / Not Sure'
        ],
        next: 'type'
    },
    type: {
        id: 'type',
        title: 'Signal Classification',
        subtitle: 'What kind of transmission is this?',
        type: 'cards',
        options: [
            { label: 'Error / Bug', icon: FaBug, value: 'error', color: 'text-red-400', next: 'error_class' },
            { label: 'Suggestion', icon: FaLightbulb, value: 'suggestion', color: 'text-yellow-400', next: 'suggestion_type' },
            { label: 'General', icon: FaCommentDots, value: 'general', color: 'text-cyan-400', next: 'general_desc' }
        ]
    },
    // --- ERROR PATH ---
    error_class: {
        id: 'error_class',
        title: 'Identify the Glitch',
        subtitle: 'What best describes the failure?',
        type: 'options',
        options: [
            'Page not loading / blank',
            'Broken link or button',
            'Animation glitch / lag',
            'AI Assistant hallucination',
            'Layout malfunction',
            'Other'
        ],
        next: 'error_severity'
    },
    error_severity: {
        id: 'error_severity',
        title: 'Damage Report',
        subtitle: 'How critical is this anomaly?',
        type: 'options',
        options: [
            '🚀 Critical (System Failure)',
            '⚠️ Moderate (Operational Hazard)',
            '🧊 Minor (Cosmetic Debris)'
        ],
        next: 'error_desc'
    },
    error_desc: {
        id: 'error_desc',
        title: 'Visual Log',
        subtitle: 'Describe the sequence of events.',
        type: 'text',
        placeholder: 'I clicked X and expected Y...',
        next: 'contact'
    },
    // --- SUGGESTION PATH ---
    suggestion_type: {
        id: 'suggestion_type',
        title: 'Upgrade Proposal',
        subtitle: 'What kind of enhancement is this?',
        type: 'options',
        options: [
            '🧠 New Feature',
            '🎨 UI / Visual Upgrade',
            '⚡ Performance Boost',
            '🤖 AI Intelligence Expansion',
            '🧭 Navigation / UX Flow'
        ],
        next: 'suggestion_impact'
    },
    suggestion_impact: {
        id: 'suggestion_impact',
        title: 'Projected Impact',
        subtitle: 'How will this improve the system?',
        type: 'options',
        options: [
            'Improves Clarity',
            'Optimizes Efficiency',
            'Enhances Aesthetics (Looks Cooler)',
            'Modernizes Tech Stack',
            'Increases Usability'
        ],
        next: 'suggestion_desc'
    },
    suggestion_desc: {
        id: 'suggestion_desc',
        title: 'Blueprint',
        subtitle: 'Explain your idea (short & sweet).',
        type: 'text',
        placeholder: 'We should implement...',
        next: 'contact'
    },
    // --- GENERAL PATH ---
    general_desc: {
        id: 'general_desc',
        title: 'Open Frequency',
        subtitle: 'Share your thoughts.',
        type: 'text',
        placeholder: 'I was thinking...',
        next: 'contact'
    },
    // --- CONTACT ---
    contact: {
        id: 'contact',
        title: 'Establish Comms?',
        subtitle: 'Do you require a response?',
        type: 'contact_mixed',
        next: 'success'
    },
    // --- SUCCESS ---
    success: {
        id: 'success',
        title: '📡 Signal Received',
        subtitle: 'Mission Control thanks you. Over and out.',
        type: 'success'
    }
};

const Feedback = () => {
    const [stepId, setStepId] = useState('start');
    const [history, setHistory] = useState(['start']);
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const currentStep = flow[stepId];

    const handleNext = async (nextId, key, value) => {
        let updatedData = { ...formData };
        if (key) {
            updatedData[key] = value;
            setFormData(prev => ({ ...prev, [key]: value }));
        }

        if (nextId === 'success') {
            setIsSubmitting(true);

            // Map specific form keys to generic Google Sheet headers
            const payload = {
                location: updatedData.location,
                type: updatedData.type,
                class_category: updatedData.error_class || updatedData.suggestion_type || '', // Maps to Classification
                severity_impact: updatedData.error_severity || updatedData.suggestion_impact || '', // Maps to Severity/Impact
                description: updatedData.error_desc || updatedData.suggestion_desc || updatedData.general_desc || '', // Maps to Description
                email: updatedData.email || 'Anonymous'
            };

            await submitFeedback(payload);
            setIsSubmitting(false);
        }

        if (nextId) {
            setHistory(prev => [...prev, nextId]);
            setStepId(nextId);
        } else if (currentStep.next) {
            setHistory(prev => [...prev, currentStep.next]);
            setStepId(currentStep.next);
        }
    };

    const handleBack = () => {
        if (history.length > 1) {
            const newHistory = [...history];
            newHistory.pop();
            setHistory(newHistory);
            setStepId(newHistory[newHistory.length - 1]);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 pt-24 relative overflow-hidden font-mono">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(242,100,25,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(242,100,25,0.05)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

            {/* Back Button */}
            <button onClick={handleBack} className="absolute top-24 left-6 text-gray-500 hover:text-[#f26419] uppercase tracking-widest text-xs z-50">
                ← Back / Abort
            </button>

            <AnimatePresence mode="wait">
                {isSubmitting ? (
                    <motion.div
                        key="submitting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-[#f26419] border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                            <h2 className="text-2xl font-bold text-white tracking-widest">TRANSMITTING...</h2>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key={stepId}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-2xl w-full text-left"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            {currentStep.title}
                        </h1>
                        <p className="text-lg text-[#f26419] mb-8 font-mono tracking-wide">
                            {currentStep.subtitle}
                        </p>

                        <div className="mb-12">
                            {/* SELECT DROP LIKE */}
                            {currentStep.type === 'select' && (
                                <div className="grid grid-cols-1 gap-2">
                                    {currentStep.options.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => handleNext('type', 'location', opt)}
                                            className="text-left p-4 border border-white/10 hover:border-[#f26419] hover:bg-[#f26419]/10 rounded-lg transition-all group flex justify-between items-center"
                                        >
                                            <span className="text-lg">{opt}</span>
                                            <FaArrowRight className="opacity-0 group-hover:opacity-100 text-[#f26419] transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* CARDS */}
                            {currentStep.type === 'cards' && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {currentStep.options.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleNext(opt.next, 'type', opt.value)}
                                            className="flex flex-col items-center justify-center p-8 border border-white/10 hover:border-[#f26419] hover:bg-white/5 rounded-xl transition-all gap-4 text-center group"
                                        >
                                            <opt.icon size={40} className={`mb-2 ${opt.color} group-hover:scale-110 transition-transform`} />
                                            <span className="font-bold text-lg">{opt.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* OPTIONS LIST */}
                            {currentStep.type === 'options' && (
                                <div className="grid grid-cols-1 gap-3">
                                    {currentStep.options.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => handleNext(null, currentStep.id, opt)} // Auto navigate to default 'next'
                                            className="text-left px-6 py-4 bg-white/5 hover:bg-[#f26419] hover:text-black rounded-lg transition-colors font-bold tracking-wider"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* TEXT INPUT */}
                            {currentStep.type === 'text' && (
                                <div className="flex flex-col gap-4">
                                    <textarea
                                        className="w-full bg-black border border-white/20 p-4 text-xl focus:border-[#f26419] focus:outline-none rounded-lg min-h-[150px]"
                                        placeholder={currentStep.placeholder}
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                if (e.target.value.trim()) handleNext(null, currentStep.id, e.target.value);
                                            }
                                        }}
                                        onChange={(e) => setFormData(prev => ({ ...prev, [currentStep.id]: e.target.value }))}
                                    />
                                    <button
                                        onClick={() => handleNext(null, currentStep.id, formData[currentStep.id])}
                                        className="self-end bg-[#f26419] text-black font-bold px-8 py-3 rounded-full hover:bg-white transition-colors"
                                    >
                                        Proceed →
                                    </button>
                                </div>
                            )}

                            {/* CONTACT TOGGLE */}
                            {currentStep.type === 'contact_mixed' && (
                                <div className="flex flex-col gap-6">
                                    <button
                                        onClick={() => handleNext('success', 'contact', 'Anonymous')}
                                        className="p-6 border border-white/10 hover:bg-white/5 rounded-xl text-left"
                                    >
                                        <h3 className="text-xl font-bold mb-1">Stay Ghost 👻</h3>
                                        <p className="text-gray-400 text-sm">Submit anonymously. No response needed.</p>
                                    </button>

                                    <div className="p-6 border border-white/10 rounded-xl">
                                        <h3 className="text-xl font-bold mb-4">Open Channel 📡</h3>
                                        <div className="flex gap-2">
                                            <input
                                                type="email"
                                                placeholder="enter.your@frequency.com"
                                                className="bg-transparent border-b border-gray-600 focus:border-[#f26419] flex-1 py-2 outline-none"
                                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            />
                                            <button
                                                onClick={() => handleNext('success', 'contact', formData.email)}
                                                className="text-[#f26419] font-bold uppercase text-sm hover:text-white"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SUCCESS */}
                            {currentStep.type === 'success' && (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => navigate('/')}
                                        className="bg-[#f26419] hover:bg-white hover:text-black text-white font-bold py-4 px-10 rounded-full transition-all"
                                    >
                                        Return to Base
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Feedback;
