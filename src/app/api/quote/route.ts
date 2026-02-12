import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export const revalidate = 300;

export async function POST() {
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
    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      prompt: prompt,
      maxOutputTokens: 80,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("GROQ API Error:", error);
    return NextResponse.json(
      {
        quote:
          "Sesungguhnya sesudah kesulitan itu ada kemudahan. - QS. Al-Insyirah: 6",
      },
      { status: 200 },
    );
  }
}
