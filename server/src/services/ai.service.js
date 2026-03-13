const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

/**
 * Classifies a civic complaint using Gemini AI.
 * @param {Object} complaintData - Title, description, city, state.
 * @param {Array} images - Base64 encoded images.
 */
async function classifyComplaint(complaintData, images = []) {
    const { title, description, city, state } = complaintData;

    const prompt = `
        You are an AI civic complaint classifier for Indian municipal corporations.
        Analyze the following complaint and return a structured JSON response.

        Complaint Title: ${title}
        Complaint Description: ${description}
        Location: ${city}, ${state}

        Categories: road_pothole, road_damage, water_leakage, water_shortage, garbage_overflow, garbage_collection, electricity_outage, streetlight, sanitation_drain, sanitation_toilet, illegal_construction, noise_pollution, encroachment, stray_animals, tree_fallen, flooding, other.

        Severity Rubric:
        - critical: Life risk (road collapse, electrical hazard).
        - high: Major impact (main road pothole, major water leak).
        - medium: Moderate impact (irregular garbage, moderate pothole).
        - low: Minor impact (minor cracks, aesthetic).

        Department Logic:
        Use the city name to infer the department (e.g., BMC for Mumbai, PMC for Pune, BBMP for Bengaluru, MCD for Delhi).

        Return JSON ONLY in this format:
        {
            "category": "string",
            "severity": "low|medium|high|critical",
            "department_name": "string",
            "reasoning": "string",
            "confidence_score": number (0-1)
        }
    `;

    try {
        const imageParts = images.map(img => ({
            inlineData: {
                data: img.base64,
                mimeType: img.mimeType
            }
        }));

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from text (in case Gemini adds markdown backticks)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('Invalid AI response format');

        return JSON.parse(jsonMatch[0]);
    } catch (error) {
        console.error('Gemini Classification Error:', error);
        throw error;
    }
}

module.exports = { classifyComplaint };
