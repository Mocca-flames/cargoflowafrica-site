"use client";

import { useEffect, useState } from "react";

/**
 * Hook to separate desktop and mobile layouts cleanly.
 * Returns null during SSR / hydration to prevent layout mismatch,
 * then resolves to boolean once mounted in the browser.
 */
export function useIsMobile(breakpoint = 1024): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
