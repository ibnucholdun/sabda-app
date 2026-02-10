import React from "react";
import PrayerCard from "./_components/PrayerCard";
import MenuGrid from "./_components/MenuGrid";
import QuoteSection from "./_components/QuoteSection";
import HolydayBanner from "./_components/HolydayBanner";

const HomeView: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-500">
      <PrayerCard />
      <MenuGrid />
      <QuoteSection />
      <HolydayBanner />
    </div>
  );
};

export default HomeView;
