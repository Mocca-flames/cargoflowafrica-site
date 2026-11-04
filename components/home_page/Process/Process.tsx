"use client";

import { useIsMobile } from "@/lib/useIsMobile";
import ProcessDesktop from "./ProcessDesktop";
import ProcessMobile from "./ProcessMobile";

export default function Process() {
  const isMobile = useIsMobile(1024);

  if (isMobile === null) {
    return (
      <section
        id="process"
        style={{ minHeight: "60vh" }}
        aria-label="Our 5-step process"
      />
    );
  }

  return isMobile ? <ProcessMobile key="mobile" /> : <ProcessDesktop key="desktop" />;
}

