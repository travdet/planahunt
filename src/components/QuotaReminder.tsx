"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Bell, Check } from "lucide-react";

import { STORAGE_KEYS } from "@/lib/constants";
import { fmtMDY, todayISO } from "@/lib/util";

const REMINDER_OFFSET_DAYS = 7; // dev-note: keep offset in sync with docs & emails.

type Props = {
  huntId: string;
  wmaName: string;
  label: string;
  applicationDeadline: string;
  applicationUrl?: string | null;
};

type SavedReminder = {
  id: string;
  huntId: string;
  wmaName: string;
  label: string;
  deadline: string;
  remindOn: string;
  createdAt: string;
  url?: string | null;
};

function loadReminders(): SavedReminder[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEYS.quotaReminders);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is SavedReminder => Boolean(item && item.huntId && item.deadline));
  } catch (error) {
    console.warn("Failed to parse quota reminders", error);
    return [];
  }
}

function persistReminders(entries: SavedReminder[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEYS.quotaReminders, JSON.stringify(entries));
}

function createICS({
  title,
  description,
  url,
  deadline
}: {
  title: string;
  description: string;
  url?: string | null;
  deadline: string;
}) {
  const stamp = deadline.replace(/-/g, "");
  const details = [`BEGIN:VCALENDAR`, `VERSION:2.0`, `PRODID:-//Plan-A-Hunt//Quota Reminder//EN`, `BEGIN:VEVENT`];
  details.push(`UID:${title}-${stamp}@plan-a-hunt`);
  details.push(`DTSTAMP:${stamp}T120000Z`);
  details.push(`DTSTART;VALUE=DATE:${stamp}`);
  details.push(`SUMMARY:${title}`);
  details.push(`DESCRIPTION:${description}${url ? `\\nApply: ${url}` : ""}`);
  if (url) {
    details.push(`URL:${url}`);
  }
  details.push(`END:VEVENT`);
  details.push(`END:VCALENDAR`);
  return details.join("\r\n");
}

export default function QuotaReminder({ huntId, wmaName, label, applicationDeadline, applicationUrl }: Props) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const remindOn = useMemo(() => {
    const deadlineDate = new Date(`${applicationDeadline}T00:00:00`);
    deadlineDate.setDate(deadlineDate.getDate() - REMINDER_OFFSET_DAYS);
    return deadlineDate.toISOString().slice(0, 10);
  }, [applicationDeadline]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reminders = loadReminders();
    const alreadySaved = reminders.some((entry) => entry.huntId === huntId && entry.deadline === applicationDeadline);
    setSaved(alreadySaved);
    setLoading(false);
  }, [huntId, applicationDeadline]);

  if (!applicationDeadline) return null;

  const prettyDeadline = fmtMDY(applicationDeadline);
  const icsTitle = `${label} – ${wmaName}`;

  function handleAddCalendar() {
    const body = createICS({
      title: icsTitle,
      description: `Quota application deadline for ${label} at ${wmaName}.`,
      url: applicationUrl,
      deadline: applicationDeadline
    });
    const blob = new Blob([body], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${icsTitle.replace(/[^a-z0-9-]+/gi, "-").toLowerCase()}-${applicationDeadline}.ics`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  function handleSaveReminder() {
    const reminders = loadReminders();
    const entry: SavedReminder = {
      id: `${huntId}:${applicationDeadline}`,
      huntId,
      wmaName,
      label,
      deadline: applicationDeadline,
      remindOn,
      createdAt: todayISO(),
      url: applicationUrl || undefined
    };
    const next = reminders.filter((item) => item.id !== entry.id);
    next.push(entry);
    persistReminders(next);
    setSaved(true);
  }

  const reminderDisabled = loading || saved;

  return (
    <div className="flex flex-wrap gap-2 text-sm">
      <button
        type="button"
        onClick={handleAddCalendar}
        className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700"
      >
        <CalendarDays className="h-3.5 w-3.5" aria-hidden />
        Add to calendar
      </button>
      <button
        type="button"
        onClick={handleSaveReminder}
        disabled={reminderDisabled}
        className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
          reminderDisabled
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-slate-300 text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
        }`}
        title={saved ? `Reminder scheduled for ${fmtMDY(remindOn)}` : `Email yourself ${REMINDER_OFFSET_DAYS} days before`}
      >
        {saved ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Bell className="h-3.5 w-3.5" aria-hidden />}
        {saved ? `Reminder set for ${fmtMDY(remindOn)}` : `Remind me (${REMINDER_OFFSET_DAYS} days prior)`}
      </button>
      <p className="basis-full text-[11px] text-slate-500">
        Applications due {prettyDeadline}. Reminders save locally; sync with backend once notifications ship.
      </p>
    </div>
  );
}
