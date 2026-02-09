import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { fetchPrayerData } from "../services/prayerService";
import { getActivePrayerInfo } from "../utils/prayerHelper";
import type { PrayerData } from "../types/type";

export const usePrayerTracker = () => {
  const { coords } = useSelector((state: RootState) => state.location);
  const [data, setData] = useState<PrayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Timer 1 detik
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Data Jadwal Shalat
  useEffect(() => {
    const loadData = async () => {
      if (!coords) return;
      setLoading(true);
      const prayerData = await fetchPrayerData(coords.lat, coords.lng);
      if (prayerData) setData(prayerData);
      setLoading(false);
    };
    void loadData();
  }, [coords]);

  const activePrayerInfo = useMemo(() => {
    if (!data) return null;
    return getActivePrayerInfo(data.timings, currentTime);
  }, [data, currentTime]);

  return { data, loading, currentTime, activePrayerInfo };
};
