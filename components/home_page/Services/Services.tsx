"use client";

import { useIsMobile } from "@/lib/useIsMobile";
import ServicesDesktop from "./ServicesDesktop";
import ServicesMobile from "./ServicesMobile";
import "./Services.css";

export default function Services() {
  const isMobile = useIsMobile(1024);

  if (isMobile === null) {
    return (
      <section
        id="services"
        className="services"
        style={{ minHeight: "100svh" }}
        aria-label="Our Services"
      />
    );
  }

  return isMobile ? (
    <ServicesMobile key="mobile" />
  ) : (
    <ServicesDesktop key="desktop" />
  );
}


