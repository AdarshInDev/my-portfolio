
const API_KEY = "AIzaSyAam5URkwtoYEkYcj5GRqjDROCwC780rQ8"; 

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
