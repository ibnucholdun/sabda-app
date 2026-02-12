import React from "react";
import type { Surah } from "~/types/type";
import SurahCard from "./SurahCard";

const SurahList = ({ surahs }: { surahs: Surah[] }) => {
  if (surahs.length === 0)
    return (
      <div className="rounded-[2.5rem] border border-dashed border-slate-200 bg-white/50 py-20 text-center">
        <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
          Surah tidak ditemukan
        </p>
      </div>
    );

  return (
    <>
      {surahs.map((surah) => (
        <SurahCard key={surah.number} surah={surah} />
      ))}
    </>
  );
};

export default SurahList;
