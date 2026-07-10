"use client";

import { useTheme } from "next-themes";
import { AiFillSun } from "react-icons/ai";
import { RxMoon } from "react-icons/rx";
import { useMounted } from "@/hooks/useMounted";

export function ThemeSwitch() {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const handleThemeToggle = (): void => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      aria-label="Toggle Theme"
      onClick={handleThemeToggle}
      className="
        flex
        items-center
        justify-center
        gap-1
        p-2
        rounded-full
        text-muted
        bg-card
        hover:text-nav-icon-hover
        relative w-10 h-10 shadow-2xs
      "
    >
      {isDark ? (
        <RxMoon className="text-lg" />
      ) : (
        <AiFillSun className="text-lg" />
      )}
    </button>
  );
}