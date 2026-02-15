import { useState, useEffect, useMemo, useCallback } from "react";
import { getDateKey } from "~/utils/ibadahTrackerHelper";
import { permanentActivities } from "~/datas/data";
import type {
  HistoricalData,
  DayDetail,
  ToastState,
  Activity,
} from "~/types/type";
import { useCompletion } from "@ai-sdk/react";
import localforage from "~/lib/localforage";

export const useIbadahTracker = () => {
  const [history, setHistory] = useState<HistoricalData>({});
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDayDetail, setSelectedDayDetail] = useState<DayDetail | null>(
    null,
  );
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "success",
    visible: false,
  });

  const today = useMemo(() => new Date(), []);
  const todayKey = useMemo(() => getDateKey(today), [today]);
  const dayName = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(
    today,
  );
  const dateNum = today.getDate();
  const monthName = new Intl.DateTimeFormat("id-ID", { month: "short" }).format(
    today,
  );

  const todayRecord = history[todayKey] ?? {
    activities: {},
    customActivities: [],
  };

  const allActivities = useMemo(
    () => [...permanentActivities, ...(todayRecord.customActivities ?? [])],
    [todayRecord.customActivities],
  );

  const activitiesData = todayRecord.activities || {};

  const stats = useMemo(() => {
    const completedCount = allActivities.filter(
      (a) => activitiesData[a.id]?.completed,
    ).length;
    const progress =
      allActivities.length > 0
        ? (completedCount / allActivities.length) * 100
        : 0;
    return { completedCount, progress };
  }, [allActivities, activitiesData]);

  const completedCount = stats.completedCount;
  const progress = stats.progress;

  const addCustomActivity = useCallback(
    (name: string) => {
      if (!name.trim()) return;

      const newAct: Activity = {
        id: Date.now().toString(),
        label: name,
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
    },
    [todayKey],
  );

  const toggleIbadah = useCallback(
    (id: string) => {
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
    },
    [todayKey],
  );

  const removeCustomActivity = useCallback(
    (id: string, e: React.MouseEvent) => {
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
    },
    [todayKey],
  );

  const updateNote = useCallback(
    (id: string, note: string) => {
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
    },
    [todayKey],
  );

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

  const handleDayClick = useCallback(
    (data: any) => {
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
    },
    [viewDate],
  );

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      setToast({ message, type, visible: true });
      setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 3000);
    },
    [],
  );

  const handleExportData = useCallback(async () => {
    try {
      const fullHistory = await localforage.getItem("ibadah_history");
      const backupData = {
        app: "Sabda",
        date: new Date().toISOString(),
        data: fullHistory,
      };
      const blob = new Blob([JSON.stringify(backupData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sabda_backup_${getDateKey(new Date())}.json`;
      link.click();
      showToast("Data berhasil diekspor!");
    } catch (e) {
      console.log(e);
      showToast("Gagal ekspor", "error");
    }
  }, [showToast]);

  const handleImportData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const content = event.target?.result as string;
          const backup = JSON.parse(content);
          if (backup.app !== "Sabda") throw new Error();
          await localforage.setItem("ibadah_history", backup.data);
          setHistory(backup.data);
          showToast("Data dipulihkan!");
        } catch (err) {
          console.log(err);
          showToast("Gagal impor", "error");
        }
      };
      reader.readAsText(file);
    },
    [showToast],
  );

  const handleResetData = useCallback(async () => {
    setIsResetModalOpen(false);
    await localforage.removeItem("ibadah_history");
    setHistory({});
    showToast("Data direset", "info");
  }, [showToast]);

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

  return {
    state: {
      history,
      isLoading,
      viewDate,
      selectedDayDetail,
      isResetModalOpen,
      editingNoteId,
      toast,
      todayRecord,
      allActivities,
      activitiesData,
      progress,
      todayKey,
      dayName,
      dateNum,
      monthName,
      completedCount,
      isGeneratingAI,
      monthData,
    },
    actions: {
      setHistory,
      setViewDate,
      setSelectedDayDetail,
      setIsResetModalOpen,
      setEditingNoteId,
      toggleIbadah,
      addCustomActivity,
      handleExportData,
      handleImportData,
      showToast,
      handleResetData,
      handleGetAIReflectionRespon,
      handleDayClick,
      removeCustomActivity,
      updateNote,
    },
  };
};
