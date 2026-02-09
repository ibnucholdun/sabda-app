import type { PrayerData, AladhanResponse } from "~/types/type";

export async function fetchPrayerData(
  lat: number,
  lng: number,
): Promise<PrayerData | null> {
  try {
    // Menggunakan method 20 (Kemenag RI) jika tersedia, atau 2 (ISNA) sebagai fallback
    const response = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=20`,
    );
    const result = (await response.json()) as AladhanResponse;
    if (result.code === 200) {
      return {
        timings: result.data.timings,
        hijri: result.data.date.hijri,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return null;
  }
}

export const PRAYER_NAMES_MAP: Record<string, string> = {
  Imsak: "Imsak",
  Fajr: "Subuh",
  Sunrise: "Terbit",
  Dhuhr: "Zuhur",
  Asr: "Ashar",
  Maghrib: "Maghrib",
  Isha: "Isya",
};

export const PRAYER_ORDER = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
