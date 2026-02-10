import React from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  handleSubmit,
  isLoading,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 border-t border-slate-100 bg-white p-4 pb-8"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tanya Sabda AI..."
        className="flex-1 rounded-4xl border border-transparent bg-slate-100 px-5 py-3 text-sm transition-all focus:border-emerald-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/50 focus:outline-none"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="cursor-pointer rounded-4xl bg-emerald-800 p-3.5 text-white shadow-lg shadow-emerald-900/20 transition-all active:scale-90 active:bg-emerald-900 disabled:opacity-30"
      >
        <Send size={20} />
      </button>
    </form>
  );
};
