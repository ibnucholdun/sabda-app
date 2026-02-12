export const formatSurahName = (name: string): string => {
  return name.replace(/سُورَةُ\s*/g, "").trim();
};
