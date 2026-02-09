import React from "react";
import PrayerCard from "./_components/PrayerCard";

const HomeView: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-500">
      <PrayerCard />
    </div>
  );
};

export default HomeView;
