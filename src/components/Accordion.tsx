"use client";
import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export default function Accordion({ title, children, defaultOpen = false }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 text-left font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown
          size={20}
          className={"transition-transform duration-200" + (isOpen ? " rotate-180" : "")}
        />
      </button>
      {isOpen && (
        <div className="pb-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}
