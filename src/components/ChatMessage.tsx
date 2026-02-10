import React from "react";
import { Sparkles } from "lucide-react";
import type { Parts } from "~/types/type";

interface ChatMessagesProps {
  messages: any[];
  isChatting: boolean;
  setInput: (val: string) => void;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isChatting,
  setInput,
}) => {
  if (!isChatting) {
    return (
      <div className="animate-in fade-in space-y-4 py-10 text-center duration-500">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100/50">
          <Sparkles size={32} className="text-emerald-700" />
        </div>
        <p className="px-4 leading-relaxed font-medium text-slate-600 italic">
          &quot;Assalamu&apos;alaikum, ada yang bisa saya bantu dengan nasihat
          spiritual hari ini?&quot;
        </p>
        <div className="mt-6 grid grid-cols-2 gap-2">
          {["Dzikir pagi", "Doa tenang hati", "Adab shalat", "Kisah Nabi"].map(
            (tip) => (
              <button
                key={tip}
                onClick={() => setInput(tip)}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-3 text-[11px] font-bold tracking-tight text-slate-500 uppercase shadow-sm transition-all active:border-emerald-500 active:text-emerald-700"
              >
                {tip}
              </button>
            ),
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2`}
        >
          <div
            className={`max-w-[85%] rounded-3xl p-4 shadow-sm ${
              message.role === "user"
                ? "rounded-br-none bg-emerald-700 text-white"
                : "rounded-bl-none border border-emerald-100 bg-white text-slate-700"
            }`}
          >
            {message.parts.map((part: Parts, index: number) => {
              switch (part.type) {
                case "text":
                  return (
                    <div
                      key={`${message.id}-${index}`}
                      className="text-sm whitespace-pre-wrap"
                    >
                      {part.text}
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
