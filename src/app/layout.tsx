import "./globals.css";
import type { ReactNode } from "react";
import { Header } from "@/components/shared/Header";

export const metadata = {
  title: "Plan A Hunt (GA)",
  description: "Georgia Wildlife Management Area planner"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="theme-classic min-h-screen bg-slate-100 text-slate-900">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
