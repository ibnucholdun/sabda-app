"use client";

import React, { startTransition, useRef, useState } from "react";
import AlQuranReaderToolbar from "../surah/[id]/_components/AlQuranReaderToolbar";
import AlQuranReaderHero from "../surah/[id]/_components/AlQuranReaderHero";
import AlQuranVerseViewer from "../surah/[id]/_components/AlQuranVerseViewer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatSurahName, toArabicDigits } from "~/utils/surahHelper";
import { useParams } from "next/navigation";
import type { SurahDetail } from "~/types/type";
import { AL_JUZ_AR } from "~/constant/alQuran";
import { JUZ_MAPPING } from "~/datas/data";

const AlQuranReaderTemplate = ({
  data,
  type,
}: {
  data: SurahDetail | null;
  type: "surah" | "juz";
}) => {
  const params = useParams();
  const id = params.id as string;
  const verseRefs = useRef<(HTMLDivElement | HTMLSpanElement | null)[]>([]);
  // const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "mushaf">("list");

  // TODO: implementasi navigasi ayat
  // const scrollToVerse = (index: number) => {
  //   if (index >= 0 && index < (data?.verses?.length ?? 0)) {
  //     setCurrentVerseIndex(index);

  //     startTransition(() => {
  //       const target = verseRefs.current[index];
  //       if (target) {
  //         target.scrollIntoView({ behavior: "auto", block: "start" });
  //       }
  //     });
  //   }
  // };

  const isSurah = type === "surah";

  const toolbarTitle = isSurah
    ? (data?.namaLatin ?? "Memuat Surah...")
    : `Juz ${id}`;

  const heroConfig = isSurah
    ? {
        title: formatSurahName(data?.nama ?? ""),
        subtitle: data?.arti ?? "",
        description: `${data?.tempatTurun} - ${data?.jumlahAyat} Ayat`,
      }
    : {
        title: `${AL_JUZ_AR} ${toArabicDigits(id)}`,
        subtitle: JUZ_MAPPING[Number(id)] ?? "",
        description: "",
      };

  const toggleElement = () => {
    setShowTranslation(!showTranslation);
  };

  return (
    <div className="animate-in slide-in-from-right-10 relative space-y-4 duration-300">
      <AlQuranReaderToolbar
        title={toolbarTitle}
        toggleElement={toggleElement}
        showTranslation={showTranslation}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <AlQuranReaderHero
        title={heroConfig.title}
        subtitle={heroConfig.subtitle}
        description={heroConfig.description}
      />

      <AlQuranVerseViewer
        data={data ?? null}
        type={type}
        showTranslation={showTranslation}
        // setCurrentVerseIndex={setCurrentVerseIndex}
        viewMode={viewMode}
        onRegisterVerseRef={(el, idx) => {
          if (el) verseRefs.current[idx] = el;
        }}
      />

      {/* Navigasi Ayat */}
      {/* {(data?.verses?.length ?? 0 > 0) && (
        <div className="mb-safe fixed bottom-28 left-1/2 z-40 w-auto min-w-45 -translate-x-1/2 px-4">
          <div
            className={`flex items-center justify-between rounded-full border border-white/10 bg-amber-900/90 p-1.5 text-white shadow-2xl md:backdrop-blur-xl`}
          >
            <button
              disabled={currentVerseIndex === 0}
              onClick={() => scrollToVerse(currentVerseIndex - 1)}
              className="rounded-full p-2 disabled:opacity-20"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="px-3 text-center">
              <p className="mb-0.5 text-[8px] leading-none font-black tracking-widest text-amber-300 uppercase">
                Ayat
              </p>
              <p className="text-xs font-black tracking-tighter tabular-nums">
                {toArabicDigits(currentVerseIndex + 1)} /{" "}
                {toArabicDigits(data?.verses?.length ?? 0)}
              </p>
            </div>

            <button
              disabled={currentVerseIndex === (data?.verses?.length ?? 0) - 1}
              onClick={() => scrollToVerse(currentVerseIndex + 1)}
              className="rounded-full p-2 disabled:opacity-20"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AlQuranReaderTemplate;
