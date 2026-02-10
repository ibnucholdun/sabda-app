import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key tidak ditemukan" },
      { status: 500 },
    );
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong" },
        { status: 400 },
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction: `You are 'Sabda', a compassionate and wise Islamic spiritual assistant. 
        Provide advice based on Quran and Hadith. 
        Keep answers concise, peaceful, and respectful. 
        Format output as clean text suitable for a mobile app. 
        If the user asks for a prayer (dua), provide it in Arabic text followed by transliteration and meaning.`,
        temperature: 0.7,
      },
    });

    return NextResponse.json({ answer: response.text });
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return NextResponse.json({
      answer:
        "Maaf, saya sedang mengalami kendala teknis. Silakan coba beberapa saat lagi.",
    });
  }
}
