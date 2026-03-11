"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface PrototypeCardProps {
  prototypeId: number | null;
  name: string;
  description: string;
  problem: string;
  coreConcepts: string;
  startDay: number;
  endDay: number;
  githubUrl: string | null;
  isDone: boolean;
}

export function PrototypeCard({
  prototypeId: initialPrototypeId,
  name,
  description,
  problem,
  coreConcepts,
  startDay,
  endDay,
  githubUrl: initialUrl,
  isDone,
}: PrototypeCardProps) {
  const router = useRouter();
  const [url, setUrl] = useState(initialUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [savedUrl, setSavedUrl] = useState<string | null>(initialUrl);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy Prompt");

  useEffect(() => {
    setUrl(initialUrl ?? "");
    setSavedUrl(initialUrl);
  }, [initialUrl]);

  async function ensurePrototypeId(): Promise<number> {
    if (initialPrototypeId != null) return initialPrototypeId;
    const res = await fetch("/api/prototypes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDay,
        endDay,
        name,
        description,
        problem,
        coreConcepts,
        githubUrl: null,
      }),
    });
    if (!res.ok) throw new Error("Failed to create prototype");
    const data = await res.json();
    return data.id;
  }

  async function handleGeneratePrompt() {
    setGenerating(true);
    try {
      const id = await ensurePrototypeId();
      const res = await fetch("/api/prototype/generatePrompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prototypeId: id }),
      });
      if (!res.ok) throw new Error("Failed to generate prompt");
      const data = await res.json();
      setPrompt(data.prompt ?? null);
      setCopyLabel("Copy Prompt");
      setModalOpen(true);
      router.refresh();
    } catch {
      setGenerating(false);
      return;
    }
    setGenerating(false);
  }

  async function handleCopyPrompt() {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyLabel("Copied to clipboard");
      setTimeout(() => setCopyLabel("Copy Prompt"), 2000);
    } catch {
      setCopyLabel("Copy failed");
    }
  }

  async function handleSaveLink(e: React.FormEvent) {
    e.preventDefault();
    const value = url.trim();
    setSaving(true);
    try {
      const res = await fetch("/api/prototypes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDay,
          endDay,
          name,
          description,
          problem,
          coreConcepts,
          githubUrl: value || null,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      setSavedUrl(data.githubUrl ?? null);
      router.refresh();
    } catch {
      setSaving(false);
      return;
    }
    setSaving(false);
  }

  return (
    <>
      <article className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
              {name}
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Days {startDay} – {endDay}
            </p>
          </div>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border whitespace-nowrap ${
              isDone
                ? "border-emerald-400/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                : "border-zinc-300/70 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            {isDone ? "Done" : "To Do"}
          </span>
        </div>
        {description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        )}
        {savedUrl && (
          <p className="text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Repo: </span>
            <a
              href={savedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              {savedUrl}
            </a>
          </p>
        )}
        <button
          type="button"
          onClick={handleGeneratePrompt}
          disabled={generating}
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors"
        >
          {generating ? "Generating…" : "Generate Cursor Prompt"}
        </button>
        <form onSubmit={handleSaveLink} className="flex flex-col gap-2 mt-auto">
          <label htmlFor={`gh-${startDay}`} className="sr-only">
            GitHub repo URL
          </label>
          <input
            id={`gh-${startDay}`}
            type="url"
            placeholder="https://github.com/owner/repo"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500"
            disabled={saving}
          />
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-2 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving…" : "Save link"}
          </button>
        </form>
      </article>

      {modalOpen && prompt !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Cursor prompt"
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col border border-zinc-200 dark:border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Cursor Prompt
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 p-1"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-auto flex-1">
              <pre className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap font-mono overflow-x-auto">
                {prompt}
              </pre>
            </div>
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="w-full rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-2 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
              >
                {copyLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
