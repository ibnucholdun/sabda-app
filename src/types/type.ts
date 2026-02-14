export interface Area {
  id: string;
  name: string;
}

export interface BigDataCloudResponse {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  localityInfo?: {
    administrative?: {
      adminLevel: number;
      name: string;
    }[];
    informative?: {
      name: string;
    }[];
  };
}

export interface NominatimResult {
  lat: string;
  lon: string;
}

export interface BigDataCloudLocation {
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
}

export interface HijriDate {
  day: string;
  month: { en: string; ar: string };
  year: string;
  designation: { expanded: string };
}

export interface PrayerData {
  timings: PrayerTimings;
  hijri: HijriDate;
}

export interface AladhanResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimings;
    date: {
      hijri: HijriDate;
    };
  };
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  timestamp: string;
}

export interface TopicItem {
  id: string;
  title: string;
  imageUrl: string;
}

export interface Parts {
  type: any;
  text:
    | string
    | number
    | bigint
    | boolean
    | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | React.ReactPortal
        | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | null
        | undefined
      >
    | null
    | undefined;
}

export interface CachedPrayer {
  data: PrayerData;
  coords: { lat: number; lng: number };
  timestamp: string; // ISO Date string
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Verse {
  surahName: string;
  id: number;
  ar: string;
  tr: string;
  surahNumber: number;
}

export interface SurahDetail {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  verses: Verse[];
}

export interface JuzDetail {
  juzNumber: number;
  totalAyahs: number;
  verses: Verse[];
}

export interface Activity {
  id: string;
  label: string;
  category: "Wajib" | "Sunnah" | "Daily" | "Kustom";
  isPermanent?: boolean;
}

export interface ActivityStatus {
  completed: boolean;
  note?: string;
}

export interface DailyIbadahRecord {
  activities: Record<string, ActivityStatus>;
  customActivities?: Activity[];
  reflection?: string;
  aiResponse?: string;
}

export type HistoricalData = Record<string, DailyIbadahRecord>;
