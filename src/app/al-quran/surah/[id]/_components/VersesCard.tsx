import React, {
  forwardRef,
  memo,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Verse } from "~/types/type";
import { copyToClipboard, toArabicDigits } from "~/utils/surahHelper";
import { Check, Copy, Share2 } from "lucide-react";

interface VersesCardProps {
  showTranslation: boolean;
  verse: Verse;
  idx: number;
  setCopiedId: Dispatch<SetStateAction<number | null>>;
  copiedId: number | null;
}

const VersesCard = memo(
  forwardRef<HTMLDivElement, VersesCardProps>(
    ({ showTranslation, verse, idx, setCopiedId, copiedId }, ref) => {
      const shareVerse = async (
        verse: { ar: string; tr: string },
        surahName: string,
        num: number,
      ) => {
        const shareText = `[QS. ${surahName}: ${num}]\n\n${verse.ar}\n\nArtinya: "${verse.tr}"\n\nShared via Sabda App`;
        if (navigator.share) {
          try {
            await navigator.share({
              title: `Ayat Al-Quran - ${surahName}`,
              text: shareText,
            });
          } catch (err) {
            console.error("Error sharing:", err);
          }
        } else {
          copyToClipboard(shareText, -1, setCopiedId);
          alert("Link disalin ke papan klip");
        }
      };

      return (
        <div
          ref={ref}
          className={`scroll-mt-18 space-y-3 rounded-3xl border border-slate-50 bg-white p-4 shadow-sm`}
          style={{
            contentVisibility: "auto",
            containIntrinsicSize: "200px",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 pt-0.5 text-sm font-bold text-emerald-700 shadow-inner">
              {toArabicDigits(verse.id)}
            </div>
            <div className="flex gap-1">
              <button
                onClick={() =>
                  copyToClipboard(
                    `${verse.ar}${showTranslation ? "\n" + verse.tr : ""}`,
                    idx,
                    setCopiedId,
                  )
                }
                className="relative rounded-lg p-1.5 text-slate-300 transition-colors active:bg-slate-50 active:text-emerald-600"
              >
                {copiedId === idx ? (
                  <Check size={14} className="text-emerald-600" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
              <button
                onClick={() => {
                  void shareVerse(verse, verse.surahName ?? "", verse.id);
                }}
                className="rounded-lg p-1.5 text-slate-300 transition-colors active:bg-slate-50 active:text-emerald-600"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <p
              className="text-right font-serif text-2xl leading-[1.6] tracking-tight text-slate-800"
              dir="rtl"
            >
              {verse.ar}
            </p>
            {/* 
            {showTranslation && ( */}
            <div className="translation-section">
              <div className="mb-3 h-px w-full bg-slate-50"></div>
              <p className="text-left text-[12px] leading-relaxed font-medium text-slate-500">
                <span className="mr-1 font-black text-emerald-600/50">#</span>
                {verse.tr}
              </p>
            </div>
            {/* )} */}
          </div>
        </div>
      );
    },
  ),
);

VersesCard.displayName = "VersesCard";
export default VersesCard;
