export const submitFeedback = async (data) => {
    const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;
    
    if (!SHEET_URL) {
        console.error("Configuration Error: Google Sheet URL not found.");
        return { success: false, error: "Configuration Missing" };
    }

    try {
        // We use 'no-cors' mode because Google Apps Script responses often trigger CORS issues
        // even if successful. This means we won't get a readable JSON response,
        // but the data WILL be written to the sheet.
        await fetch(SHEET_URL, {
            method: 'POST',
            mode: 'no-cors', 
            headers: {
                // sending text/plain avoids CORS preflight OPTIONS request
                'Content-Type': 'text/plain', 
            },
            body: JSON.stringify(data)
        });

        // Since we can't read the response in no-cors, we assume success if no network error occurred.
        return { success: true };

    } catch (error) {
        console.error("Feedback Submission Error:", error);
        return { success: false, error: "Transmission Failed" };
    }
};
