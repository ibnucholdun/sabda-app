import React from "react";

const ModalResetData = ({
  setIsResetModalOpen,
  handleResetData,
}: {
  setIsResetModalOpen: (value: boolean) => void;
  handleResetData: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setIsResetModalOpen(false)}
      ></div>
      <div className="max-sm relative w-full rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-2xl">
        <h3 className="mb-3 text-left text-xl font-black text-slate-900">
          Hapus Data?
        </h3>
        <p className="mb-8 text-left text-sm text-slate-500">
          Ini akan menghapus permanen seluruh riwayat amalan Anda.
        </p>
        <button
          onClick={handleResetData}
          className="mb-3 w-full rounded-2xl bg-rose-600 py-4 text-xs font-black text-white uppercase"
        >
          Ya, Hapus
        </button>
        <button
          onClick={() => setIsResetModalOpen(false)}
          className="w-full rounded-2xl bg-slate-50 py-4 text-xs font-black text-slate-400 uppercase"
        >
          Batal
        </button>
      </div>
    </div>
  );
};

export default ModalResetData;
