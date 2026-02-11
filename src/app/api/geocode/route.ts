import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Query kosong" }, { status: 400 });
  }

  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;

    const res = await fetch(nominatimUrl, {
      headers: {
        "User-Agent": "SABDA-App/1.0",
        "Accept-Language": "id",
      },
    });

    if (!res.ok) throw new Error("Gagal fetch ke Nominatim");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
