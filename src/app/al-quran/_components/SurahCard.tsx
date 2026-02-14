import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import type { Surah } from "~/types/type";
import { formatSurahName } from "~/utils/surahHelper";

const SurahCard = ({ surah }: { surah: Surah }) => {
  return (
    <Link
      href={`/al-quran/surah/${surah.number}`}
      key={surah.number}
      className="flex cursor-pointer items-center gap-4 rounded-[1.75rem] border border-slate-100 bg-white p-4 shadow-sm transition-all active:scale-[0.98] active:border-emerald-100"
    >
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
        <div className="absolute inset-0 rotate-45 rounded-2xl bg-emerald-50 transition-all duration-500"></div>
        <span className="relative z-10 text-sm font-black text-emerald-800 transition-colors">
          {surah.number}
        </span>
      </div>

      <div className="flex-1 text-left">
        <h3 className="text-sm font-bold text-slate-800 transition-colors active:text-emerald-700">
          {surah.englishName}
        </h3>
        <div className="mt-0.5 flex flex-col gap-0.5">
          <p className="text-[11px] font-medium tracking-tight text-emerald-600/90 italic">
            {surah.englishNameTranslation}
          </p>
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            {surah.revelationType === "Meccan" ? "Makkiyah" : "Madaniyah"} -{" "}
            {surah.numberOfAyahs} Ayat
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 text-right">
        <span
          className="font-serif text-xl font-bold text-emerald-700"
          dir="rtl"
        >
          {formatSurahName(surah.name)}
        </span>
        <ArrowRight size={14} className="text-slate-300" />
      </div>
    </Link>
  );
};

export default SurahCard;
