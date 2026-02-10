import React from "react";
import { ChevronRight, Play } from "lucide-react";
import { type NewsItem, type TopicItem } from "../../../types/type";
import Image from "next/image";

interface ContentSectionProps {
  title: string;
  items: (NewsItem | TopicItem)[];
  type: "list" | "scroll";
  isVideo?: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  items,
  type,
  isVideo,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h2>
        <button className="flex items-center gap-1 text-xs font-bold tracking-widest text-emerald-600 uppercase transition-all active:translate-x-1">
          Lihat Semua <ChevronRight size={14} />
        </button>
      </div>

      {type === "list" ? (
        <div className="space-y-4">
          {items.map((item) => {
            const news = item as NewsItem;
            return (
              <div
                key={news.id}
                className="flex cursor-pointer gap-4 rounded-3xl border border-transparent bg-white p-3 transition-all active:border-emerald-100"
              >
                <div className="flex flex-1 flex-col justify-center">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] font-black tracking-[0.15em] text-emerald-600 uppercase">
                      {news.category}
                    </span>
                  </div>
                  <h3 className="line-clamp-2 text-sm leading-[1.3] font-bold text-slate-800 transition-colors active:text-emerald-700">
                    {news.title}
                  </h3>
                  <p className="mt-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                    {news.timestamp}
                  </p>
                </div>
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl shadow-inner">
                  <Image
                    src={news.imageUrl}
                    alt={news.title}
                    className="h-full w-full object-cover transition-transform duration-700"
                    fill
                  />
                  <div className="absolute inset-0 bg-black/5"></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="scrollbar-hide -mx-4 flex space-x-4 overflow-x-auto px-4 pb-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="w-64 flex-shrink-0 cursor-pointer transition-transform active:scale-[0.98]"
            >
              <div className="relative mb-2 h-44 overflow-hidden rounded-[2rem] shadow-lg">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>

                {isVideo && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-black tracking-widest text-white uppercase shadow-lg">
                    <Play size={10} fill="currentColor" />
                    Video
                  </div>
                )}

                <div className="absolute right-4 bottom-4 left-4">
                  <p className="line-clamp-2 text-base leading-tight font-bold text-white">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentSection;
