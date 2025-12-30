import { motion } from 'framer-motion';
import YouTube from 'react-youtube';

const videos = [
    {
        id: "mYe8ud9lAS4",
        title: "Hawayien || Cover By Adarsh Pradhan",
        description: "A soulful rendition of Hawayien.",
    },
    {
        id: "F-idqtLULDo",
        title: "Tere Hawale || Raw Cover",
        description: "A heartfelt raw cover from the movie Animal.",
    },
    {
        id: "jmEefJG94cg",
        title: "Kahani Suno Cover",
        description: "Experiencing the emotions of Kahani Suno.",
    },
    {
        id: "WU8SYdyidBQ",
        title: "Oh Mehrama",
        description: "Exploring vocal textures with Mehrama.",
    },
    {
        id: "_0oZdFKdbN4",
        title: "Sajni (Laapata Ladies)",
        description: "A gentle take on this beautiful track.",
    },
    {
        id: "S5ZQA0XFzu0",
        title: "Koi Fariyaad Unplugged",
        description: "Tribute to the legendary Jagjit Singh.",
    },
];

const Music = () => {
    const opts = {
        height: "100%",
        width: "100%",
        playerVars: {
            autoplay: 0,
            modestbranding: 1,
            rel: 0,
        },
    };

    return (
        <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">

            {/* Header */}
            <div className="text-center mb-16">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-cyan-400 font-mono tracking-widest uppercase text-sm"
                >
                    Frequency Modulation
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-6xl font-bold mt-4 mb-6"
                >
                    Audio Logs
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-400 max-w-2xl mx-auto leading-relaxed"
                >
                    When I'm not architecting systems, I'm exploring soundscapes.
                    A collection of vocal covers and musical experiments.
                </motion.p>
            </div>

            {/* Stats Band */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
            >
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                    <h4 className="text-3xl font-bold text-cyan-400 mb-2">80+</h4>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Subscribers</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                    <h4 className="text-3xl font-bold text-cyan-400 mb-2">40+</h4>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Transmissions</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                    <h4 className="text-3xl font-bold text-cyan-400 mb-2">8.6K+</h4>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Total Views</p>
                </div>
            </motion.div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videos.map((video, index) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-black/50 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-colors group"
                    >
                        {/* Video Container */}
                        <div className="relative aspect-video w-full bg-black">
                            <YouTube
                                videoId={video.id}
                                opts={opts}
                                className="w-full h-full absolute inset-0"
                                iframeClassName="w-full h-full"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{video.title}</h3>
                            <p className="text-gray-400 text-sm">{video.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <a
                    href="https://www.youtube.com/@adarsh.pradhan"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-transform hover:scale-105"
                >
                    <span>View Channel on YouTube</span>
                </a>
            </div>

        </div>
    );
};

export default Music;
