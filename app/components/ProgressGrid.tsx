export type DayProgress = {
  dayNumber: number;
  conceptCompleted: boolean;
  interviewCompleted: boolean;
  prototypeCompleted: boolean;
};

interface ProgressGridProps {
  days: DayProgress[];
  currentDayNumber: number;
}

function getSquareColor(day: DayProgress): string {
  if (day.conceptCompleted) return "bg-emerald-500 dark:bg-emerald-600";
  if (day.prototypeCompleted) return "bg-blue-500 dark:bg-blue-600";
  if (day.interviewCompleted) return "bg-amber-500 dark:bg-amber-600";
  return "bg-zinc-200 dark:bg-zinc-700";
}

const COLS = 10;
const ROWS = 6;

export function ProgressGrid({ days, currentDayNumber }: ProgressGridProps) {
  return (
    <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
        Progress
      </h2>
      <div
        className="grid gap-1 w-full max-w-[280px]"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
        }}
        role="img"
        aria-label="60-day progress grid. Green: concept completed. Blue: prototype completed. Amber: interview completed. Gray: not started."
      >
        {days.map((day) => {
          const color = getSquareColor(day);
          const isCurrent = day.dayNumber === currentDayNumber;
          const label = day.conceptCompleted
            ? `Day ${day.dayNumber}: concept completed`
            : day.prototypeCompleted
              ? `Day ${day.dayNumber}: prototype completed`
              : day.interviewCompleted
                ? `Day ${day.dayNumber}: interview completed`
                : `Day ${day.dayNumber}: not started`;
          return (
            <div
              key={day.dayNumber}
              className={`aspect-square rounded-sm ${color} ${isCurrent ? "ring-2 ring-zinc-900 dark:ring-zinc-100 ring-offset-2 dark:ring-offset-zinc-900" : ""}`}
              title={label}
              aria-label={label}
            />
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-emerald-500 dark:bg-emerald-600" aria-hidden />
          Concept done
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-amber-500 dark:bg-amber-600" aria-hidden />
          Interview done
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-blue-500 dark:bg-blue-600" aria-hidden />
          Prototype done
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-zinc-200 dark:bg-zinc-700" aria-hidden />
          Not started
        </span>
      </div>
    </section>
  );
}
