
import { GoogleGenAI, Type } from "@google/genai";
import { BookData, FileData } from "../types";

const BOOK_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    author: { type: Type.STRING },
    genre: { type: Type.STRING },
    description: { type: Type.STRING, description: "一段充满诗意、文学感、极简主义风格的书籍简介。" },
    extendedSummary: { type: Type.STRING, description: "深层次的叙事分析和美学评论。" },
    aestheticMood: { type: Type.STRING, description: "抽象的视觉氛围描述，用于页面配色参考。" },
    primaryColor: { type: Type.STRING, description: "书籍主色调，需符合现代极简设计感（如：#1A3C34）。" },
    secondaryColor: { type: Type.STRING, description: "辅助色调，通常为纸张颜色（如：#F4F1EA）。" },
    quotes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          context: { type: Type.STRING }
        },
        required: ["text", "context"]
      }
    },
    authorBio: { type: Type.STRING },
    themes: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    readingTime: { type: Type.STRING }
  },
  required: ["title", "author", "genre", "description", "extendedSummary", "aestheticMood", "primaryColor", "secondaryColor", "quotes", "authorBio", "themes", "readingTime"]
};

export const fetchBookContent = async (query?: string, files?: FileData[]): Promise<BookData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const parts: any[] = [];
    
    if (query) {
      parts.push({ text: `基于书名《${query}》，生成一个具有高端设计感、极简风格的文学网页配置。` });
    }
    
    if (files && files.length > 0) {
      parts.push({ text: "请仔细阅读分析这些文件内容（可能是书籍PDF、截图或封面）。提取准确的书名、作者、深层主题，并撰写具有文学深度的简介和评论。" });
      files.forEach(file => parts.push(file));
    }

    if (parts.length === 0) throw new Error("No input provided");

    // Use gemini-3-flash-preview for fast and efficient text/multimodal analysis
    const textResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { 
        parts: [
          ...parts,
          { text: "必须使用中文生成所有内容。确保色调提取符合文件内容的氛围。返回纯JSON格式。" }
        ] 
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: BOOK_SCHEMA,
      },
    });

    const bookData = JSON.parse(textResponse.text || '{}') as BookData;
    
    // No image generation - we focus on text and layout.
    bookData.illustrationUrl = undefined; 

    return bookData;
  } catch (error) {
    console.error("Error fetching book content:", error);
    throw error;
  }
};
