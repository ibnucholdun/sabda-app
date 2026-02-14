export const formatSurahName = (name: string): string => {
  return name.replace(/سُورَةُ\s*/g, "").trim();
};

export const toArabicDigits = (num: number | string): string => {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num.toString().replace(/\d/g, (d) => arabicDigits[parseInt(d)] ?? d);
};

export const copyToClipboard = (
  text: string,
  id: number,
  setCopiedId: React.Dispatch<React.SetStateAction<number | null>>,
) => {
  void navigator.clipboard.writeText(text);
  setCopiedId(id);
  setTimeout(() => setCopiedId(null), 2000);
};
