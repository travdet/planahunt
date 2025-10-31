import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Plan A Hunt (GA)",
  description: "Georgia Wildlife Management Area planner"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 text-slate-900">
        <header className="bg-emerald-900 text-emerald-50">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
            <img src="/logo.svg" alt="Plan-A-Hunt" className="h-8 w-auto" />
            <nav className="ml-6 flex items-center gap-4 text-sm text-emerald-100 opacity-90">
              <Link href="/" className="transition hover:text-white">
                Browse WMAs
              </Link>
            </nav>
            <span className="ml-auto text-xs uppercase tracking-wide text-emerald-100 opacity-80">
              Georgia hunt planning tools
            </span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
