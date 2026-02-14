import { BookOpen } from "lucide-react";
import React from "react";

const AlQuranReaderHero = ({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle: string;
  description: string;
}) => {
  return (
    <div className="relative overflow-hidden rounded-4xl bg-emerald-800 p-6 text-white shadow-xl">
      <div className="absolute -top-2.5 -right-2.5 opacity-10">
        <BookOpen size={140} />
      </div>
      <div className="relative z-10 space-y-2 text-center">
        <h2 className="text-2xl font-black tracking-tight">{title}</h2>
        <p className="mx-auto max-w-70 text-[11px] leading-relaxed font-medium tracking-tight text-emerald-200 italic">
          {subtitle}
        </p>
        <div className="mx-auto h-0.5 w-16 rounded-full bg-white/20"></div>
        {description && (
          <p className="text-[9px] font-black tracking-[0.2em] text-emerald-100 uppercase">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default AlQuranReaderHero;
