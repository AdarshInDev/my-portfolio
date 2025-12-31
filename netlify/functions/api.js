
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load keys from server-side environment variables
const envKeys = process.env.GEMINI_API_KEYS || process.env.VITE_GEMINI_API_KEYS || "";
const API_KEYS = envKeys.split(',').map(key => key.trim().replace(/^['"]|['"]$/g, '')).filter(key => key.length > 0);

const getRandomKey = () => {
    if (API_KEYS.length === 0) return null;
    return API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
};

const HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

export async function handler(event, context) {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: HEADERS, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers: HEADERS, body: 'Method Not Allowed' };
    }

    try {
        const key = getRandomKey();
        if (!key) {
            return {
                statusCode: 500,
                headers: HEADERS,
                body: JSON.stringify({ error: "Configuration Error: No Server-Side API Keys found." })
            };
        }

        const data = JSON.parse(event.body);
        const { action, payload } = data; // action: 'chat' | 'navigate'
        
        const genAI = new GoogleGenerativeAI(key);

        // --- ACTION: CHAT ---
        if (action === 'chat') {
            const { history, message, systemPrompt } = payload;
            
            // Reconstruct the model and chat
            // Note: serverless is stateless, so we must rebuild the chat from history each time
            // Or simpler: just send the whole history as prompt context if short, 
            // but the SDK supports passing history array.
            
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Default fast model
            
            // Inject system prompt into history if needed, or handle it via systemInstruction (newer API)
            // SDK v0.1.0+ supports systemInstruction in model config, but let's stick to standard chat history for compatibility
            
            const chat = model.startChat({
                history: history.map(h => ({
                    role: h.role === 'ai' ? 'model' : 'user', // Map local roles to API roles
                    parts: [{ text: h.text || h.message }] // Normalizing structure
                }))
            });

            // If it's the first message, we might want to prepend system prompt
            let finalMessage = message;
            if (history.length === 0 && systemPrompt) {
                 finalMessage = `${systemPrompt}\n\nUser Question: "${message}"`;
            } else {
                 finalMessage = `${message}\n(Reply in JSON)`;
            }

            const result = await chat.sendMessage(finalMessage);
            const response = await result.response;
            const text = response.text();
            
            return {
                statusCode: 200,
                headers: HEADERS,
                body: JSON.stringify({ result: text })
            };
        }

        // --- ACTION: NAVIGATION ---
        if (action === 'navigate') {
            const { query, systemPrompt } = payload;
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            
            const prompt = `${systemPrompt}\n\nUser Query: "${query}"\nResponse:`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            return {
                statusCode: 200,
                headers: HEADERS,
                body: JSON.stringify({ result: text })
            };
        }

        return {
            statusCode: 400,
            headers: HEADERS,
            body: JSON.stringify({ error: "Unknown action" })
        };

    } catch (error) {
        console.error("Function Error:", error);
        return {
            statusCode: 500,
            headers: HEADERS,
            body: JSON.stringify({ error: error.message })
        };
    }
}
