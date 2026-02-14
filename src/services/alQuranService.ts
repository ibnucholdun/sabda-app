import type { JuzDetail, Surah, SurahDetail } from "~/types/type";
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

export async function fetchSurahDetail(
  surahNumber: number,
): Promise<SurahDetail | null> {
  try {
    const response = await fetch(
      `https://equran.id/api/v2/surat/${surahNumber}`,
    );
    const result = await response.json();

    if (!response.ok) throw new Error("Gagal mengambil detail surah");

    if (result.code === 200 && result.data) {
      const data = result.data;

      return {
        nomor: data.nomor,
        nama: data.nama,
        namaLatin: data.namaLatin,
        jumlahAyat: data.jumlahAyat,
        tempatTurun: data.tempatTurun,
        arti: data.arti,
        verses: data.ayat.map((v: any) => ({
          id: v.nomorAyat,
          ar: v.teksArab,
          tr: v.teksIndonesia,
          surahNumber: surahNumber,
          surahName: data.namaLatin,
        })),
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching surah detail:", error);
    return null;
  }
}

export async function fetchJuzDetail(
  juzNumber: number,
): Promise<JuzDetail | null> {
  try {
    const [arRes, idRes] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/quran-uthmani`),
      fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/id.indonesian`),
    ]);

    const arJson = await arRes.json();
    const idJson = await idRes.json();

    if (arJson.code === 200 && idJson.code === 200) {
      const arVerses = arJson.data.ayahs;
      const idVerses = idJson.data.ayahs;

      const formattedVerses = arVerses.map((v: any, index: number) => {
        let arabicText = v.text;

        // Logika pembersihan Bismillah (sudah benar di kodinganmu)
        if (
          v.numberInSurah === 1 &&
          v.surah.number !== 1 &&
          v.surah.number !== 9
        ) {
          const BISMILLAH_UTHMANI = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
          if (arabicText.startsWith(BISMILLAH_UTHMANI)) {
            arabicText = arabicText.replace(BISMILLAH_UTHMANI, "").trim();
          }
        }

        return {
          id: v.numberInSurah,
          ar: arabicText,
          tr: idVerses[index]?.text ?? "Terjemahan tidak tersedia",
          surahNumber: v.surah.number,
          surahName: v.surah.englishName, // Penting untuk header surah di dalam Juz
        };
      });

      return {
        juzNumber: arJson.data.number,
        totalAyahs: arJson.data.ayahs.length,
        verses: formattedVerses,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching juz detail:", error);
    return null;
  }
}
