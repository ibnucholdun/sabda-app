"use client";
import React from "react";
import { useDispatch } from "react-redux";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Navigation,
  MapPinned,
  Loader2,
} from "lucide-react";
import { toggleLocationModal } from "../store/slices/locationSlice";
import { useLocationManager } from "../hooks/useLocationManager";

const LocationModal: React.FC = () => {
  const dispatch = useDispatch();
  const {
    step,
    setStep,
    areas,
    isLoadingAreas,
    selectedPath,
    isLocating,
    detectLocation,
    fetchAreas,
    handleAreaSelect,
    goBackStep,
  } = useLocationManager();

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center">
      <div
        className="animate-in fade-in absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => dispatch(toggleLocationModal(false))}
      ></div>
      <div className="animate-in slide-in-from-bottom-full relative flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-t-[2.5rem] bg-white shadow-2xl duration-500">
        <div className="flex flex-none items-center justify-between border-b border-slate-50 p-6">
          <div className="flex items-center gap-3">
            {step !== "menu" && (
              <button
                onClick={goBackStep}
                className="rounded-xl bg-slate-50 p-2 text-slate-400"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <div>
              <h3 className="text-lg leading-none font-black text-slate-900">
                {step === "menu"
                  ? "Ganti Lokasi"
                  : step === "province"
                    ? "Pilih Provinsi"
                    : step === "regency"
                      ? "Pilih Kota/Kab"
                      : step === "district"
                        ? "Pilih Kecamatan"
                        : "Pilih Desa/Kel"}
              </h3>
              <p className="mt-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                {step === "menu"
                  ? "Pilih metode penentuan lokasi"
                  : isLoadingAreas && step === "village"
                    ? "Menyinkronkan Koordinat..."
                    : `Langkah ${selectedPath.length + 1} dari 4`}
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(toggleLocationModal(false))}
            className="rounded-2xl bg-slate-50 p-2.5 text-slate-400 active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        <div className="scrollbar-hide flex-1 overflow-y-auto p-6">
          {step === "menu" ? (
            <div className="space-y-4">
              <button
                onClick={detectLocation}
                disabled={isLocating}
                className="group flex w-full items-center gap-4 rounded-[1.75rem] border border-emerald-100 bg-emerald-50 p-5 text-left transition-all active:scale-95"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
                  {isLocating ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <Navigation size={24} />
                  )}
                </div>
                <div>
                  <span className="block text-sm font-bold text-emerald-900">
                    Gunakan Lokasi Saat Ini
                  </span>
                  <span className="text-[10px] font-medium tracking-wider text-emerald-600 uppercase">
                    Deteksi Otomatis
                  </span>
                </div>
              </button>
              <button
                onClick={() => {
                  setStep("province");
                  void fetchAreas("province");
                }}
                className="flex w-full items-center gap-4 rounded-[1.75rem] border border-slate-100 bg-white p-5 text-left shadow-sm transition-all active:scale-95"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                  <MapPinned size={24} />
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-800">
                    Cari Lokasi Manual
                  </span>
                  <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                    Pilih wilayah berjenjang
                  </span>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {isLoadingAreas ? (
                <div className="flex flex-col items-center justify-center gap-3 py-20">
                  <Loader2
                    size={32}
                    className="animate-spin text-emerald-600"
                  />
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                    {step === "village" && selectedPath.length === 3
                      ? "Sinkronisasi Jadwal..."
                      : "Memuat Data..."}
                  </p>
                </div>
              ) : (
                areas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => handleAreaSelect(area)}
                    className="group flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 text-left transition-all hover:bg-emerald-50 active:scale-[0.98]"
                  >
                    <span className="text-sm font-bold tracking-tight text-slate-700 uppercase group-hover:text-emerald-800">
                      {area.name}
                    </span>
                    <ChevronRight
                      size={16}
                      className="text-slate-200 group-hover:text-emerald-400"
                    />
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
