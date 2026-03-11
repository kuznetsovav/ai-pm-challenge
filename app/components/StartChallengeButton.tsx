"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function StartChallengeButton() {
  const router = useRouter();
  const [starting, setStarting] = useState(false);

  async function handleStart() {
    setStarting(true);
    try {
      const res = await fetch("/api/challenge/start", { method: "POST" });
      if (!res.ok) throw new Error("Failed to start");
      router.refresh();
    } catch {
      setStarting(false);
      return;
    }
    setStarting(false);
  }

  return (
    <button
      type="button"
      onClick={handleStart}
      disabled={starting}
      className="inline-flex items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-3 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 transition-colors"
    >
      {starting ? "Starting…" : "Start the Challenge"}
    </button>
  );
}
