import { Link } from 'react-router-dom';

const NewsTicker = () => {
    return (
        <div className="w-full bg-[#f26419]/90 backdrop-blur-sm border-y border-[#f26419]/50 overflow-hidden relative z-40 h-10 flex items-center shadow-[0_0_15px_rgba(242,100,25,0.4)] mt-20">
            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
            <Link to="/feedback" className="flex items-center w-full h-full cursor-pointer hover:bg-[#f26419] transition-colors">
                <div className="flex whitespace-nowrap font-bold text-black uppercase tracking-widest text-sm animate-scroll">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex shrink-0 gap-8 px-4">
                            <span>⚡ Give Your Feedback on the Portfolio</span>
                            <span>•</span>
                            <span>Limited Time Only</span>
                            <span>•</span>
                            <span>Help Improve The System</span>
                            <span>•</span>
                        </div>
                    ))}
                </div>
            </Link>
        </div >
    );
};

export default NewsTicker;
