"use client";

import React, { useEffect, useMemo, useState } from "react";
import HeroIbadahTracker from "./HeroIbadahTracker";
import type { Activity, DayDetail, HistoricalData } from "~/types/type";
import ListIbadahView from "./ListIbadahView";
import { getDateKey } from "~/utils/ibadahTrackerHelper";
import { permanentActivities } from "~/datas/data";
import localforage from "~/lib/localforage";
import TrackerSkeleton from "./TrackerSkeleton";
import MuhasabahSection from "./MuhasabahSection";
import { useCompletion } from "@ai-sdk/react";
import HistoryProgress from "./HistoryProgress";

const IbadahTrackerView = () => {
  const [history, setHistory] = useState<HistoricalData>({});
  const [newActivityName, setNewActivityName] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDayDetail, setSelectedDayDetail] = useState<DayDetail | null>(
    null,
  );

  const today = new Date();
  const dayName = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(
    today,
  );
  const dateNum = today.getDate();
  const monthName = new Intl.DateTimeFormat("id-ID", { month: "short" }).format(
    today,
  );

  const todayKey = getDateKey(today);

  const todayRecord = history[todayKey] ?? {
    activities: {},
    customActivities: [],
  };
  const allActivities = [
    ...permanentActivities,
    ...(todayRecord.customActivities ?? []),
  ];
  const activitiesData = todayRecord.activities || {};

  const completedCount = allActivities.filter(
    (a) => activitiesData[a.id]?.completed,
  ).length;

  const progress =
    allActivities.length > 0
      ? (completedCount / allActivities.length) * 100
      : 0;

  const addCustomActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivityName.trim()) return;

    const newAct: Activity = {
      id: Date.now().toString(),
      label: newActivityName,
      category: "Kustom",
    };

    setHistory((prev) => {
      const dayData = prev[todayKey] ?? {
        activities: {},
        customActivities: [],
      };
      const currentCustoms = dayData.customActivities ?? [];
      return {
        ...prev,
        [todayKey]: {
          ...dayData,
          customActivities: [...currentCustoms, newAct],
        },
      };
    });
    setNewActivityName("");
  };

  const toggleIbadah = (id: string) => {
    setHistory((prev) => {
      const dayData = prev[todayKey] ?? {
        activities: {},
        customActivities: [],
      };
      const activities = dayData.activities || {};
      const current = activities[id] ?? { completed: false, note: "" };
      return {
        ...prev,
        [todayKey]: {
          ...dayData,
          activities: {
            ...activities,
            [id]: { ...current, completed: !current.completed },
          },
        },
      };
    });
  };

  const removeCustomActivity = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory((prev) => {
      const dayData = prev[todayKey] ?? {
        activities: {},
        customActivities: [],
      };
      const currentCustoms = dayData.customActivities ?? [];
      const activities = { ...dayData.activities };
      delete activities[id];

      return {
        ...prev,
        [todayKey]: {
          ...dayData,
          customActivities: currentCustoms.filter((a) => a.id !== id),
          activities,
        },
      };
    });
  };

  const updateNote = (id: string, note: string) => {
    setHistory((prev) => {
      const dayData = prev[todayKey] ?? {
        activities: {},
        customActivities: [],
      };
      const activities = dayData.activities || {};
      const current = activities[id] ?? { completed: false, note: "" };
      return {
        ...prev,
        [todayKey]: {
          ...dayData,
          activities: {
            ...activities,
            [id]: { ...current, note },
          },
        },
      };
    });
  };

  const { complete, isLoading: isGeneratingAI } = useCompletion({
    api: "/api/muhasabah",
    streamProtocol: "text",
    onFinish: (_prompt, result) => {
      setHistory((prev) => {
        const dayData = prev[todayKey] ?? {
          activities: {},
          customActivities: [],
        };

        return {
          ...prev,
          [todayKey]: {
            ...dayData,
            aiResponse: result,
          },
        };
      });
    },
  });

  const handleGetAIReflectionRespon = async () => {
    const currentReflection = history[todayKey]?.reflection ?? "";

    try {
      await complete(currentReflection);
    } catch (err) {
      console.error("Grok Error:", err);
    }
  };

  const monthData = useMemo(() => {
    if (isLoading) return [];
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const dayNum = i + 1;
      const dateKey = getDateKey(new Date(year, month, dayNum));
      const dayRecord = history[dateKey] ?? {
        activities: {},
        customActivities: [],
      };

      const dayActivities = [
        ...permanentActivities,
        ...(dayRecord.customActivities ?? []),
      ];
      const activitiesStatus = dayRecord.activities ?? {};

      const completedCount = dayActivities.filter(
        (a) => activitiesStatus[a.id]?.completed,
      ).length;
      const percentage =
        dayActivities.length > 0
          ? Math.round((completedCount / dayActivities.length) * 100)
          : 0;

      return {
        day: dayNum,
        value: percentage,
        isToday: dateKey === todayKey,
        reflection: dayRecord.reflection,
        aiResponse: dayRecord.aiResponse,
        rawActivities: dayActivities.map((a) => ({
          label: a.label,
          completed: !!activitiesStatus[a.id]?.completed,
          category: a.category,
          note: activitiesStatus[a.id]?.note,
        })),
      };
    });
  }, [viewDate, history, isLoading]);

  const handleDayClick = (data: any) => {
    console.log("Data yang diterima:", data);
    const payload = data.activePayload ? data.activePayload[0].payload : data;
    if (!payload) return;
    setSelectedDayDetail({
      day: payload.day,
      month: viewDate.getMonth(),
      year: viewDate.getFullYear(),
      percentage: payload.value,
      activities: payload.rawActivities,
      reflection: payload.reflection,
      aiResponse: payload.aiResponse,
    });
  };

  useEffect(() => {
    const initData = async () => {
      try {
        const savedHistory =
          await localforage.getItem<HistoricalData>("ibadah_history");
        if (savedHistory) setHistory(savedHistory);
      } catch (err) {
        console.error("Error loading data", err);
      } finally {
        setIsLoading(false);
      }
    };
    void initData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      void localforage.setItem("ibadah_history", history);
    }
  }, [history, isLoading]);

  if (isLoading) return <TrackerSkeleton />;

  return (
    <div className="animate-in slide-in-from-bottom-4 space-y-6 pb-12 duration-500">
      <HeroIbadahTracker
        dayName={dayName}
        dateNum={dateNum}
        monthName={monthName}
        progress={progress}
        completedCount={completedCount}
        allActivities={allActivities}
      />
      <ListIbadahView
        allActivities={allActivities}
        activitiesData={activitiesData}
        addCustomActivity={addCustomActivity}
        newActivityName={newActivityName}
        setNewActivityName={setNewActivityName}
        editingNoteId={editingNoteId}
        toggleIbadah={toggleIbadah}
        removeCustomActivity={removeCustomActivity}
        updateNote={updateNote}
        setEditingNoteId={setEditingNoteId}
      />

      <MuhasabahSection
        todayRecord={todayRecord}
        todayKey={todayKey}
        setHistory={setHistory}
        handleGetAIReflectionRespon={handleGetAIReflectionRespon}
        isGeneratingAI={isGeneratingAI}
      />

      <HistoryProgress
        setViewDate={setViewDate}
        viewMonthName={`${viewDate.toLocaleString("id-ID", { month: "short" })} ${viewDate.getFullYear()}`}
        monthData={monthData}
        handleDayClick={handleDayClick}
      />

      {selectedDayDetail && (
        <>
          <div className="fixed inset-0 z-120 flex items-end justify-center px-4 pb-6">
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setSelectedDayDetail(null)}
            ></div>
            {/* <div className="relative bg-white w-full max-w-md h-[80vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden text-left">
              <div className="flex-none h-1.5 w-12 bg-slate-200 rounded-full mx-auto my-4"></div>
              <div className="px-8 pb-4 flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">
                    Arsip Riwayat
                  </p>
                  <h5 className="font-black text-slate-900 text-2xl leading-tight">
                    {selectedDayDetail.day}{" "}
                    {new Intl.DateTimeFormat("id-ID", {
                      month: "long",
                      year: "numeric",
                    }).format(
                      new Date(selectedDayDetail.year, selectedDayDetail.month),
                    )}
                  </h5>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${selectedDayDetail.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-black text-emerald-700">
                      {selectedDayDetail.percentage}%
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDayDetail(null)}
                  className="p-3 bg-slate-50 text-slate-400 rounded-2xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-8 space-y-6 pb-24 scrollbar-hide">
                {selectedDayDetail.reflection && (
                  <div className="bg-indigo-50/70 p-5 rounded-[2rem] border border-indigo-100">
                    <p className="text-[10px] font-black text-indigo-600 uppercase mb-3">
                      Refleksi Diri
                    </p>
                    <p className="text-sm font-medium text-slate-700 italic">
                      "{selectedDayDetail.reflection}"
                    </p>
                  </div>
                )}

                {selectedDayDetail.aiResponse && (
                  <div className="bg-white p-5 rounded-[2rem] border-l-4 border-l-rose-400 border border-slate-100 shadow-sm text-left">
                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">
                      Hikmah Nurani
                    </p>
                    <p className="text-sm font-medium text-slate-700 italic">
                      "{selectedDayDetail.aiResponse}"
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                    Amalan Terdaftar
                  </p>
                  {selectedDayDetail.activities.map((act, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-4 p-5 rounded-[2rem] border ${act.completed ? "bg-emerald-50/30 border-emerald-100" : "bg-slate-50 border-slate-100 opacity-60"}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center ${act.completed ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-400"}`}
                      >
                        {act.completed ? (
                          <CheckCircle2 size={20} />
                        ) : (
                          <Circle size={20} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-bold ${act.completed ? "text-slate-800" : "text-slate-400 line-through"}`}
                        >
                          {act.label}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 text-slate-400">
                            {act.category === "Wajib" && <Lock size={8} />}{" "}
                            {act.category}
                          </p>
                          {act.note && (
                            <span className="text-[9px] font-medium text-amber-600 italic">
                              • {act.note}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-white">
                <button
                  onClick={() => setSelectedDayDetail(null)}
                  className="w-full py-5 bg-emerald-800 text-white rounded-2xl font-black text-xs uppercase shadow-xl active:scale-95 transition-all"
                >
                  Tutup Riwayat
                </button>
              </div>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default IbadahTrackerView;
