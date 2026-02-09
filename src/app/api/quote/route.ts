import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const revalidate = 300;

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key tidak ditemukan" },
      { status: 500 },
    );
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const topics = [
    "Sabar",
    "Syukur",
    "Cinta Allah",
    "Ketenangan Hati",
    "Waktu",
    "Keikhlasan",
  ];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  try {
    const prompt = `Berikan satu kutipan hikmah Islami tentang ${randomTopic} yang singkat, inspiratif, dan menyejukkan hati. Bisa berupa ayat Al-Quran, Hadits, atau kata mutiara ulama. Gunakan bahasa Indonesia. Format jawaban HANYA: 'Isi kutipan - Sumber'. Jangan ada teks pembuka atau penutup lainnya.`;
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 1,
      },
    });
    const quoteText = result.response.text();
    console.log(quoteText);
    return NextResponse.json({ quote: quoteText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      {
        quote:
          "Sesungguhnya sesudah kesulitan itu ada kemudahan. - QS. Al-Insyirah: 6",
      },
      { status: 200 }, // Tetap kirim 200 dengan fallback agar UI tidak rusak
    );
  }
}
