"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";

const FormCustomIbadah = ({
  addCustomActivityParent,
}: {
  addCustomActivityParent: (name: string) => void;
}) => {
  const [localName, setLocalName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localName.trim()) return;

    addCustomActivityParent(localName);
    setLocalName(""); // Reset input lokal setelah tambah
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 rounded-[1.75rem] border border-slate-100 bg-white p-4 shadow-sm"
    >
      <input
        type="text"
        placeholder="Tambah amalan kustom hari ini..."
        value={localName}
        onChange={(e) => setLocalName(e.target.value)}
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
