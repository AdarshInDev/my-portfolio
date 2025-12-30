import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API (We will use a placeholder key for now, User needs to replace it)
// In a real app, this should be in an env variable like import.meta.env.VITE_GEMINI_API_KEY
// Array of available API Keys to rotate through
// Loaded from environment variable (comma separated)
const envKeys = import.meta.env.VITE_GEMINI_API_KEYS || "";
const API_KEYS = envKeys.split(',').map(key => key.trim()).filter(key => key.length > 0);

const getRandomKey = () => {
    if (API_KEYS.length === 0) {
        console.error("No API Keys found in environment variables!");
        return "";
    }
    return API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
};

// List of supported reliable models to rotate through
const MODELS = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.5-flash-lite", // Extremely fast/cheap
    // "gemini-1.5-flash", // Fallback classic
];

const getRandomModel = () => {
    return MODELS[Math.floor(Math.random() * MODELS.length)];
};

const getModel = () => {
    const key = getRandomKey();
    const modelName = getRandomModel();
    console.log(`Using Key ending in ...${key.slice(-4)} with Model: ${modelName}`);
    
    // Safety check: ensure genAI instance is fresh
    const genAI = new GoogleGenerativeAI(key);
    return genAI.getGenerativeModel({ model: modelName });
};

const SYSTEM_PROMPT = `
You are the AI interface for Adarsh Pradhan's portfolio website "AdarshInDev".
Your job is to interpret user natural language queries and map them to the correct section of the website.

Here is the Site Map:
- **Home/Mission**: Path: '/' - Keywords: home, landing, start, hello, intro
- **Projects/Discoveries**: Path: '/projects' - Keywords: work, projects, apps, code, github, portfolio, creations
- **About/Trajectory**: Path: '/about' - Keywords: history, bio, who are you, education, experience, timeline, resume
- **Skills/Arsenal**: Path: '/skills' - Keywords: tech stack, skills, react, node, tools, languages, what do you know
- **Music/Audio Logs**: Path: '/music' - Keywords: music, piano, guitar, cover, songs, hobby, audio
- **Contact/Transmission**: Path: '/contact' - Keywords: email, message, hire, reach out, contact

You should return a JSON object (NO MARKDOWN) with:
1. "path": The best matching route path.
2. "label": A short, cool label for the action (e.g. "Navigating to Mission Control").
3. "confidence": A number 0-1.

If the user asks something abstract like "Show me your best work", map to /projects.
If "Who is Adarsh?", map to /about.
If the query is irrelevant, map to null or suggest '/'.

Example valid response:
{
  "path": "/projects",
  "label": "Accessing Project Archives",
  "confidence": 0.95
}
`;


const CHAT_SYSTEM_PROMPT = `
You are the AI Assistant for Adarsh Pradhan's portfolio "AdarshInDev".
Your goal is to answer visitor questions about Adarsh based on his skills, projects, and background.

Tone: Professional, slightly futuristic/sci-fi, concise (max 2 sentences), and helpful.

Knowledge Base:
- Name: Adarsh Pradhan
- Role: Full Stack Developer (React, Node.js, Flutter)
- Tech Stack: React, Next.js, Tailwind, Node.js, MongoDB, Docker, Git.
- Experience: 3+ Years in Frontend, 2+ Years in Backend.
- Projects: Portfolio (this site), various web apps.
- Contact: Open to work/freelance.
- Routes: /projects, /about, /skills, /contact, /music

IMPORTANT: You must return a JSON object (NO MARKDOWN) with this structure:
{
  "text": "Your text answer here...",
  "suggestion": {
      "label": "View Projects",
      "path": "/projects" 
  }
}
If no relevant page logic applies, set "suggestion" to null.
`;

export const getChatResponse = async (history, message) => {
    try {
        if (API_KEYS.length === 0) return { text: "System Offline (No Keys).", suggestion: null };

        const model = getModel();
        const chat = model.startChat({
            history: history, 
        });

        // Send system instruction as first context if history is empty
        let prompt = message;
        if (history.length === 0) {
            prompt = `${CHAT_SYSTEM_PROMPT}\n\nVisitor Question: "${message}"`;
        } else {
             // Re-inject structure reminder on subsequent turns to prevent drift
             prompt = `${message}\n(Remember to reply in JSON format with 'text' and 'suggestion')`;
        }

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const rawText = response.text();
        
        try {
            // Clean markdown if present
            const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (e) {
            console.warn("AI failed to return JSON, falling back to text", rawText);
            return { text: rawText, suggestion: null };
        }

    } catch (error) {
        console.error("Chat Error:", error);
        return { text: "Connection interrupted. Realigning antennas...", suggestion: null };
    }
};

export const getNavigationIntent = async (query) => {
  try {
    // If no keys, mock a response for demo purposes
    if (API_KEYS.length === 0) {
        console.warn("Gemini API Keys missing. Using mock response.");
        return mockResponse(query);
    }

    const model = getModel();
    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\nUser Query: "${query}"\nResponse:`);
    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown formatting
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);

  } catch (error) {
    console.error("Gemini AI Error:", error);
    return { path: null, label: "Signal Lost...", confidence: 0 };
  }
};

const mockResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('pro') || q.includes('work') || q.includes('app')) return { path: '/projects', label: 'Accessing Project Archives', confidence: 0.9 };
    if (q.includes('about') || q.includes('who') || q.includes('bio')) return { path: '/about', label: 'Retrieving Pilot Data', confidence: 0.9 };
    if (q.includes('contact') || q.includes('email') || q.includes('hire')) return { path: '/contact', label: 'Opening Transmission Channel', confidence: 0.9 };
    if (q.includes('music') || q.includes('song')) return { path: '/music', label: 'Loading Audio Logs', confidence: 0.9 };
    return { path: '/', label: 'Returning to Base', confidence: 0.8 };
}
