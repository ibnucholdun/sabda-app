"use client";

import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const AlQuranHero = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [text, setText] = useState(searchParams.get("q")?.toString() ?? "");
  const [query] = useDebounce(text, 300);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Array.from(params.entries())) {
      if (value === "") {
        params.delete(key);
        params.set(key, "");
      }
    }

    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }

    const queryString = params.toString().replace(/=(&|$)/g, "$1");

    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  }, [query, pathname, router]);

  useEffect(() => {
    const urlQuery = searchParams.get("q") ?? "";
    if (!urlQuery && text !== "") {
      setText("");
    }
  }, [searchParams]);

  const activeTab = searchParams.has("juz") ? "juz" : "surah";
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-7 text-white shadow-2xl">
      <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-[80px]"></div>
      <div className="relative z-10">
        <h2 className="mb-1 text-left text-2xl font-black tracking-tight">
          Al-Quranul Karim
        </h2>
        <p className="mb-4 text-left text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase">
          Membaca & Mempelajari Hikmah
        </p>
        <div className="relative">
          <Search
            className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500"
            size={16}
          />
          <input
            type="text"
            placeholder={
              activeTab === "surah"
                ? "contoh: An-Nisa atau 4"
                : "contoh: Juz 1 atau 30"
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/10 py-3 pr-4 pl-12 text-sm backdrop-blur-md transition-all placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500/50 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AlQuranHero;
