import type {
  Area,
  BigDataCloudResponse,
  NominatimResult,
} from "../types/type";

const BASE_AREA_URL = "https://www.emsifa.com/api-wilayah-indonesia/api";
const apiKeyBigDataCloud = process.env.NEXT_PUBLIC_BIGDATA_CLOUD_API_KEY;

export const locationService = {
  async getAreas(type: string, parentId?: string): Promise<Area[]> {
    let url = "";
    switch (type) {
      case "province":
        url = `${BASE_AREA_URL}/provinces.json`;
        break;
      case "regency":
        url = `${BASE_AREA_URL}/regencies/${parentId}.json`;
        break;
      case "district":
        url = `${BASE_AREA_URL}/districts/${parentId}.json`;
        break;
      case "village":
        url = `${BASE_AREA_URL}/villages/${parentId}.json`;
        break;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error("Gagal mengambil data wilayah");
    return res.json() as Promise<Area[]>;
  },

  async reverseGeocode(
    lat: number,
    lng: number,
  ): Promise<BigDataCloudResponse> {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=id&key=${apiKeyBigDataCloud}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Gagal melakukan reverse geocoding");
    return res.json() as Promise<BigDataCloudResponse>;
  },

  // Search Geocode (Nama Tempat -> Koordinat)
  async searchGeocode(query: string): Promise<NominatimResult[]> {
    const url = `/api/geocode?q=${encodeURIComponent(query)}`;

    const res = await fetch(url);

    if (!res.ok) throw new Error("Gagal mencari koordinat");

    return res.json() as Promise<NominatimResult[]>;
  },
};
