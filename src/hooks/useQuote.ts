import { useState, useEffect, useRef } from "react";
import { getRandomQuote } from "../services/geminiService";
import { STATIC_HIKMAH } from "../datas/data";
import { parseQuote } from "../utils/quoteHelper";

const CACHE_KEY = "sabda_cached_quote";

export const useQuote = () => {
  const isFetched = useRef(false);
  const [loading, setLoading] = useState(false);
  const [quoteData, setQuoteData] = useState<{ text: string; source: string }>(
    () => {
      return (
        STATIC_HIKMAH[Math.floor(Math.random() * STATIC_HIKMAH.length)] ?? {
          text: "Hati yang bersyukur adalah magnet bagi keajaiban.",
          source: "Hikmah Sabda",
        }
      );
    },
  );

  const fetchNewQuote = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const rawQuote = await getRandomQuote();
      const parsed = parseQuote(rawQuote);
      setQuoteData(parsed);
      localStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
    } catch (error) {
      console.error("Failed to fetch new quote:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFetched.current) return;

    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      setQuoteData(JSON.parse(cached));
    } else {
      void fetchNewQuote(false);
    }

    isFetched.current = true;
  }, []);

  return { quoteData, loading, fetchNewQuote };
};
