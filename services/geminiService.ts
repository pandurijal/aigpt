import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client safely
// The API key must be provided via environment variable API_KEY
const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getConsultationResponse = async (userQuery: string, contextTools: string): Promise<string> => {
  if (!ai) {
    return "Maaf, fitur konsultasi sedang tidak tersedia saat ini. Mohon coba lagi nanti.";
  }

  try {
    const model = 'gemini-3-flash-preview'; 
    
    const systemInstruction = `
      Anda adalah konsultan profesional untuk platform 'aigpt.id'.
      Tugas Anda adalah membantu pengguna menemukan alat chat yang tepat dari direktori kami, atau memberikan ide solusi jika alat belum tersedia.
      
      Konteks Direktori Alat Kami:
      ${contextTools}
      
      Panduan Gaya Bicara:
      - Profesional, ramah, dan membantu.
      - Gunakan Bahasa Indonesia yang baik dan benar (baku namun luwes).
      - Jangan terdengar seperti robot. Hindari kata-kata "Saya adalah AI". Gunakan "Kami" atau "Saya" sebagai konsultan.
      - Jika ada alat yang cocok di daftar, rekomendasikan alat tersebut dengan menyebutkan namanya.
      - Jika tidak ada, berikan ide konseptual bagaimana alat semacam itu bisa dibangun atau solusi alternatif.
      - Jawab dengan ringkas (maksimal 3 paragraf).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Mohon maaf, saya tidak dapat memproses permintaan Anda saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan saat menghubungi server konsultasi. Silakan coba lagi.";
  }
};