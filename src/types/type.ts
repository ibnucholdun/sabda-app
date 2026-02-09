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
