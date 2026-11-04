"use client";

import { useIsMobile } from "@/lib/useIsMobile";
import IndustriesDesktop from "./IndustriesDesktop";
import IndustriesMobile from "./IndustriesMobile";

export default function Industries() {
  const isMobile = useIsMobile(1024);

  if (isMobile === null) {
    return (
      <section
        id="industries"
        style={{ minHeight: "60vh" }}
        aria-label="Cargo & Industries We Support"
      />
    );
  }

  return isMobile ? (
    <IndustriesMobile key="mobile" />
  ) : (
    <IndustriesDesktop key="desktop" />
  );
}

