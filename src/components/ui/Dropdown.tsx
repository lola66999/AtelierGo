"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type DropdownOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type Props = {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  placement?: "bottom" | "top";
  className?: string;
};

export default function Dropdown({
  value,
  options,
  onChange,
  placeholder,
  icon,
  placement = "bottom",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // Tashqariga bosilsa yopiladi
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Klaviatura bilan yurganda faol element ko'rinib tursin
  useEffect(() => {
    if (!open) return;
    ref.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const openMenu = () => {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) openMenu();
      else setActive((i) => Math.min(options.length - 1, i + 1));
    }
    if (e.key === "ArrowUp" && open) {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    }
    if (e.key === "Enter" && open && active >= 0) {
      e.preventDefault();
      choose(options[active].value);
    }
  };

  return (
    <div ref={ref} className={`relative ${className}`} onKeyDown={onKeyDown}>
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openMenu())}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-white px-3.5 py-3 text-sm transition ${
          open
            ? "border-brand-500 ring-2 ring-brand-100"
            : "border-cream-dark hover:border-brand-300"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          {icon && <span className="shrink-0 text-brand-600">{icon}</span>}
          <span className={`truncate ${selected ? "text-ink" : "text-ink/50"}`}>
            {selected?.label ?? placeholder}
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-brand-600 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute left-0 right-0 z-30 max-h-64 min-w-[12rem] overflow-auto rounded-2xl border border-cream-dark bg-white p-1.5 shadow-lg ${
            placement === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {options.map((o, i) => {
            const isSelected = o.value === value;
            return (
              <li
                key={o.value}
                role="option"
                aria-selected={isSelected}
                data-active={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(o.value)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm ${
                  i === active ? "bg-brand-50" : ""
                } ${isSelected ? "font-medium text-brand-800" : "text-ink/80"}`}
              >
                <span className="flex items-center gap-2">
                  {o.icon && <span className="text-brand-600">{o.icon}</span>}
                  {o.label}
                </span>
                {isSelected && <Check className="h-4 w-4 text-brand-600" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}