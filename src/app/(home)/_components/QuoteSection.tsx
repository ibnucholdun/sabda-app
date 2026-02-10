"use client";

import React from "react";
import { Quote, RefreshCw } from "lucide-react";
import { useQuote } from "../../../hooks/useQuote";

const QuoteSection: React.FC = () => {
  const { quoteData, loading, fetchNewQuote } = useQuote();

  if (!quoteData) return null;

  return (
    <div className="group animate-in fade-in relative overflow-hidden rounded-4xl border border-emerald-50 bg-white p-6 shadow-sm duration-700">
      {/* Decorative Element */}
      <div className="absolute -top-2 -right-2 opacity-[0.03] transition-opacity group-hover:opacity-[0.08]">
        <Quote size={80} className="text-emerald-900" />
      </div>

      <div className="relative z-10">
        <div
          className={`transition-all duration-500 ${loading ? "opacity-40 blur-[1px]" : "blur-0 opacity-100"}`}
        >
          <p className="pr-6 text-sm leading-relaxed font-medium text-slate-700 italic">
            &quot;{quoteData.text}&quot;
          </p>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-px w-4 bg-emerald-200"></div>
              <span className="text-[10px] font-black tracking-widest text-emerald-700 uppercase">
                {quoteData.source}
              </span>
            </div>
            <button
              onClick={fetchNewQuote}
              disabled={loading}
              className={`rounded-xl p-2 text-slate-300 transition-all duration-500 hover:bg-emerald-50 hover:text-emerald-600 ${loading ? "animate-spin text-emerald-600" : "active:rotate-180"}`}
              title="Refresh Hikmah"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteSection;
