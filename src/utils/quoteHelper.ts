export const parseQuote = (rawQuote: string) => {
  const parts = rawQuote.split(" - ");
  if (parts.length >= 2) {
    return {
      text: parts[0]?.replace(/['"]/g, "").trim() ?? "",
      source: parts[1]?.trim() ?? "",
    };
  }
  return {
    text: rawQuote?.replace(/['"]/g, "").trim() ?? "",
    source: "Hikmah Sabda",
  };
};
