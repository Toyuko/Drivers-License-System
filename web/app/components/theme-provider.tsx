"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemePreference = "light" | "dark" | "auto";
export type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  preference: ThemePreference;
  resolved: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
  cycleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemPreference(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialPreference(): ThemePreference {
  if (typeof window === "undefined") return "auto";

  try {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark" || stored === "auto") {
      return stored;
    }
  } catch {
    // ignore
  }

  return "auto";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("auto");
  const [systemPref, setSystemPref] = useState<ResolvedTheme>("light");

  useEffect(() => {
    setPreferenceState(getInitialPreference());
    setSystemPref(getSystemPreference());

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setSystemPref(getSystemPreference());
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const resolved: ResolvedTheme =
    preference === "auto" ? systemPref : preference;

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(resolved === "dark" ? "theme-dark" : "theme-light");

    try {
      window.localStorage.setItem("theme", preference);
    } catch {
      // ignore
    }
  }, [preference, resolved]);

  const setPreference = (p: ThemePreference) => setPreferenceState(p);

  const cycleTheme = () => {
    setPreferenceState((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "auto" : "light"
    );
  };

  return (
    <ThemeContext.Provider
      value={{ preference, resolved, setPreference, cycleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

