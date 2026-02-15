import { CheckCircle, TriangleAlert } from "lucide-react";
import React from "react";
import type { ToastState } from "~/types/type";

const ToasView = ({ toast }: { toast: ToastState }) => {
  return (
    <div className="animate-in slide-in-from-top-4 fixed top-24 left-1/2 z-110 w-auto max-w-[90vw] -translate-x-1/2 duration-500">
      <div
        className={`flex items-center gap-3 rounded-3xl border px-6 py-4 shadow-2xl backdrop-blur-xl ${
          toast.type === "success"
            ? "border-emerald-500/30 bg-emerald-900/90 text-white"
            : toast.type === "error"
              ? "border-rose-500/30 bg-rose-900/90 text-white"
              : "border-slate-500/30 bg-slate-900/90 text-white"
        }`}
      >
        {toast.type === "success" && (
          <CheckCircle size={18} className="text-emerald-400" />
        )}
        {toast.type === "error" && (
          <TriangleAlert size={18} className="text-rose-400" />
        )}
        <span className="text-sm font-bold tracking-tight">
          {toast.message}
        </span>
      </div>
    </div>
  );
};

export default ToasView;
