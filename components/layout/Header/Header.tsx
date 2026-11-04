"use client";

import { useEffect, useState } from "react";
import { withBase } from "@/lib/withBase";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

interface HeaderProps {
  immersive?: boolean;
}

const KNOWN_DARK = new Set([
  "hero",
  "page-hero-dark",
  "coverage-section",
  "corridor-section",
  "site-footer",
]);

function luminance(r: number, g: number, b: number) {
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function sectionIsDark(el: Element): boolean {
  if (el.id && KNOWN_DARK.has(el.id)) return true;
  if (
    el.classList.contains("corridor") ||
    el.classList.contains("cov2") ||
    el.classList.contains("page-hero--dark")
  )
    return true;
  if (el.closest(".corridor") && el.tagName === "SECTION") return true;
  const bg = getComputedStyle(el).backgroundColor;
  const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return false;
  if (bg.startsWith("rgba") && parseFloat(bg.split(",")[3]) < 0.15) return false;
  return luminance(+m[1], +m[2], +m[3]) < 0.32;
}

export default function Header({ immersive }: HeaderProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(
    immersive ? "dark" : "light"
  );

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const delta = y - lastY;
      if (Math.abs(delta) < 8) return;
      setHidden(delta > 0 && y > 80);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let raf = 0;
    const probe = () => {
      raf = 0;
      const x = window.innerWidth / 2;
      const y = 44;
      const hit = document.elementFromPoint(x, y);
      const section = hit?.closest?.("section, footer, header");
      if (section) setTheme(sectionIsDark(section) ? "dark" : "light");
      else setTheme(window.scrollY < window.innerHeight * 0.9 ? "dark" : "light");
    };
    const onScrollProbe = () => {
      if (!raf) raf = requestAnimationFrame(probe);
    };
    probe();
    window.addEventListener("scroll", onScrollProbe, { passive: true });
    window.addEventListener("resize", onScrollProbe);
    return () => {
      window.removeEventListener("scroll", onScrollProbe);
      window.removeEventListener("resize", onScrollProbe);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className={`${styles.wrap}${scrolled ? ` ${styles.scrolled}` : ""}${hidden && !isOpen ? ` ${styles.hidden}` : ""}`}
        data-theme={theme}
      >
        <div className={styles.pill} data-theme={theme}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="Cargo Flow Africa — Home"
          >
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={withBase("/images/logo-mobile.avif")}
                type="image/avif"
              />
              <Image
                src={withBase("/images/logo-desktop.avif")}
                alt="Cargo Flow Africa Transport Group"
                width={160}
                height={40}
                priority
                className={styles.logoImg}
              />
            </picture>
          </Link>

          <nav className={styles.desktopNav} aria-label="Main navigation">
            <Link href="#about" className={styles.navLink}>About Us</Link>
            <Link href="#services" className={styles.navLink}>Services</Link>
            <Link href="#industries" className={styles.navLink}>Industries</Link>
            <Link href="#process" className={styles.navLink}>Process</Link>
            <Link href="#contact" className={styles.navLink}>Contact Us</Link>
            <a
              href={withBase("/profile.pdf")}
              download
              className={styles.navLink}
            >
              Profile
              <span className={styles.externalArrow} aria-hidden="true">↗</span>
            </a>
          </nav>

          <div className={styles.actions}>
            <Link href="#contact" className={styles.cta}>
              Get Quote
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </Link>

            <button
              type="button"
              className={`${styles.burger}${isOpen ? ` ${styles.burgerOpen}` : ""}`}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.mobilePanel}${isOpen ? ` ${styles.mobileOpen}` : ""}`}
        data-theme={theme}
        aria-hidden={!isOpen}
      >
        <nav aria-label="Mobile navigation" className={styles.mobileNav}>
          <Link href="#about" className={styles.mobileLink} onClick={closeMenu}>About Us</Link>
          <Link href="#services" className={styles.mobileLink} onClick={closeMenu}>Services</Link>
          <Link href="#industries" className={styles.mobileLink} onClick={closeMenu}>Industries</Link>
          <Link href="#process" className={styles.mobileLink} onClick={closeMenu}>Process</Link>
          <Link href="#contact" className={styles.mobileLink} onClick={closeMenu}>Contact Us</Link>
          <a
            href={withBase("/profile.pdf")}
            download
            className={styles.mobileLink}
            onClick={closeMenu}
          >
            Profile
            <span className={styles.externalArrow} aria-hidden="true">↗</span>
          </a>
          <Link
            href="#contact"
            className={styles.mobileCta}
            onClick={closeMenu}
          >
            Get a Transport Quote →
          </Link>
        </nav>
      </div>
    </>
  );
}
