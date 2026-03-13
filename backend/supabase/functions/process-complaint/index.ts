// backend/supabase/functions/process-complaint/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.0";

const genAI = new GoogleGenerativeAI(Deno.env.get("GEMINI_API_KEY") || "");

serve(async (req) => {
  const { title, description, image_url, jurisdiction } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Analyze this citizen complaint for a municipal corporation in India.
    Title: ${title}
    Description: ${description}
    Context: ${jurisdiction}

    Provide the following in JSON format:
    1. category: (e.g., Pothole, Waste, Water, Street Light)
    2. priority: (Low, Medium, High)
    3. suggested_authority: The specific department or contact detail likely responsible.
    4. summary: A brief 1-sentence summary for the admin.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean JSON if Gemini wraps it in markdown blocks
    const jsonStr = text.replace(/```json|```/g, "").trim();
    const classification = JSON.parse(jsonStr);

    return new Response(JSON.stringify(classification), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
