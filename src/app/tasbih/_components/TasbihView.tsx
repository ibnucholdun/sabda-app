"use client";

import React, { useEffect, useState } from "react";
import TitleSelector from "./TitleSelector";
import { tasbihStore } from "~/lib/localforage";
import ButtonTasbih from "./ButtonTasbih";
import ResetButton from "./ResetButton";

const TasbihView = () => {
  const [tasbihTitle, setTasbihTitle] = useState("Subhanallah");
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihLimit, setTasbihLimit] = useState(33);

  const [isDzikirModalOpen, setIsDzikirModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const progress = (tasbihCount / tasbihLimit) * 100;
  const isFull = tasbihCount === tasbihLimit;

  const handleTasbihClick = () => {
    setTasbihCount((prev) => {
      const nextValue = prev + 1;
      if (nextValue > tasbihLimit) {
        return 1;
      }
      return nextValue;
    });
  };

  const handleTasbihReset = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setTasbihCount(0);
  };

  useEffect(() => {
    const initData = async () => {
      try {
        const savedTasbihTitle =
          await tasbihStore.getItem<string>("tasbih_title");
        if (savedTasbihTitle) setTasbihTitle(savedTasbihTitle);
      } catch (err) {
        console.error("Error loading data", err);
      } finally {
        setIsLoading(false);
      }
    };
    void initData();
  }, []);

  return (
    <div className="animate-in zoom-in-95 flex flex-col items-center justify-center space-y-8 py-8 duration-500">
      <TitleSelector
        tasbihTitle={tasbihTitle}
        setIsDzikirModalOpen={setIsDzikirModalOpen}
      />

      <ButtonTasbih
        tasbihCount={tasbihCount}
        tasbihLimit={tasbihLimit}
        progress={progress}
        isFull={isFull}
        handleTasbihClick={handleTasbihClick}
      />

      <ResetButton handleTasbihReset={handleTasbihReset} />
    </div>
  );
};

export default TasbihView;
