import { motion } from 'framer-motion';
import { FaHome, FaMusic, FaRocket, FaSatellite, FaTools, FaUserAstronaut } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { name: 'Mission', path: '/', icon: FaHome, color: 'bg-cyan-500', borderColor: 'border-cyan-400', shadow: 'shadow-cyan-500/50' },
    { name: 'Discoveries', path: '/projects', icon: FaRocket, color: 'bg-blue-500', borderColor: 'border-blue-400', shadow: 'shadow-blue-500/50' },
    { name: 'Arsenal', path: '/skills', icon: FaTools, color: 'bg-orange-500', borderColor: 'border-orange-400', shadow: 'shadow-orange-500/50' },
    { name: 'Trajectory', path: '/about', icon: FaUserAstronaut, color: 'bg-purple-500', borderColor: 'border-purple-400', shadow: 'shadow-purple-500/50' },
    { name: 'Audio Logs', path: '/music', icon: FaMusic, color: 'bg-pink-500', borderColor: 'border-pink-400', shadow: 'shadow-pink-500/50' },
    { name: 'Transmission', path: '/contact', icon: FaSatellite, color: 'bg-emerald-500', borderColor: 'border-emerald-400', shadow: 'shadow-emerald-500/50' },
];

const FolderTab = ({ item, index, isActive }) => {
    return (
        <Link to={item.path} className="relative group block">
            <motion.div
                initial={{ x: 140 }}
                whileHover={{ x: 20 }}
                animate={{ x: 140 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }} // Snappy spring animation
                className="relative h-16 w-64 cursor-pointer" // Increased height to h-16
            >
                {/* Folder Silhouette */}
                <div className="absolute inset-0 flex items-end">

                    {/* Folder Tab (Back) */}
                    <div
                        className={`absolute top-0 left-0 w-24 h-full rounded-t-xl transform skew-x-12 origin-bottom-left ${item.color} opacity-60 group-hover:opacity-80 transition-opacity`}
                    />

                    {/* Folder Body (Main) */}
                    <div
                        className={`
                            relative z-10 w-full h-[85%] rounded-l-xl rounded-br-none
                            ${item.color} bg-opacity-20 backdrop-blur-md
                            border-l-2 border-t-2 border-b-2 ${item.borderColor} border-opacity-50
                            flex items-center pl-6 pr-4
                            shadow-[0_0_15px_rgba(0,0,0,0.3)]
                            group-hover:bg-opacity-30 transition-all
                        `}
                        style={{
                            boxShadow: isActive ? `0 0 20px ${item.color.replace('bg-', '')}` : ''
                        }}
                    >
                        {/* Inner Folder Line (Cosmic Detail) */}
                        <div className="absolute inset-1 border border-white/10 rounded-l-lg pointer-events-none" />

                        <div className="flex items-center gap-4 text-white">
                            <item.icon className={`text-xl drop-shadow-md ${isActive ? 'text-white' : 'text-gray-200'}`} />
                            <span className={`font-mono text-sm tracking-widest uppercase font-bold drop-shadow-md ${isActive ? 'text-white' : 'text-gray-200'}`}>
                                {item.name}
                            </span>
                        </div>

                        {/* Active Indicator Light */}
                        {isActive && (
                            <div className="absolute right-2 top-2 w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_white]" />
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

const SideStackNav = () => {
    const location = useLocation();

    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col py-4 pr-0 overflow-visible">

            {/* Stack Container - Reduced overlap by using -space-y-1 instead of -space-y-2, or can use gap-1 for positive space */}
            {/* User requested "keep little space", implying visible separation. Changing to gap-2 for clear separation. */}
            <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                    <FolderTab
                        key={item.path}
                        item={item}
                        index={index}
                        isActive={location.pathname === item.path}
                    />
                ))}
            </div>

        </div>
    );
};

export default SideStackNav;
