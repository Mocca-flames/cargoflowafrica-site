"use client";

import { useIsMobile } from "@/lib/useIsMobile";
import ContactDesktop from "./ContactDesktop";
import ContactMobile from "./ContactMobile";

export default function Contact() {
  const isMobile = useIsMobile(1024);

  if (isMobile === null) {
    return (
      <section
        id="contact"
        style={{ minHeight: "60vh" }}
        aria-label="Contact Us"
      />
    );
  }

  return isMobile ? <ContactMobile key="mobile" /> : <ContactDesktop key="desktop" />;
}

