import React from "react";
import { ChevronLeft, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleLocationModal } from "../store/slices/locationSlice";
import type { RootState } from "../store/store";
import { feature } from "../datas/data";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { locationName } = useSelector((state: RootState) => state.location);

  const isFeaturePage = feature.some((f) => pathname === f.path);
  const isQuranPage = pathname === "/al-quran";
  const isHomePage = pathname === "/";
  const featureName = isFeaturePage
    ? feature.find((f) => f.path === pathname)?.label
    : null;

  return (
    <header className="z-20 flex flex-none items-center justify-between rounded-b-4xl bg-emerald-800 px-5 py-4 text-white shadow-lg">
      <div className="flex items-center space-x-2">
        {!isHomePage ? (
          <button
            onClick={() => router.back()}
            className="rounded-lg bg-emerald-700/50 p-1.5 transition-colors hover:bg-emerald-600"
          >
            <ChevronLeft size={18} className="text-emerald-200" />
          </button>
        ) : (
          <div className="rounded-lg bg-emerald-700/50 p-1.5">
            <MapPin size={18} className="text-emerald-200" />
          </div>
        )}
        <div className="flex flex-col text-left">
          <span className="flex items-center gap-1 text-sm font-semibold">
            {featureName ?? (isQuranPage ? "Al-Quran" : locationName)}
            {isHomePage && (
              <button
                onClick={() => dispatch(toggleLocationModal(true))}
                className="cursor-pointer text-[10px] font-normal text-emerald-300 hover:underline"
              >
                (Ganti)
              </button>
            )}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
