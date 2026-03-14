"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 w-full border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-50/80 dark:supports-[backdrop-filter]:bg-zinc-950/80">
      <nav className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex h-14 items-center gap-6">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/prototypes"
          className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          Prototypes
        </Link>
      </nav>
    </header>
  );
}

