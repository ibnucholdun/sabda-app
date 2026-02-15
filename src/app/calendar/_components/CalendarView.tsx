"use client";

import React from "react";
import HeroCalender from "./HeroCalender";
import { AlertCircle } from "lucide-react";
import GridCalendar from "./GridCalendar";
import AgendaSection from "./AgendaSection";
import { useCalender } from "~/hooks/useCalender";

const CalendarView = () => {
  const { state, actions } = useCalender();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 pb-20 duration-500">
      <HeroCalender
        currentHijriInfo={state.currentHijriInfo}
        isBackgroundLoading={state.isBackgroundLoading}
        monthName={state.monthName}
        changeMonth={actions.changeMonth}
      />

      {state.apiError && !state.isLoading && (
        <div className="mx-2 flex items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50 p-3 text-rose-800">
          <AlertCircle size={16} />
          <p className="text-[10px] font-bold uppercase">
            Data offline sementara
          </p>
        </div>
      )}

      <GridCalendar
        isLoading={state.isLoading}
        calendarDays={state.calendarDays}
      />

      <AgendaSection
        holidaysInMonth={state.holidaysInMonth}
        monthName={state.monthName}
        isLoading={state.isLoading}
        nextHoliday={state.nextHoliday}
        calendarDays={state.calendarDays}
      />
    </div>
  );
};

export default CalendarView;
