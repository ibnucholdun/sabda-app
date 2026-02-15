import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const fetchType = searchParams.get("type");

  if (!year || !month) {
    return NextResponse.json(
      { error: "Year and month are required" },
      { status: 400 },
    );
  }

  try {
    const results: any = {};

    const hijriRes = await fetch(
      `https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`,
    );
    const hijriJson = await hijriRes.json();
    results.hijri = hijriJson.code === 200 ? hijriJson.data : null;

    if (fetchType === "full") {
      const calendarId = encodeURIComponent(
        "id.indonesian#holiday@group.v.calendar.google.com",
      );
      const apiKey = process.env.GOOGLE_API_KEY;
      const timeMin = `${year}-01-01T00:00:00Z`;
      const timeMax = `${year}-12-31T23:59:59Z`;

      const holidayRes = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
      );
      const holidayJson = await holidayRes.json();
      results.holidays = holidayJson.items ?? [];
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar data" },
      { status: 500 },
    );
  }
}
