const projects = [
  {
    id: "project1",
    title: "AI-Powered Task Manager",
    description: "Smart task management app with AI suggestions and real-time collaboration.",
    longDescription: `
      A sophisticated task management solution that leverages AI to help users organize and prioritize their work more effectively.
      
      Key Features:
      - AI-powered task prioritization
      - Real-time collaboration with team members
      - Smart deadline suggestions based on workload
      - Integrated chat with GPT-4 for task clarification
      - Custom workflow automation
    `,
    image: "/project1.png",
    mockups: [
      { url: "/mockups/dashboard.png", caption: "Main Dashboard" },
      { url: "/mockups/ai-suggestions.png", caption: "AI Suggestions Interface" }
    ],
    github: "https://github.com/yourusername/ai-task-manager",
    live: "https://ai-task-manager.com",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "OpenAI API", "Tailwind CSS"],
  },
  {
    id: "project2",
    title: "E-Learning Platform",
    description: "Interactive learning platform with real-time video streaming and course management.",
    longDescription: `
      A comprehensive e-learning solution with live classes, course management, and student progress tracking.
      
      Key Features:
      - Live video streaming
      - Interactive quizzes
      - Course progress tracking
      - Student analytics dashboard
      - Payment integration
    `,
    image: "/project2.png",
    mockups: [
      { url: "/mockups/courses.png", caption: "Course Library" },
      { url: "/mockups/live-class.png", caption: "Live Class Interface" }
    ],
    github: "https://github.com/yourusername/e-learning",
    live: "https://e-learning-platform.com",
    tech: ["Next.js", "Firebase", "WebRTC", "Stripe", "TailwindCSS"],
  },
  {
    id: "project3",
    title: "Health & Fitness Tracker",
    description: "Mobile app for tracking workouts, nutrition, and health metrics.",
    longDescription: `
      A comprehensive fitness tracking solution with workout plans, nutrition tracking, and progress analytics.
      
      Key Features:
      - Custom workout plans
      - Nutrition tracking
      - Progress photos
      - Health metrics dashboard
      - Social sharing
    `,
    image: "/project3.png",
    mockups: [
      { url: "/mockups/fitness.png", caption: "Fitness Dashboard" },
      { url: "/mockups/nutrition.png", caption: "Nutrition Tracker" }
    ],
    github: "https://github.com/yourusername/fitness-tracker",
    live: "https://fitness-tracker.com",
    tech: ["Flutter", "Firebase", "Node.js", "MongoDB", "TensorFlow"],
  },
  {
    id: "project4",
    title: "Smart Home Automation",
    description: "IoT-based home automation system with mobile app control.",
    longDescription: `
      An intelligent home automation system with device control, scheduling, and energy monitoring.
      
      Key Features:
      - Device control
      - Energy monitoring
      - Automated scheduling
      - Voice commands
      - Mobile app control
    `,
    image: "/project4.png",
    mockups: [
      { url: "/mockups/home.png", caption: "Home Dashboard" },
      { url: "/mockups/devices.png", caption: "Device Control" }
    ],
    github: "https://github.com/yourusername/smart-home",
    live: "https://smart-home.com",
    tech: ["React Native", "Node.js", "MQTT", "MongoDB", "Docker"],
  },
  {
    id: "project5",
    title: "Social Media Analytics",
    description: "Analytics dashboard for social media performance tracking.",
    longDescription: `
      A comprehensive analytics solution for tracking social media performance across platforms.
      
      Key Features:
      - Multi-platform integration
      - Real-time analytics
      - Sentiment analysis
      - Competitor tracking
      - Custom reports
    `,
    image: "/project5.png",
    mockups: [
      { url: "/mockups/analytics.png", caption: "Analytics Dashboard" },
      { url: "/mockups/reports.png", caption: "Custom Reports" }
    ],
    github: "https://github.com/yourusername/social-analytics",
    live: "https://social-analytics.com",
    tech: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "Redis"],
  },
  {
    id: "project6",
    title: "AI Image Generator",
    description: "Web app for generating and editing images using AI models.",
    longDescription: `
      An AI-powered image generation and editing platform using state-of-the-art models.
      
      Key Features:
      - Text-to-image generation
      - Style transfer
      - Image editing
      - Batch processing
      - API integration
    `,
    image: "/project6.png",
    mockups: [
      { url: "/mockups/generator.png", caption: "Image Generator" },
      { url: "/mockups/editor.png", caption: "Image Editor" }
    ],
    github: "https://github.com/yourusername/ai-image-generator",
    live: "https://ai-image-generator.com",
    tech: ["React", "Python", "FastAPI", "PyTorch", "AWS"],
  }
];