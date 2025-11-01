import { AREAS_WITH_RULES } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function BetaWMAPage({ params }: { params: { id: string } }) {
  const area = AREAS_WITH_RULES.find((entry) => entry.wma.id === params.id);
  if (!area) return notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <div className="space-y-2">
        <Link href="/beta" className="text-sm text-[var(--forest-primary)] hover:underline">
          ← Back to beta home
        </Link>
        <h1 className="text-4xl font-semibold text-[var(--forest-dark)]">{area.wma.name}</h1>
        <p className="text-sm text-[var(--stone-600)]">
          This is a preview page. Full beta detail layouts are in progress. Use the classic view for complete information.
        </p>
      </div>
      <section className="rounded-3xl border-2 border-[var(--stone-200)] bg-white p-6">
        <h2 className="text-xl font-semibold text-[var(--forest-dark)]">Available hunts</h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--stone-700)]">
          {area.rules.slice(0, 8).map((rule) => (
            <li key={rule.id} className="rounded-lg border border-[var(--stone-200)] bg-[var(--stone-50)] px-3 py-2">
              {rule.species} · {rule.weapon} ({rule.start_date} → {rule.end_date})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
