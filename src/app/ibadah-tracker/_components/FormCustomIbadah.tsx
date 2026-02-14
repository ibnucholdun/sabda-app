import { Plus } from "lucide-react";
import React from "react";

const FormCustomIbadah = ({
  addCustomActivity,
  newActivityName,
  setNewActivityName,
}: {
  addCustomActivity: (e: React.FormEvent) => void;
  newActivityName: string;
  setNewActivityName: (name: string) => void;
}) => {
  return (
    <form
      onSubmit={addCustomActivity}
      className="flex gap-2 rounded-[1.75rem] border border-slate-100 bg-white p-4 shadow-sm"
    >
      <input
        type="text"
        placeholder="Tambah amalan kustom hari ini..."
        value={newActivityName}
        onChange={(e) => setNewActivityName(e.target.value)}
        className="flex-1 rounded-xl border-none bg-slate-50 px-4 py-2 text-sm font-medium focus:ring-1 focus:ring-emerald-500/50"
      />
      <button
        type="submit"
        className="rounded-xl bg-emerald-700 p-2 text-white active:scale-90"
      >
        <Plus size={20} />
      </button>
    </form>
  );
};

export default FormCustomIbadah;
