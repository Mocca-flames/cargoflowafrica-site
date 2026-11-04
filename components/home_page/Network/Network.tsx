"use client";

import { useIsMobile } from "@/lib/useIsMobile";
import NetworkDesktop from "./NetworkDesktop";
import NetworkMobile from "./NetworkMobile";

export default function Network() {
  const isMobile = useIsMobile(1024);

  if (isMobile === null) {
    return (
      <section
        className="network-placeholder"
        style={{ minHeight: "50vh" }}
        aria-label="Our Network"
      />
    );
  }

  return isMobile ? <NetworkMobile key="mobile" /> : <NetworkDesktop key="desktop" />;
}

