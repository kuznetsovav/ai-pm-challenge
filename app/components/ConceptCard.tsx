"use client";

import { useState } from "react";

interface ConceptCardProps {
  title: string;
  explanation: string;
  whyItMattersForPM: string;
  exampleUseCase: string;
  learnMoreUrls?: { label: string; url: string }[];
}

export function ConceptCard({
  title,
  explanation,
  whyItMattersForPM,
  exampleUseCase,
  learnMoreUrls = [],
}: ConceptCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
        Concept
      </h2>
      <p className="text-lg text-zinc-900 dark:text-zinc-100">{title}</p>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1.5"
      >
        {expanded ? "Hide details" : "Show details"}
        <span className="text-zinc-400" aria-hidden>
          {expanded ? "▲" : "▼"}
        </span>
      </button>
      {expanded && (
        <div className="mt-4 space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
              Explanation
            </h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {explanation}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
              Why it matters for PMs
            </h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {whyItMattersForPM}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
              Example
            </h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {exampleUseCase}
            </p>
          </div>
          {learnMoreUrls.length > 0 && (
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                Learn more
              </h3>
              <ul className="flex flex-wrap gap-2">
                {learnMoreUrls.map(({ label, url }) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
