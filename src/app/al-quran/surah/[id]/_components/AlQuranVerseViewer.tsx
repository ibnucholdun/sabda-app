import React, { memo, useState } from "react";
import { BISMILLAH } from "~/constant/alQuran";
import type { SurahDetail, JuzDetail } from "~/types/type";
import { toArabicDigits } from "~/utils/surahHelper";
import VersesCard from "./VersesCard";

const AlQuranVerseViewer = memo(
  ({
    data,
    type,
    // setCurrentVerseIndex,
    onRegisterVerseRef,
    showTranslation,
    viewMode,
  }: {
    data: SurahDetail | JuzDetail | null;
    type: "surah" | "juz";
    // setCurrentVerseIndex: (index: number) => void;
    onRegisterVerseRef: (
      el: HTMLDivElement | HTMLSpanElement | null,
      idx: number,
    ) => void;
    showTranslation: boolean;
    viewMode: "list" | "mushaf";
  }) => {
    const [copiedId, setCopiedId] = useState<number | null>(null);
    return (
      <div className={`pb-80 ${showTranslation ? "show-tr" : "hide-tr"}`}>
        {viewMode === "mushaf" ? (
          <div className="rounded-[2.5rem] border border-amber-100/50 bg-[#fdfcf7] p-6 shadow-sm">
            <div
              className="leading-[3.2] tracking-wide"
              dir="rtl"
              style={{ textAlign: "justify", textAlignLast: "right" }}
            >
              {data?.verses.map((verse, idx) => {
                const isNewSurah =
                  idx === 0 ||
                  (data?.verses[idx - 1] &&
                    verse.surahNumber !== data?.verses[idx - 1]?.surahNumber);

                return (
                  <React.Fragment key={`${verse.surahNumber}-${verse.id}`}>
                    {isNewSurah && (
                      <div
                        className="my-4 block flex w-full flex-col items-center select-none"
                        dir="ltr"
                      >
                        <div className="relative mb-3 inline-flex flex-col items-center justify-center rounded-xl border border-amber-100 bg-amber-50/80 px-6 py-2 shadow-sm">
                          <p className="mb-0.5 text-[8px] font-black tracking-[0.3em] text-amber-800 uppercase">
                            Surah
                          </p>
                          <h4 className="text-sm font-black tracking-tight text-slate-800">
                            {verse.surahName ??
                              (data as SurahDetail)?.namaLatin}
                          </h4>
                        </div>

                        {verse.surahNumber !== 1 && verse.surahNumber !== 9 && (
                          <p
                            className="mb-2 block text-center font-serif text-xl text-slate-800"
                            dir="rtl"
                          >
                            {BISMILLAH}
                          </p>
                        )}
                      </div>
                    )}

                    <span
                      ref={(el) => onRegisterVerseRef(el, idx)}
                      // onClick={() => setCurrentVerseIndex(idx)}
                      className={`verse-target inline cursor-pointer scroll-mt-32 rounded-lg`}
                    >
                      <span className="align-middle font-serif text-2xl text-slate-800">
                        {verse.ar}
                      </span>
                      <span className="relative mx-2 inline-flex h-8 w-8 items-center justify-center align-middle select-none">
                        <span className="absolute inset-0 rotate-45 rounded-full border-2 border-amber-300/40"></span>
                        <span className="mt-1 text-sm font-bold text-amber-900">
                          {toArabicDigits(verse.id)}
                        </span>
                      </span>
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {data?.verses.map((verse, idx) => {
              const showSurahHeader =
                idx === 0 ||
                (data?.verses[idx - 1] &&
                  verse.surahNumber !== data?.verses[idx - 1]?.surahNumber);

              return (
                <React.Fragment key={`${verse.surahNumber}-${verse.id}`}>
                  {showSurahHeader && (
                    <div className="flex flex-col items-center pt-4 pb-2">
                      {type === "juz" && (
                        <div className="mb-3 inline-flex flex-col items-center justify-center rounded-xl border border-amber-100 bg-amber-50/80 px-6 py-2 shadow-sm">
                          <p className="mb-0.5 text-[8px] font-black tracking-[0.3em] text-amber-800 uppercase">
                            Surah
                          </p>
                          <h4 className="text-sm font-black tracking-tight text-slate-800">
                            {verse.surahName ?? verse.surahNumber}
                          </h4>
                        </div>
                      )}

                      {/* Render Bismillah jika bukan Surah 1 (Al-Fatihah) dan Surah 9 (At-Tawbah) */}
                      {verse.surahNumber !== 1 && verse.surahNumber !== 9 && (
                        <div className="mb-2 w-full text-center">
                          <p
                            className="font-serif text-xl text-slate-800"
                            dir="rtl"
                          >
                            {BISMILLAH}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <VersesCard
                    ref={(el) => onRegisterVerseRef(el, idx)}
                    showTranslation={showTranslation}
                    verse={verse}
                    idx={idx}
                    setCopiedId={setCopiedId}
                    copiedId={copiedId}
                  />
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

AlQuranVerseViewer.displayName = "AlQuranVerseViewer";
export default AlQuranVerseViewer;
