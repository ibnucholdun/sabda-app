import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      maxOutputTokens: 350,
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content: `You are 'Sabda', a compassionate and wise Islamic spiritual assistant for the SABDA app. 
                    CORE RULES:
                      1. Provide advice strictly based on Quran and Hadith. 
                      2. Use Indonesian as the primary language.
                      3. Keep answers concise, peaceful, and respectful. 
                      4. TOTAL LENGTH MUST BE COMPLETE. Do not provide long winded explanations that might get cut off. 
                        Aim for a maximum of 3 short paragraphs.

                      FORMATTING FOR MOBILE:
                      - Use clean text only.
                      - If the user asks for a prayer (dua): 
                        - Provide the Arabic text on its own line.
                        - Followed by transliteration and meaning in separate lines.
                      - Always conclude with a full sentence and a brief polite closing (e.g., Wassalamu'alaikum).

                      If you feel the answer will be too long, prioritize the most essential wisdom and the core dua.`,
        },
        ...(await convertToModelMessages(messages)),
      ],
    });

    result.usage.then((usage) => {
      console.log({
        messageCount: messages.length,
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("Groq AI Error:", error);

    return new Response(
      JSON.stringify({
        error: "Maaf, 'Sabda' sedang rehat sejenak. Coba lagi nanti ya.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
