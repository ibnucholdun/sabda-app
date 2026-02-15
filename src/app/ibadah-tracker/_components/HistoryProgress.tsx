import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  MousePointerClick,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import React, { useEffect, useRef } from "react";

const CustomLabel = (props: any) => {
  const { x, y, width, value, isToday } = props;
  if (value === 0) return null;
  return (
    <text
      x={x + width / 2}
      y={y - 8}
      fill={isToday ? "#059669" : "#94a3b8"}
      textAnchor="middle"
      className="text-[7px] font-black"
    >
      {value}%
    </text>
  );
};

const HistoryProgress = ({
  setViewDate,
  viewMonthName,
  monthData,
  handleDayClick,
}: {
  setViewDate: React.Dispatch<React.SetStateAction<Date>>;
  viewMonthName: string;
  monthData: any[];
  handleDayClick: (data: any) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [monthData]);

  return (
    <div className="relative space-y-6 overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-6 pb-8 shadow-sm">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-emerald-600" />
          <h4 className="text-sm font-black text-slate-800">Riwayat Progres</h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setViewDate(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
              )
            }
            className="p-1.5 text-slate-400"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[9px] font-black tracking-widest text-slate-800 uppercase">
            {viewMonthName}
          </span>
          <button
            onClick={() =>
              setViewDate(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
              )
            }
            className="p-1.5 text-slate-400"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide h-64 w-full overflow-x-auto pt-4"
      >
        <div
          style={{
            width: `${monthData.length * 35}px`,
            minWidth: "100%",
            height: "100%",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthData}
              margin={{ top: 25, right: 10, left: -25, bottom: 20 }}
            >
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: "900", fill: "#94a3b8" }}
                dy={10}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 8, fontWeight: "900", fill: "#e2e8f0" }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={20}>
                <LabelList content={<CustomLabel />} />
                {monthData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    cursor={"pointer"}
                    onClick={() =>
                      handleDayClick({ activePayload: [{ payload: entry }] })
                    }
                    fill={
                      entry.isToday
                        ? "#059669"
                        : entry.value > 0
                          ? "#d1fae5"
                          : "#f8fafc"
                    }
                    stroke={entry.isToday ? "#059669" : "#f1f5f9"}
                    strokeWidth={entry.isToday ? 2 : 1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-top-2 mx-2 mt-4 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 duration-700">
        <div className="shrink-0 rounded-xl bg-emerald-100 p-2 text-emerald-700">
          <MousePointerClick size={16} />
        </div>
        <div className="text-left">
          <p className="mb-0.5 text-[10px] font-black tracking-wider text-emerald-800 uppercase">
            Tips Navigasi
          </p>
          <p className="text-xs leading-relaxed font-medium text-emerald-700">
            Klik pada batang grafik untuk melihat detail amalan dan refleksi
            harian Anda pada tanggal tersebut.
          </p>
        </div>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HistoryProgress;
