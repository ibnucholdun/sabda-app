"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Surah } from "~/types/type";
import SurahList from "./SurahList";
import { fetchAllSurahs } from "~/services/alQuranService";
import JuzList from "./JuzList";
import { JUZ_MAPPING } from "~/datas/data";

const ContentList = ({
  searchQuery,
  showJuz,
}: {
  searchQuery: string;
  showJuz: boolean;
}) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);

  useEffect(() => {
    const loadSurahs = async () => {
      setIsLoadingList(true);
      const data = await fetchAllSurahs();
      setSurahs(data);
      setIsLoadingList(false);
    };
    void loadSurahs();
  }, []);

  const filteredSurahs = useMemo(() => {
    const searchTerm = searchQuery.toLowerCase();

    if (!searchTerm) return surahs;

    return surahs.filter(
      (s) =>
        s.englishName.toLowerCase().includes(searchTerm) ||
        s.englishNameTranslation.toLowerCase().includes(searchTerm) ||
        s.name.toLowerCase().includes(searchTerm) ||
        s.number.toString().includes(searchTerm),
    );
  }, [searchQuery, surahs]);

  const filteredJuzKeys = useMemo(() => {
    const searchTerm = searchQuery.toLowerCase().trim();

    if (!searchTerm) return Object.keys(JUZ_MAPPING);

    const numericOnly = searchTerm.replace(/juz|ke|[-]/g, "").trim();

    if (searchTerm === "juz" || searchTerm === "juz ") {
      return Object.keys(JUZ_MAPPING);
    }

    return Object.keys(JUZ_MAPPING).filter((key) => {
      const num = key;
      return num === numericOnly || num.includes(searchTerm);
    });
  }, [searchQuery]);

  return (
    <div className="space-y-3 pb-24">
      {isLoadingList ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-20">
          <Loader2 className="animate-spin text-emerald-600" size={32} />
          <p className="text-left text-xs font-bold tracking-widest text-slate-400 uppercase">
            Memuat Daftar...
          </p>
        </div>
      ) : !showJuz ? (
        <SurahList surahs={filteredSurahs} />
      ) : (
        <JuzList juzs={filteredJuzKeys} />
      )}
    </div>
  );
};

export default ContentList;
