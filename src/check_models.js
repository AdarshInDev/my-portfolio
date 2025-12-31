
// WARNING: Do not hardcode API Keys here.
// Usage: node src/check_models.js YOUR_API_KEY
const args = process.argv.slice(2);
const API_KEY = args[0] || process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("❌ No API Key provided.");
    console.log("Usage: node src/check_models.js <YOUR_API_KEY>");
    process.exit(1);
}

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
