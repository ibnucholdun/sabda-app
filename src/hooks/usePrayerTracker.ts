import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { fetchPrayerData } from "../services/prayerService";
import { getActivePrayerInfo } from "../utils/prayerHelper";
import type { CachedPrayer, PrayerData } from "../types/type";

const CACHE_KEY = "sabda_prayer_cache";

export const usePrayerTracker = () => {
  const { coords } = useSelector((state: RootState) => state.location);
  const [data, setData] = useState<PrayerData | null>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed: CachedPrayer = JSON.parse(cached);
        const cachedDate = new Date(parsed.timestamp).toDateString();
        const todayDate = new Date().toDateString();

        if (cachedDate === todayDate) {
          return parsed.data;
        }
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Timer 1 detik
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (!coords) return;

      const cached = localStorage.getItem(CACHE_KEY);
      let needsFetch = true;

      if (cached) {
        const parsed: CachedPrayer = JSON.parse(cached);
        const cachedDate = new Date(parsed.timestamp).toDateString();
        const todayDate = new Date().toDateString();

        // Cek apakah koordinat berubah drastis atau tanggal sudah lewat
        const latDiff = Math.abs(parsed.coords.lat - coords.lat);
        const lngDiff = Math.abs(parsed.coords.lng - coords.lng);

        // Perubahan koordinat sangat kecil (misal di rumah yang sama) abaikan
        if (latDiff < 0.01 && lngDiff < 0.01 && cachedDate === todayDate) {
          needsFetch = false;
        }
      }

      if (needsFetch) {
        // Jangan tampilkan loading spinner jika sudah ada data lama di UI (background fetch)
        if (!data) setLoading(true);

        const prayerData = await fetchPrayerData(coords.lat, coords.lng);
        if (prayerData) {
          setData(prayerData);
          const cacheEntry: CachedPrayer = {
            data: prayerData,
            coords: coords,
            timestamp: new Date().toISOString(),
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
        }
        setLoading(false);
      } else if (loading) {
        setLoading(false);
      }
    };
    void loadData();
  }, [coords]);

  const activePrayerInfo = useMemo(() => {
    if (!data) return null;
    return getActivePrayerInfo(data.timings, currentTime);
  }, [data, currentTime]);

  return { data, loading, currentTime, activePrayerInfo };
};
