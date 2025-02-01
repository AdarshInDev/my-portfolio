import { motion } from "framer-motion";
import { FaYoutube } from "react-icons/fa";
import YouTube from "react-youtube";

const Music = () => {
  const videos = [
    {
      id: "mYe8ud9lAS4", // removed the query parameters
      title: "Hawayien || Cover By Adarsh Pradhan",
      description:
        "adarsh.pradhan follow for more such covers if you like my content ...... ❤️✨",
    },
 
    {
      id: "F-idqtLULDo",
      title: "Tere Hawale || Raw Cover By Adarsh Pradhan",
      description: "A heartfelt cover of Tere Hawaale from Animal",
    },

    {
      id: "jmEefJG94cg",
      title: "Kahani Suno Cover | Adarsh Pradhan",
      description: "Soulful rendition of Kahani Suno",
    },
    {
        id: "WU8SYdyidBQ",
        title: "Mehrama cover by @adarsh.pradhan || O Mehrama 💞 || ",
        description: "Tried this beautiful song",
      },
      {
        id: "_0oZdFKdbN4",
        title: "Sajni - Cover Song By Adarsh Pradhan|| Laapata Ladies",
        description: "Soulful rendition of Sajni Re",
      },
      {
        id: "S5ZQA0XFzu0",
        title: "Koi Fariyaad Unplugged Cover By Adarsh Pradhan 🎙 || @Jagjit Singh ❤ || Tum Bin (2001)",
        description: "Tried Koi Fariyaad Song Unplugged ",
      },
  ];

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
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-primary via-darkGray to-primary">
      {/* Previous sections remain the same until videos grid */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title text-textPrimary mb-16"
      >
        My Musical Journey
      </motion.h2>

      {/* Channel Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card max-w-4xl mx-auto mb-16 p-8 text-center"
      >
        <h3 className="text-2xl font-bold text-textPrimary mb-4">
          Adarsh Pradhan
        </h3>
        <p className="text-textSecondary mb-6">
          Welcome to my musical corner! Here I share my passion for music
          through covers and mashups. Join me on this melodious journey.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.youtube.com/@adarsh.pradhan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <FaYoutube className="mr-2" /> Subscribe
          </a>
        </div>
      </motion.div>

      {/* Channel Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
      >
        <div className="glass-card p-6 text-center">
          <h4 className="text-3xl font-bold text-secondary mb-2">80+</h4>
          <p className="text-textSecondary">Subscribers</p>
        </div>
        <div className="glass-card p-6 text-center">
          <h4 className="text-3xl font-bold text-secondary mb-2">40+</h4>
          <p className="text-textSecondary">Videos</p>
        </div>
        <div className="glass-card p-6 text-center">
          <h4 className="text-3xl font-bold text-secondary mb-2">8.6K+</h4>
          <p className="text-textSecondary">Total Views</p>
        </div>
      </motion.div>
      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card group p-4"
          >
            <div className="relative  mb-4 h-[400px]">
              {" "}
              {/* Increased height here */}
              <YouTube
                videoId={video.id}
                opts={opts}
                className="rounded-lg overflow-hidden h-full"
                containerClassName="absolute top-0 left-0 w-full h-full"
              />
            </div>
            <h4 className="text-lg font-bold text-textPrimary mb-2">
              {video.title}
            </h4>
            <p className="text-textSecondary text-sm">{video.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Music;
