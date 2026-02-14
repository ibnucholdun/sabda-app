const TrackerSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6 pb-12">
      {/* Skeleton Hero */}
      <div className="relative flex h-64 flex-col justify-end space-y-4 overflow-hidden rounded-[2.5rem] bg-slate-200 p-8">
        <div className="space-y-2">
          <div className="h-4 w-24 rounded-full bg-slate-300" />
          <div className="h-10 w-48 rounded-xl bg-slate-300" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="h-4 w-20 rounded-full bg-slate-300" />
            <div className="h-4 w-12 rounded-full bg-slate-300" />
          </div>
          <div className="h-3 w-full rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Skeleton List Items */}
      <div className="space-y-4 px-1">
        <div className="mb-6 h-6 w-32 rounded-lg bg-slate-200" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center space-x-4 rounded-3xl border border-slate-100 bg-white p-4"
          >
            <div className="h-12 w-12 rounded-2xl bg-slate-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded-md bg-slate-200" />
              <div className="h-3 w-1/2 rounded-md bg-slate-100" />
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackerSkeleton;
