"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const callbackUrl = "/";

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 gap-6">
      <div className="max-w-xl text-center space-y-2">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          AI PM Challenge
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
          A guided 60‑day journey to learn AI product concepts, answer PM interview
          questions, and ship small prototypes with Cursor.
        </p>
      </div>
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm flex flex-col items-stretch gap-6">
        <div className="text-center space-y-2">
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Log in to AI PM Challenge
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Continue with your Google account.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className="inline-flex items-center justify-center gap-3 rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24.5c0-1.57-.14-3.08-.39-4.5H24v9h12.7c-.55 2.9-2.23 5.36-4.74 7.01l7.7 5.98C43.9 38.33 46.5 31.92 46.5 24.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.54 28.59A14.5 14.5 0 0 1 9.5 24c0-1.58.27-3.11.76-4.54l-7.98-6.19A23.88 23.88 0 0 0 0 24c0 3.86.92 7.5 2.55 10.73l7.99-6.14z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.7-5.98C29.96 37.94 27.21 38.9 24 38.9c-6.26 0-11.57-4.22-13.47-10.01l-7.98 6.14C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
            </span>
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </main>
  );
}

