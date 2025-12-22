
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getVerseReflection(verse: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a spiritual and philosophical reflection on the following verse from the Hanuman Chalisa. Explain its relevance in modern daily life and how one can cultivate the qualities mentioned: "${verse}"`,
        config: {
          systemInstruction: "You are a wise Vedic scholar and spiritual guide. Your tone is soothing, profound, and encouraging.",
          temperature: 0.7,
        }
      });
      return response.text;
    } catch (error) {
      console.error("Error fetching reflection:", error);
      return "The wisdom of the Vedas is currently being channeled. Please try again in a moment.";
    }
  }

  async getTodayPanchang() {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `What is the significance of today's date ${new Date().toLocaleDateString()} in the Hindu Lunar Calendar (Panchang)? Include Tithi, Nakshatra, and any important festivals or spiritual advice for today. Use search if needed.`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
      return response.text;
    } catch (error) {
      return "Connecting to the celestial alignment... Please check back shortly.";
    }
  }
}

export const geminiService = new GeminiService();
