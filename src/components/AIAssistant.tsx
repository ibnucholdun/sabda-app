import React, { useState } from "react";
import { Sparkles, Send, X, Bot } from "lucide-react";
import { getSpiritualGuidance } from "../services/geminiService";

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const result = await getSpiritualGuidance(query);
    setResponse(result);
    setLoading(false);
  };

  const closeAssistant = () => {
    setIsOpen(false);
    setQuery("");
    setResponse(null);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="mb-safe absolute right-6 bottom-24 z-40 animate-bounce cursor-pointer rounded-full bg-emerald-700 p-4 text-white shadow-2xl transition-all duration-3000 active:scale-90"
        >
          <Sparkles size={24} />
        </button>
      )}

      {/* Assistant Modal/Panel */}
      {isOpen && (
        <div className="animate-in fade-in absolute inset-0 z-60 flex flex-col bg-slate-900/40 p-4 backdrop-blur-md duration-300">
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
                className="cursor-pointer rounded-2xl bg-white/10 p-2.5 transition-colors active:bg-white/20"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="min-h-75 flex-1 space-y-4 overflow-y-auto bg-slate-50 p-6">
              {!response && !loading && (
                <div className="space-y-4 py-10 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100/50">
                    <Sparkles size={32} className="text-emerald-700" />
                  </div>
                  <p className="px-4 leading-relaxed font-medium text-slate-600 italic">
                    &quot;Assalamu&apos;alaikum, ada yang bisa saya bantu dengan
                    nasihat spiritual hari ini?&quot;
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    {[
                      "Dzikir pagi",
                      "Doa tenang hati",
                      "Adab shalat",
                      "Kisah Nabi",
                    ].map((tip) => (
                      <button
                        key={tip}
                        onClick={() => setQuery(tip)}
                        className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-3 text-[11px] font-bold tracking-tight text-slate-500 uppercase shadow-sm transition-all active:border-emerald-500 active:text-emerald-700"
                      >
                        {tip}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center space-y-4 py-12">
                  <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-emerald-800 border-t-transparent"></div>
                  <p className="text-[10px] font-black tracking-[0.2em] text-emerald-800 uppercase">
                    Mencari Hikmah...
                  </p>
                </div>
              )}

              {response && (
                <div className="animate-in slide-in-from-bottom-4 rounded-4xl border border-emerald-100 bg-white p-6 shadow-sm duration-500">
                  <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap text-slate-700">
                    {response}
                  </p>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 border-t border-slate-100 bg-white p-4 pb-8"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tanya Nurani..."
                className="flex-1 rounded-4xl border border-transparent bg-slate-100 px-5 py-3 text-sm transition-all focus:border-emerald-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="cursor-pointer rounded-4xl bg-emerald-800 p-3.5 text-white shadow-lg shadow-emerald-900/20 transition-all active:scale-90 active:bg-emerald-900 disabled:opacity-30"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
