"use client";

import { useEffect } from "react";

/**
 * Lets Escape hide the dock labels without moving the pointer or focus
 * (WCAG 2.2, 1.4.13). The labels come back once the pointer leaves the dock
 * or focus moves to another control.
 */
export function DockEscape() {
  useEffect(() => {
    const dock = document.querySelector<HTMLElement>("[data-dock]");
    if (!dock) return;

    const hide = (event: KeyboardEvent) => {
      if (event.key === "Escape") dock.dataset.tips = "off";
    };
    const show = () => {
      delete dock.dataset.tips;
    };

    document.addEventListener("keydown", hide);
    dock.addEventListener("pointerleave", show);
    dock.addEventListener("focusin", show);
    return () => {
      document.removeEventListener("keydown", hide);
      dock.removeEventListener("pointerleave", show);
      dock.removeEventListener("focusin", show);
    };
  }, []);

  return null;
}
