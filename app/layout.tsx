import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI PM Challenge",
  description: "Dashboard application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100`}
      >
        <div className="min-h-screen flex flex-col items-center">
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
          <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
