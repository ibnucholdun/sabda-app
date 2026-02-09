export async function getRandomQuote() {
  try {
    const response = await fetch("/api/quote", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const data = (await response.json()) as { quote: string };
    return data.quote;
  } catch (error) {
    console.error("Error fetching quote from API:", error);
    return "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya. - QS. Al-Baqarah: 286";
  }
}
