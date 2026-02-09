import { PRAYER_NAMES_MAP, PRAYER_ORDER } from "../services/prayerService";
import type { PrayerTimings } from "~/types/type";

export const getActivePrayerInfo = (timings: PrayerTimings, now: Date) => {
  let nextPrayerKey = "";
  let nextPrayerTime: Date | null = null;

  for (const key of PRAYER_ORDER) {
    const timeStr = timings[key as keyof typeof timings];
    if (!timeStr) continue;
    const [hours = 0, minutes = 0] = timeStr.split(":").map(Number);
    const prayerDate = new Date(now);
    prayerDate.setHours(hours, minutes, 0, 0);

    if (prayerDate > now) {
      nextPrayerKey = key;
      nextPrayerTime = prayerDate;
      break;
    }
  }

  if (!nextPrayerTime) {
    nextPrayerKey = "Fajr";
    const [hours = 0, minutes = 0] = timings.Fajr.split(":").map(Number);
    nextPrayerTime = new Date(now);
    nextPrayerTime.setDate(now.getDate() + 1);
    nextPrayerTime.setHours(hours, minutes, 0, 0);
  }

  const diffMs = nextPrayerTime.getTime() - now.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

  const countdownStr = `- ${String(diffHrs).padStart(2, "0")}:${String(diffMins).padStart(2, "0")}:${String(diffSecs).padStart(2, "0")}`;

  return {
    name: PRAYER_NAMES_MAP[nextPrayerKey],
    time: timings[nextPrayerKey as keyof typeof timings],
    countdown: countdownStr,
  };
};
