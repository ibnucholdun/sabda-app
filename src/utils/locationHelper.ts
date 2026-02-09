import type { BigDataCloudResponse } from "../types/type";

export const formatLocationName = (data: BigDataCloudResponse): string => {
  const admin = data.localityInfo?.administrative ?? [];

  // 1. Ambil Kecamatan
  // Cari di admin level 6, jika tidak ada pakai data.locality
  const kecamatan: string =
    admin.find(
      (item: { adminLevel: number; name: string }) => item.adminLevel === 6,
    )?.name ??
    data.locality ??
    "";

  // 2. Ambil Kabupaten/Kota
  // Cari di admin level 5
  const kabupaten: string =
    admin.find(
      (item: { adminLevel: number; name: string }) => item.adminLevel === 5,
    )?.name ??
    admin.find(
      (item: { adminLevel: number; name: string }) => item.adminLevel === 4,
    )?.name ??
    "";

  // Bersihkan kata-kata tambahan agar ringkas di UI
  const cleanKecamatan: string = kecamatan.replace(/Kecamatan /gi, "");
  const cleanKabupaten: string = kabupaten.replace(/Kabupaten |Kota /gi, "");

  if (!cleanKecamatan && !cleanKabupaten) return "Lokasi tidak diketahui";

  return `${cleanKecamatan}${cleanKabupaten ? ", " + cleanKabupaten : ""}`;
};
