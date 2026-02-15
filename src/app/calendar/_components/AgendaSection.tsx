import { ArrowRightCircle, Info, Star, Flag } from "lucide-react";
import React from "react";

import type { CalendarDay } from "~/types/type";

interface NextHoliday {
  name: string;
  display: string;
}

const AgendaSection = ({
  holidaysInMonth,
  monthName,
  isLoading,
  nextHoliday,
  calendarDays,
}: {
  holidaysInMonth: (CalendarDay | null)[];
  monthName: string;
  isLoading: boolean;
  nextHoliday: NextHoliday | null;
  calendarDays: (CalendarDay | null)[];
}) => {
  return (
    <div className="space-y-4 px-2">
      {/* Libur Nasional */}
      <div className="space-y-3">
        <p className="text-left text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
          Hari Libur Nasional
        </p>
        {holidaysInMonth.length > 0 ? (
          <div className="space-y-2">
            {holidaysInMonth.map(
              (day, idx) =>
                day && (
                  <div
                    key={`hol-${idx}`}
                    className="animate-in fade-in flex items-center gap-4 rounded-3xl border border-rose-100 bg-rose-50/50 p-4 text-left shadow-sm duration-300"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-md shadow-rose-200">
                      <Flag size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm leading-tight font-bold text-rose-900">
                        {day.holidayName}
                      </h4>
                      <p className="mt-1 text-[10px] font-black tracking-widest text-rose-500 uppercase">
                        {day.gregorianDay} {monthName} • {day.pasaran}
                      </p>
                    </div>
                  </div>
                ),
            )}
          </div>
        ) : (
          <div className="space-y-3 rounded-4xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Tidak ada hari libur bulan ini
            </p>
            {!isLoading && nextHoliday && (
              <div className="animate-in slide-in-from-top-2 flex items-center gap-4 rounded-2xl border border-emerald-50 bg-white p-4 text-left shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ArrowRightCircle size={20} />
                </div>
                <div>
                  <p className="mb-0.5 text-[8px] font-black tracking-widest text-emerald-500 uppercase">
                    Libur Berikutnya
                  </p>
                  <h5 className="text-xs font-bold text-slate-800">
                    {nextHoliday.name}
                  </h5>
                  <p className="text-[10px] font-medium text-slate-400">
                    {nextHoliday.display}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hari Besar Islam */}
      <div className="space-y-3">
        <p className="text-left text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
          Hari Besar Islam
        </p>
        {calendarDays.filter((d) => d && d.islamicEvents.length > 0).length >
        0 ? (
          <div className="space-y-2">
            {calendarDays
              .filter((d) => d && d.islamicEvents.length > 0)
              .map(
                (day, idx) =>
                  day && (
                    <div
                      key={`isl-${idx}`}
                      className="animate-in fade-in flex items-center gap-4 rounded-3xl border border-slate-100 bg-white p-4 text-left shadow-sm duration-300"
                    >
                      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                        <span className="text-xs leading-none font-black">
                          {day.hijriDay}
                        </span>
                        <span className="mt-1 text-[7px] font-bold tracking-tighter uppercase">
                          {day.hijriMonth.slice(0, 3)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-800">
                          {day.islamicEvents[0]}
                        </h4>
                        <p className="mt-0.5 text-[10px] font-medium text-slate-400 italic">
                          {day.gregorianDay} {monthName} • {day.pasaran}
                        </p>
                      </div>
                      <Star size={14} className="text-amber-300" />
                    </div>
                  ),
              )}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Tidak ada hari besar Islam bulan ini
            </p>
          </div>
        )}
      </div>

      <div className="mx-2 flex items-start gap-4 rounded-4xl border border-emerald-100 bg-emerald-50/50 p-5 text-left">
        <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
          <Info size={18} />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black tracking-widest text-emerald-900 uppercase">
            Informasi Kalender
          </p>
          <p className="text-xs leading-relaxed font-medium text-emerald-800 italic">
            Sistem menggunakan cache lokal untuk performa instan. Hari libur
            disinkronkan setahun penuh dari Google Calendar API dan Aladhan API.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgendaSection;
