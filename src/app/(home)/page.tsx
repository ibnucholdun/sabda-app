import React from "react";
import PrayerCard from "./_components/PrayerCard";
import MenuGrid from "./_components/MenuGrid";
import QuoteSection from "./_components/QuoteSection";
import HolydayBanner from "./_components/HolydayBanner";
import ContentSection from "./_components/ContentSection";
import { recommendations, topics } from "~/datas/data";

const HomeView: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-500">
      <PrayerCard />
      <MenuGrid />
      <QuoteSection />
      <HolydayBanner />
      <ContentSection title="Topik" items={topics} type="scroll" />
      <ContentSection
        title="Rekomendasi"
        items={recommendations}
        type="scroll"
        isVideo
      />
    </div>
  );
};

export default HomeView;
