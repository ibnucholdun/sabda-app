import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export const revalidate = 300;

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const userMessage = prompt?.trim() ?? "Hari ini saya belajar bersyukur.";

  try {
    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      prompt: `Seseorang menulis refleksi ibadah: "${userMessage}". Berikan respon singkat (maks 30 kata) Islami yang menyentuh hati.`,
      maxOutputTokens: 120,
      system:
        "Anda adalah SabdaAI, asisten spiritual yang penuh empati. Berikan kata-kata penguatan yang bersumber dari nilai-nilai Islam. Gunakan bahasa Indonesia yang sangat lembut, personal, dan menenangkan.",
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("GROQ API Error:", error);
    return NextResponse.json(
      {
        muhasabah:
          "Maa syaa Allah, semoga setiap niat baikmu dicatat sebagai pahala yang berlipat ganda oleh-Nya.",
      },
      { status: 200 },
    );
  }
}
