"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

const labels: Record<string, string> = {
  light: "Light",
  dark: "Dark",
  auto: "Auto",
};

export function ThemeToggle() {
  const { preference, resolved, cycleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolved === "dark";

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Theme: ${labels[preference]}. Click to cycle.`}
      title={`Theme: ${labels[preference]} (follow system when Auto)`}
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-300/70 bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-600 shadow-sm backdrop-blur transition hover:border-slate-400 hover:text-slate-800 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-slate-400"
    >
      <span
        aria-hidden
        className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] text-white dark:bg-amber-400 dark:text-slate-900"
      >
        {preference === "auto" ? "◐" : isDark ? "☾" : "☀"}
      </span>
      <span>{labels[preference]}</span>
    </button>
  );
}

