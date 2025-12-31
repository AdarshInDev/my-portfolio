// Client-side service that talks to our secure Netlify Function
// No API Keys are stored here anymore!

const ENDPOINT = '/.netlify/functions/api';

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
- Role: Flutter Developer & Programmer Analyst @ Cognizant
- Education: B.Tech in CSE (CGPA 9.11/10).
- Key Skills: Flutter, Dart, Salesforce CRM (Apex, LWC), React, Firebase, Node.js, Java.
- Experience: 
  - Programmer Analyst Trainee @ Cognizant (July 2025 - Present): Salesforce & Enterprise Solutions.
  - Freelance Flutter Developer (2024 - Present): Custom mobile apps.
  - Intern @ MPS Infotecnics (2024): Web/App Development.
- Projects:
  - "Chat App": Real-time messaging with Firebase.
  - "MyGPT": AI Assistant using Gemini API.
  - "Minimal Walls": Wallpaper app with Pexels API.
- Contact: Open to commissions and collaborations.
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

// Helper to clean JSON
const parseCleanJSON = (text) => {
    try {
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);
    } catch (e) {
        console.warn("JSON Parse Error:", e, text);
        return null;
    }
};

export const getChatResponse = async (history, message) => {
    try {
        // Send request to our proxy
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'chat',
                payload: {
                    history: history, // Send full history context to backend
                    message: message,
                    systemPrompt: CHAT_SYSTEM_PROMPT
                }
            })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const rawText = data.result;

        const parsed = parseCleanJSON(rawText);
        if (parsed) return parsed;
        
        return { text: rawText, suggestion: null };

    } catch (error) {
        console.error("Chat Error:", error);
        return { text: "Connection interrupted. Realigning antennas... (Check API Config)", suggestion: null };
    }
};

export const getNavigationIntent = async (query) => {
  try {
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'navigate',
            payload: {
                query: query,
                systemPrompt: SYSTEM_PROMPT
            }
        })
    });

    const data = await response.json();
    const result = parseCleanJSON(data.result);
    return result || { path: null, label: "Signal Lost...", confidence: 0 };

  } catch (error) {
    console.error("Gemini AI Error:", error);
    return { path: null, label: "Signal Lost...", confidence: 0 };
  }
};

