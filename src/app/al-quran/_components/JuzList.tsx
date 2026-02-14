import React from "react";
import JuzCard from "./JuzCard";

const JuzList = ({ juzs }: { juzs: string[] }) => {
  if (juzs.length === 0)
    return (
      <div className="rounded-[2.5rem] border border-dashed border-slate-200 bg-white/50 py-20 text-center">
        <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
          Juz tidak ditemukan
        </p>
      </div>
    );

  return (
    <>
      <div className="animate-in fade-in space-y-3 px-1 duration-500">
        {juzs.map((numStr) => {
          const num = parseInt(numStr);
          return <JuzCard key={num} num={num} />;
        })}
      </div>
    </>
  );
};

export default JuzList;
