"use client";

import { useIsMobile } from "@/lib/useIsMobile";
import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";

export default function Hero() {
  const isMobile = useIsMobile(1024);

  if (isMobile === null) {
    return (
      <section
        className="hero-placeholder"
        style={{ minHeight: "80vh" }}
        aria-label="Hero"
      />
    );
  }

  return isMobile ? <HeroMobile key="mobile" /> : <HeroDesktop key="desktop" />;
}

