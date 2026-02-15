import { useCallback, useEffect, useMemo, useState } from "react";
import { tasbihStore } from "~/lib/localforage";

export const useTasbih = () => {
  const [tasbihTitle, setTasbihTitle] = useState("Subhanallah");
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihLimit, setTasbihLimit] = useState(33);
  const [customLimit, setCustomLimit] = useState("");
  const [customDzikir, setCustomDzikir] = useState("");
  const [dzikirList, setDzikirList] = useState<string[]>([
    "Subhanallah",
    "Alhamdulillah",
    "Allahu Akbar",
  ]);
  const [isDzikirModalOpen, setIsDzikirModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const progress = useMemo(
    () => (tasbihCount / tasbihLimit) * 100,
    [tasbihCount, tasbihLimit],
  );
  const isFull = useMemo(
    () => tasbihCount === tasbihLimit,
    [tasbihCount, tasbihLimit],
  );

  const handleTasbihClick = useCallback(() => {
    setTasbihCount((prev) => {
      const nextValue = prev + 1;
      if (nextValue > tasbihLimit) {
        return 1;
      }
      return nextValue;
    });
  }, [tasbihLimit]);

  const handleTasbihReset = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setTasbihCount(0);
  }, []);

  const saveCustomDzikir = useCallback(() => {
    if (!customDzikir.trim()) return;
    const newTitle = customDzikir.trim();
    if (!dzikirList.includes(newTitle)) {
      setDzikirList((prev) => [...prev, newTitle]);
    }
    setTasbihTitle(newTitle);
    setCustomDzikir("");
    setIsDzikirModalOpen(false);
  }, [customDzikir, dzikirList]);

  const saveCustomLimit = useCallback(() => {
    const limit = parseInt(customLimit);
    if (!isNaN(limit) && limit > 0) {
      setTasbihLimit(limit);
      setCustomLimit("");
    }
  }, [customLimit]);

  useEffect(() => {
    const initData = async () => {
      try {
        const [count, title, limit, list] = await Promise.all([
          tasbihStore.getItem<number>("tasbih_count"),
          tasbihStore.getItem<string>("tasbih_title"),
          tasbihStore.getItem<number>("tasbih_limit"),
          tasbihStore.getItem<string[]>("dzikir_list"),
        ]);

        if (count !== null) setTasbihCount(Number(count));
        if (title) setTasbihTitle(title);
        if (limit) setTasbihLimit(Number(limit));
        if (list) setDzikirList(list);
      } finally {
        setIsLoading(false);
      }
    };
    void initData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const persist = async () => {
        await tasbihStore.setItem("tasbih_count", tasbihCount);
        await tasbihStore.setItem("tasbih_title", tasbihTitle);
        await tasbihStore.setItem("tasbih_limit", tasbihLimit);
        await tasbihStore.setItem("dzikir_list", dzikirList);
      };
      void persist();
    }
  }, [tasbihCount, tasbihTitle, tasbihLimit, dzikirList, isLoading]);

  return {
    state: {
      tasbihTitle,
      tasbihCount,
      tasbihLimit,
      customLimit,
      customDzikir,
      dzikirList,
      isDzikirModalOpen,
      isLoading,
      progress,
      isFull,
    },
    actions: {
      setTasbihTitle,
      setTasbihCount,
      setTasbihLimit,
      setCustomLimit,
      setCustomDzikir,
      setIsDzikirModalOpen,
      handleTasbihClick,
      handleTasbihReset,
      saveCustomDzikir,
      saveCustomLimit,
    },
  };
};
