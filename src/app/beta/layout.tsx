import type { ReactNode } from "react";

export default function BetaLayout({ children }: { children: ReactNode }) {
  return <div className="theme-beta min-h-screen bg-[var(--stone-50)] text-[var(--stone-900)]">{children}</div>;
}
