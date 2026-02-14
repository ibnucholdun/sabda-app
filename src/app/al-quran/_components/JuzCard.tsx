import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { JUZ_MAPPING } from "~/datas/data";

const JuzCard = ({ num }: { num: number }) => {
  return (
    <Link
      href={`/al-quran/juz/${num}`}
      className="group flex cursor-pointer items-center gap-4 rounded-4xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-emerald-100 active:scale-[0.98]"
    >
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
        <div className="absolute inset-0 rotate-45 rounded-2xl bg-emerald-50 transition-transform duration-500 group-hover:rotate-90"></div>
        <div className="relative z-10 flex flex-col items-center">
          <span className="mb-0.5 text-[8px] leading-none font-black text-emerald-800 uppercase">
            Juz
          </span>
          <span className="text-lg leading-none font-black text-emerald-900">
            {num}
          </span>
        </div>
      </div>

      <div className="flex-1 text-left">
        <h4 className="mb-1 text-sm font-black text-slate-800 transition-colors group-hover:text-emerald-700">
          Juz ke-{num}
        </h4>
        <div className="flex items-center gap-1.5">
          <div className="h-1 w-1 rounded-full bg-emerald-400"></div>
          <p className="pr-2 text-[11px] leading-relaxed font-medium text-slate-400 italic">
            {JUZ_MAPPING[num]}
          </p>
        </div>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-300 transition-all group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-200">
        <ChevronRight size={18} />
      </div>
    </Link>
  );
};

export default JuzCard;
