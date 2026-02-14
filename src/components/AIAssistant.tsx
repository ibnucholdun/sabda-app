import React, { useState } from "react";
import { Sparkles, X, Bot } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessage";

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, stop } = useChat();

  const closeAssistant = () => {
    setIsOpen(false);
    setIsChatting(false);
    void stop();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void sendMessage({ text: input });
    setInput("");
    setIsChatting(true);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="mb-safe absolute right-6 bottom-24 z-40 animate-bounce cursor-pointer rounded-full bg-emerald-700 p-4 text-white shadow-2xl transition-all active:scale-90"
        >
          <Sparkles size={24} />
        </button>
      )}

      {isOpen && (
        <div className="animate-in fade-in absolute inset-0 z-60 flex flex-col bg-slate-900/40 p-4 backdrop-blur-md">
          <div className="mt-auto flex max-h-[85vh] flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between bg-emerald-800 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-2.5">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Sabda AI</h3>
                  <p className="text-[10px] font-black tracking-widest text-emerald-200 uppercase">
                    Islamic Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={closeAssistant}
                className="cursor-pointer rounded-2xl bg-white/10 p-2.5"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="min-h-75 flex-1 overflow-y-auto bg-slate-50 p-6">
              <ChatMessages
                messages={messages}
                isChatting={isChatting}
                setInput={setInput}
              />
            </div>

            {/* Input Area */}
            <ChatInput
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isLoading={status !== "ready"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
