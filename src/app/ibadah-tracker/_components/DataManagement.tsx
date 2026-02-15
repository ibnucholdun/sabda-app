"use client";

import {
  AlertTriangle,
  ChevronRight,
  Database,
  Download,
  Trash2,
  Upload,
} from "lucide-react";
import React, { useRef } from "react";

const DataManagement = ({
  handleExportData,
  handleImportData,
  setIsResetModalOpen,
}: {
  handleExportData: () => void;
  handleImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsResetModalOpen: (open: boolean) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4 rounded-[2.5rem] border border-slate-200/50 bg-slate-100 p-6">
      <div className="flex items-center gap-3 px-1 text-left">
        <Database size={18} className="text-slate-500" />
        <div className="text-left">
          <h4 className="text-sm font-black text-slate-800">
            Pengelolaan Data
          </h4>
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Keamanan & Kontrol
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <button
          onClick={handleExportData}
          className="flex w-full items-center justify-between rounded-[1.75rem] border border-slate-200 bg-white p-5 text-left active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Download size={22} />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-800">
                Ekspor Riwayat
              </span>
              <span className="block text-[10px] font-medium text-slate-400">
                Simpan progres ke JSON
              </span>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-300" />
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full items-center justify-between rounded-[1.75rem] border border-slate-200 bg-white p-5 text-left active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <Upload size={22} />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-800">
                Impor Riwayat
              </span>
              <span className="block text-[10px] font-medium text-slate-400">
                Pulihkan dari cadangan
              </span>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-300" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".json"
          onChange={handleImportData}
        />
        <button
          onClick={() => setIsResetModalOpen(true)}
          className="group flex w-full items-center justify-between rounded-[1.75rem] border border-slate-200 bg-white p-5 text-left active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <Trash2 size={22} />
            </div>
            <div>
              <span className="block text-sm font-bold text-rose-800">
                Reset Seluruh Data
              </span>
              <span className="block text-[10px] font-medium text-slate-400">
                Hapus semua catatan
              </span>
            </div>
          </div>
          <AlertTriangle size={18} className="text-rose-200" />
        </button>
      </div>
    </div>
  );
};

export default DataManagement;
