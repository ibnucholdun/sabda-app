"use client";

import React, { useState } from "react";
import HeroIbadahTracker from "./HeroIbadahTracker";
import type { HistoricalData } from "~/types/type";

const IbadahTrackerView = () => {
  const [history, setHistory] = useState<HistoricalData>({});

  return (
    <div className="animate-in slide-in-from-bottom-4 space-y-6 pb-12 duration-500">
      <HeroIbadahTracker history={history} setHistory={setHistory} />
    </div>
  );
};

export default IbadahTrackerView;
