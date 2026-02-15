import { useCallback, useEffect, useMemo, useState } from "react";
import { ISLAMIC_EVENTS, PASARAN } from "~/constant/calendar";
import type { CalendarDay } from "~/types/type";
import { formatDateKey } from "~/utils/calendarHelper";

export const useCalender = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [hijriCache, setHijriCache] = useState<Record<string, any[]>>({});
  const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);
  const [loadedYears, setLoadedYears] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [nationalHolidays, setNationalHolidays] = useState<
    Record<string, string>
  >({});
  const [apiError, setApiError] = useState<string | null>(null);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth() + 1;
  const cacheKey = `${currentYear}-${currentMonth}`;
  const currentHijriInfo = hijriCache[cacheKey]?.[0]?.hijri ?? null;

  const monthName = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(viewDate);

  const changeMonth = (offset: number) => {
    setViewDate(
      new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1),
    );
  };

  const getPasaran = useCallback((date: Date): string => {
    const oneDay = 24 * 60 * 60 * 1000;
    const refDate = new Date(1970, 0, 1);
    const diffDays = Math.floor(
      (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
        Date.UTC(
          refDate.getFullYear(),
          refDate.getMonth(),
          refDate.getDate(),
        )) /
        oneDay,
    );
    const index = (diffDays + 3) % 5;
    return PASARAN[index < 0 ? index + 5 : index] ?? "";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth() + 1;
      const key = `${year}-${month}`;

      const hasHijri = !!hijriCache[key];
      const hasHolidays = loadedYears.has(year);

      if (hasHijri && hasHolidays) return;

      const fetchType = !hasHolidays ? "full" : "hijri";

      if (hasHijri || hasHolidays) {
        setIsBackgroundLoading(true);
      } else {
        setIsLoading(true);
      }

      try {
        // Panggil Custom API Route SABDA
        const res = await fetch(
          `/api/calendar?year=${year}&month=${month}&type=${fetchType}`,
        );
        const json = await res.json();

        if (json.error) throw new Error(json.error);

        if (json.hijri) {
          setHijriCache((prev) => ({ ...prev, [key]: json.hijri }));
        }

        if (json.holidays) {
          const newHolidays: Record<string, string> = { ...nationalHolidays };
          json.holidays.forEach((item: any) => {
            const rawDate =
              item.start.date ?? item.start.dateTime?.split("T")[0];
            if (rawDate) {
              const [y, m, d] = rawDate.split("-").map(Number);
              newHolidays[formatDateKey(y, m, d)] = item.summary;
            }
          });
          setNationalHolidays(newHolidays);
          setLoadedYears((prev) => new Set(prev).add(year));
        }

        setApiError(null);
      } catch (error) {
        console.log(error);
        setApiError("Gagal sinkronisasi kalender.");
      } finally {
        setIsLoading(false);
        setIsBackgroundLoading(false);
      }
    };

    void fetchData();
  }, [viewDate, hijriCache, loadedYears]);

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentHijriData = hijriCache[cacheKey] ?? [];
    const days: (CalendarDay | null)[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const hData = currentHijriData[d - 1];
      const dateKey = formatDateKey(year, month + 1, d);
      const holidayName = nationalHolidays[dateKey];

      const hijriDayStr = hData ? hData.hijri.day : "";
      const hijriMonthNum = hData
        ? String(hData.hijri.month.number).padStart(2, "0")
        : "";
      const eventKey = `${hijriDayStr.padStart(2, "0")}-${hijriMonthNum}`;

      days.push({
        gregorianDay: d,
        date: date,
        hijriDay: hijriDayStr,
        hijriMonth: hData ? hData.hijri.month.en : "",
        hijriYear: hData ? hData.hijri.year : "",
        pasaran: getPasaran(date),
        isToday: date.getTime() === today.getTime(),
        isCurrentMonth: true,
        isHoliday: !!holidayName,
        holidayName: holidayName,
        islamicEvents: ISLAMIC_EVENTS[eventKey]
          ? [ISLAMIC_EVENTS[eventKey]]
          : [],
      });
    }

    return days;
  }, [viewDate, hijriCache, nationalHolidays, cacheKey]);

  const nextHoliday = useMemo(() => {
    const todayStr = formatDateKey(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate(),
    );
    const sortedDates = Object.keys(nationalHolidays).sort();
    const futureHolidays = sortedDates.filter((d) => d >= todayStr);

    if (futureHolidays.length > 0) {
      const dateStr = futureHolidays[0];
      if (!dateStr) return null;
      const [y, m, d] = dateStr.split("-").map(Number);

      if (y === undefined || m === undefined || d === undefined) return null;

      return {
        name: nationalHolidays[dateStr] ?? "",
        display: new Intl.DateTimeFormat("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(y, m - 1, d)),
      };
    }
    return null;
  }, [nationalHolidays]);
  const holidaysInMonth = calendarDays.filter((d) => d?.isHoliday);

  return {
    state: {
      viewDate,
      currentHijriInfo,
      isBackgroundLoading,
      isLoading,
      monthName,
      apiError,
      calendarDays,
      nextHoliday,
      holidaysInMonth,
    },
    actions: { changeMonth },
  };
};
