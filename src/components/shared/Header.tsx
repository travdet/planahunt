"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, Sparkles } from "lucide-react";
import { useMemo } from "react";

const navLinks = [
  { href: "/", label: "Explore" },
  { href: "/saved", label: "Saved" },
  { href: "/calendar", label: "Calendar" }
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isBeta = pathname.startsWith("/beta");

  const mappedLinks = useMemo(() => {
    return navLinks.map((link) => {
      const href = isBeta ? `/beta${link.href === "/" ? "" : link.href}` : link.href;
      const active = pathname === href;
      return { ...link, href, active };
    });
  }, [isBeta, pathname]);

  const handleToggle = () => {
    const searchSuffix =
      typeof window !== "undefined" && window.location.search
        ? window.location.search
        : "";
    if (isBeta) {
      const target = pathname.replace(/^\/beta/, "") || "/";
      router.push(`${target}${searchSuffix}`);
    } else {
      const target = pathname === "/" ? "/beta" : `/beta${pathname}`;
      router.push(`${target}${searchSuffix}`);
    }
  };

  return (
    <header
      className={`${
        isBeta
          ? "relative border-b-2 border-[var(--clay-dark)] bg-gradient-to-b from-[var(--forest-dark)] to-[var(--forest-primary)] text-white"
          : "bg-[var(--classic-primary-dark)] text-white"
      }`}
    >
      {isBeta && (
        <div className="paper-texture-light pointer-events-none absolute inset-0" aria-hidden />
      )}
      <div className="relative mx-auto flex max-w-6xl items-center gap-6 px-4 py-4">
        <Link href={isBeta ? "/beta" : "/"} className="font-bold tracking-wide">
          Plan-A-Hunt GA
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {mappedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:opacity-100 ${link.active ? "opacity-100" : "opacity-80"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={handleToggle}
          className={`ml-auto flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
            isBeta
              ? "border-white/40 bg-white/10 hover:bg-white/20"
              : "border-white/10 bg-white/10 hover:bg-white/20"
          }`}
        >
          {isBeta ? (
            <>
              <LayoutGrid className="h-4 w-4" />
              Classic View
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Try Beta
            </>
          )}
        </button>
      </div>
      {isBeta && (
        <div className="border-t border-[var(--clay-light)] bg-amber-100 px-4 py-2 text-center text-xs font-medium text-amber-900">
          You are previewing the new design. Switch back any time from the header.
        </div>
      )}
    </header>
  );
}
