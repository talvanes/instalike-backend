import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env["GEMINI_API_KEY"]);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generateGeminiLikeDescription(imageBuffer) {
  const prompt = "Generate a sensible description in plain, everyday language for the given image. And please, just give the description without any introduction.";

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };

    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Failed to generate alt-text";
  } catch(err) {
    console.error("Failed to generate alt-text: ", err.message, err);
    throw new Error("Failed to grab alt-text from Gemini.");
  }
}