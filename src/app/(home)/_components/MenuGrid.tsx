"use client";

import { useRouter } from "next/navigation";
import { feature } from "../../../datas/data";

const MenuGrid: React.FC = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-4 gap-x-2 gap-y-6 rounded-[2.5rem] border border-slate-100 bg-white px-2 py-6 shadow-sm">
      {feature.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            onClick={() => router.push(item.path)}
            className="group flex cursor-pointer flex-col items-center transition-transform active:scale-90"
          >
            <div
              className={`${item.bg} ${item.color} mb-2 rounded-2xl border border-white p-4 shadow-sm`}
            >
              <Icon size={22} />
            </div>
            <span className="text-center text-[11px] leading-tight font-bold tracking-tight text-slate-600">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default MenuGrid;
