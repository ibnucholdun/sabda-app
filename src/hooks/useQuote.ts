import { useState, useEffect, useRef } from "react";
import { useCompletion } from "@ai-sdk/react";
import { STATIC_HIKMAH } from "../datas/data";
import { parseQuote } from "../utils/quoteHelper";

const CACHE_KEY = "sabda_cached_quote";

export const useQuote = () => {
  const isFetched = useRef(false);
  const [quoteData, setQuoteData] = useState<{ text: string; source: string }>(
    () => {
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached)
          return JSON.parse(cached) as { text: string; source: string };
      }
      return (
        STATIC_HIKMAH[Math.floor(Math.random() * STATIC_HIKMAH.length)] ?? {
          text: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.",
          source: "QS. Al-Baqarah: 286",
        }
      );
    },
  );

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/quote",
    streamProtocol: "text",
    onFinish: (prompt, result) => {
      const parsed = parseQuote(result);
      setQuoteData(parsed);
      localStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
    },
  });

  const fetchNewQuote = async () => {
    await complete("");
  };

  useEffect(() => {
    if (isFetched.current) return;

    isFetched.current = true;
  }, []);

  const displayQuote =
    isLoading && completion ? parseQuote(completion) : quoteData;

  return {
    quoteData: displayQuote,
    loading: isLoading,
    fetchNewQuote,
  };
};
