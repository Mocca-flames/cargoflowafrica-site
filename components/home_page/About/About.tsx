"use client";

import { useIsMobile } from "@/lib/useIsMobile";
import AboutDesktop from "./AboutDesktop";
import AboutMobile from "./AboutMobile";

export default function About() {
  const isMobile = useIsMobile(1024);

  if (isMobile === null) {
    return (
      <section
        id="about"
        style={{ minHeight: "60vh" }}
        aria-label="Why Partner With Us"
      />
    );
  }

  return isMobile ? <AboutMobile key="mobile" /> : <AboutDesktop key="desktop" />;
}

