
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to load .env manually (since we might not have dotenv installed)
function loadEnv() {
    try {
        const envPath = path.resolve(__dirname, '../.env');
        if (fs.existsSync(envPath)) {
            const envConfig = fs.readFileSync(envPath, 'utf-8');
            envConfig.split(/\r?\n/).forEach(line => {
                const match = line.match(/^([^=]+)=(.*)$/);
                if (match) {
                    const key = match[1].trim();
                     // Remove quotes if present
                    const value = match[2].trim().replace(/^['"](.*)['"]$/, '$1');
                    process.env[key] = value;
                }
            });
            console.log("✅ Loaded environment variables from .env");
        } else {
            console.warn("⚠️ No .env file found at project root.");
        }
    } catch (error) {
        console.error("Error loading .env file:", error);
    }
}

// Load env vars
loadEnv();

// Helper to get random key
function getRandomKey() {
    const envKeys = process.env.VITE_GEMINI_API_KEYS || "";
    if (!envKeys) return null;
    
    // Split by comma, trim whitespace, and filter empty strings
    const keys = envKeys.split(',').map(key => key.trim().replace(/^['"]|['"]$/g, '')).filter(key => key.length > 0);
    
    if (keys.length === 0) return null;
    
    // Pick specific key if passed as arg, else random
    const argKey = process.argv[2];
    if (argKey && !argKey.startsWith('--')) return argKey;

    return keys[Math.floor(Math.random() * keys.length)];
}

const API_KEY = getRandomKey();

if (!API_KEY) {
    console.error("❌ No API Keys found in .env (VITE_GEMINI_API_KEYS) or provided as argument.");
    console.log("Please ensure your .env file has VITE_GEMINI_API_KEYS=key1,key2...");
    process.exit(1);
}

console.log(`🔑 Using API Key ending in ...${API_KEY.slice(-4)}`);

async function listModels() {
    console.log("Fetching model list from API...");
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();
        
        if (data.models) {
            console.log("✅ Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(` - ${m.name.replace('models/', '')}`);
                }
            });
        } else {
            console.log("❌ Error listing models:", JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.error("Fetch Error:", e);
    }
}

listModels();
