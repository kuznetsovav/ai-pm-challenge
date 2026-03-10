"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ProgressField =
  | "conceptCompleted"
  | "interviewCompleted"
  | "prototypeCompleted";

interface Task {
  id: ProgressField;
  label: string;
  field: ProgressField;
}

const ALL_TASKS: Task[] = [
  { id: "conceptCompleted", label: "Learn concept", field: "conceptCompleted" },
  {
    id: "interviewCompleted",
    label: "Answer interview question",
    field: "interviewCompleted",
  },
  {
    id: "prototypeCompleted",
    label: "Work on prototype",
    field: "prototypeCompleted",
  },
];

interface TaskChecklistProps {
  dayNumber: number;
  conceptCompleted: boolean;
  interviewCompleted: boolean;
  prototypeCompleted: boolean;
  hasInterviewQuestion: boolean;
  hasPrototype: boolean;
}

export function TaskChecklist({
  dayNumber,
  conceptCompleted,
  interviewCompleted,
  prototypeCompleted,
  hasInterviewQuestion,
  hasPrototype,
}: TaskChecklistProps) {
  const tasks = ALL_TASKS.filter(
    (t) =>
      t.field === "conceptCompleted" ||
      (t.field === "interviewCompleted" && hasInterviewQuestion) ||
      (t.field === "prototypeCompleted" && hasPrototype)
  );
  const router = useRouter();
  const [pending, setPending] = useState<ProgressField | null>(null);

  const progress: Record<ProgressField, boolean> = {
    conceptCompleted,
    interviewCompleted,
    prototypeCompleted,
  };

  async function handleToggle(field: ProgressField) {
    const nextValue = !progress[field];
    setPending(field);
    try {
      const res = await fetch("/api/progress/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dayNumber, field, value: nextValue }),
      });
      if (!res.ok) throw new Error("Update failed");
      router.refresh();
    } catch {
      setPending(null);
    } finally {
      setPending(null);
    }
  }

  return (
    <ul className="space-y-3">
      {tasks.map(({ id, label, field }) => {
        const done = progress[field];
        const isPending = pending === field;
        return (
          <li key={id} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleToggle(field)}
              disabled={isPending}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 transition-colors hover:border-zinc-400 dark:hover:border-zinc-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
              aria-checked={done}
              role="checkbox"
              aria-label={done ? `Mark "${label}" incomplete` : `Mark "${label}" complete`}
            >
              {done && (
                <span className="text-emerald-600 dark:text-emerald-400">✓</span>
              )}
            </button>
            <span
              className={
                done
                  ? "text-zinc-500 dark:text-zinc-400 line-through"
                  : "text-zinc-900 dark:text-zinc-100"
              }
            >
              {label}
            </span>
            {isPending && (
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                Updating…
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
