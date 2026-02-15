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
import DetailHistoryPerDay from "./DetailHistoryPerDay";

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
        <DetailHistoryPerDay
          selectedDayDetail={selectedDayDetail}
          setSelectedDayDetail={setSelectedDayDetail}
        />
      )}
    </div>
  );
};

export default IbadahTrackerView;
