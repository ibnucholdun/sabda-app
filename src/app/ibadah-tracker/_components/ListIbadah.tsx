import {
  CheckCircle2,
  Circle,
  Lock,
  MessageSquareText,
  Save,
  Trash2,
} from "lucide-react";
import React from "react";
import type { Activity } from "~/types/type";

const ListIbadah = ({
  allActivities,
  activitiesData,
  editingNoteId,
  toggleIbadah,
  removeCustomActivity,
  updateNote,
  setEditingNoteId,
}: {
  allActivities: Activity[];
  activitiesData: Record<string, { completed: boolean; note: string }>;
  editingNoteId: string | null;
  toggleIbadah: (id: string) => void;
  removeCustomActivity: (id: string, e: React.MouseEvent) => void;
  updateNote: (id: string, note: string) => void;
  setEditingNoteId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <div className="space-y-3">
      <p className="mb-1 px-2 text-left text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
        Daftar Amalan Spesifik
      </p>
      {allActivities.map((activity) => {
        const status = activitiesData[activity.id] ?? {
          completed: false,
          note: "",
        };
        const isEditing = editingNoteId === activity.id;
        return (
          <div
            key={activity.id}
            className={`flex flex-col gap-3 rounded-[1.75rem] border bg-white p-5 transition-all ${status.completed ? "border-emerald-200 bg-emerald-50/30" : "border-slate-100 shadow-sm"}`}
          >
            <div className="flex items-center gap-4 text-left">
              <div
                onClick={() => toggleIbadah(activity.id)}
                className="shrink-0 cursor-pointer transition-transform active:scale-90"
              >
                {status.completed ? (
                  <CheckCircle2 className="text-emerald-600" size={24} />
                ) : (
                  <Circle className="text-slate-200" size={24} />
                )}
              </div>
              <div className="flex-1" onClick={() => toggleIbadah(activity.id)}>
                <p
                  className={`text-sm font-bold ${status.completed ? "text-emerald-900" : "text-slate-700"}`}
                >
                  {activity.label}
                </p>
                <div className="mt-0.5 flex items-center gap-2">
                  <p
                    className={`flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase ${activity.isPermanent ? "text-emerald-700/70" : "text-slate-400"}`}
                  >
                    {activity.isPermanent && (
                      <Lock size={8} className="mb-0.5" />
                    )}
                    {activity.category}
                  </p>
                  {status.note && (
                    <span className="max-w-35 truncate text-[9px] font-medium text-amber-600/80 italic">
                      • {status.note}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingNoteId(isEditing ? null : activity.id);
                }}
                className={`rounded-xl p-2 active:scale-90 ${isEditing ? "bg-emerald-700 text-white" : status.note ? "bg-amber-50 text-amber-500" : "text-slate-300"}`}
              >
                <MessageSquareText size={18} />
              </button>
              {!activity.isPermanent && (
                <button
                  onClick={(e) => removeCustomActivity(activity.id, e)}
                  className="p-2 text-slate-300 active:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
            {isEditing && (
              <div className="relative mt-1">
                <textarea
                  autoFocus
                  placeholder="Catatan hari ini..."
                  value={status.note}
                  onChange={(e) => updateNote(activity.id, e.target.value)}
                  className="min-h-20 w-full resize-none rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs font-medium focus:ring-1 focus:ring-emerald-500/30"
                />
                <button
                  onClick={() => setEditingNoteId(null)}
                  className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-xl bg-emerald-800 p-2 text-white shadow-lg"
                >
                  <Save size={14} />
                  <span className="px-1 text-[10px] font-black tracking-widest uppercase">
                    Simpan
                  </span>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ListIbadah;
