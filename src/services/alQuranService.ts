import type { Surah } from "~/types/type";
import { idTranslations } from "~/datas/data";

interface AlQuranApiResponse {
  code: number;
  data: Surah[];
}

export async function fetchAllSurahs(): Promise<Surah[]> {
  try {
    const response = await fetch("https://api.alquran.cloud/v1/surah");
    const result = (await response.json()) as AlQuranApiResponse;

    if (!response.ok) throw new Error("Gagal mengambil data surah");

    if (result.code === 200 && Array.isArray(result.data)) {
      return result.data.map((surah: Surah) => ({
        ...surah,
        englishNameTranslation:
          idTranslations[surah.number] ?? surah.englishNameTranslation,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching surahs:", error);
    return [];
  }
}
