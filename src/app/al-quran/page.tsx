import TabNavigation from "./_components/TabNavigation";
import AlQuranHero from "./_components/AlQuranHero";
import ContentList from "./_components/ContentList";

const AlQuranPage = async ({ searchParams }: { searchParams: any }) => {
  const searchQuery = (await searchParams).q ?? "";
  const showJuz = "juz" in (await searchParams);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      <AlQuranHero />
      <TabNavigation />

      <ContentList searchQuery={searchQuery} showJuz={showJuz} />
    </div>
  );
};

export default AlQuranPage;
