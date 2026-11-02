"use client";

import { useState } from "react";
import { withBase } from "@/lib/withBase";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Cargo Flow Africa — Home">
          <picture>
            <source
              media="(max-width: 768px)"
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

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <Link href="#about"      className={styles.navLink}>About Us</Link>
          <Link href="#services"   className={styles.navLink}>Services</Link>
          <Link href="#industries" className={styles.navLink}>Industries</Link>
          <Link href="#process"    className={styles.navLink}>Process</Link>
          <Link href="#contact"    className={styles.navLink}>Contact Us</Link>
          <a
            href={withBase("/profile.pdf")}
            download
            className={`${styles.navLink} ${styles.navLinkDownload}`}
          >
            Profile
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8l-8-8z"/>
              <path d="M14 2v8h8"/>
              <path d="M12 19v-8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v8"/>
              <path d="M10 17l2 2 2-2"/>
            </svg>
          </a>
        </nav>

        {/* Desktop CTA + Mobile toggle */}
        <div className={styles.actions}>
          <Link href="#contact" className={`btn btn-cta ${styles.desktopCta}`}>
            Get Quote
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 7h10v10"/>
              <path d="M7 17 17 7"/>
            </svg>
          </Link>

          <button
            className={styles.menuBtn}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" y1="6" x2="20" y2="6"/>
                <line x1="4" y1="12" x2="20" y2="12"/>
                <line x1="4" y1="18" x2="20" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav
        id="mobile-nav"
        className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ""}`}
        aria-label="Mobile navigation"
      >
        <div className={`container ${styles.mobileNavInner}`}>
          <Link href="#about"      className={styles.mobileLink} onClick={closeMenu}>About Us</Link>
          <Link href="#services"   className={styles.mobileLink} onClick={closeMenu}>Services</Link>
          <Link href="#industries" className={styles.mobileLink} onClick={closeMenu}>Industries</Link>
          <Link href="#process"    className={styles.mobileLink} onClick={closeMenu}>Process</Link>
          <Link href="#contact"    className={styles.mobileLink} onClick={closeMenu}>Contact Us</Link>
          <a
            href={withBase("/profile.pdf")}
            download
            className={`${styles.mobileLink} ${styles.navLinkDownload}`}
            onClick={closeMenu}
          >
            Profile
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8l-8-8z"/>
              <path d="M14 2v8h8"/>
              <path d="M12 19v-8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v8"/>
              <path d="M10 17l2 2 2-2"/>
            </svg>
          </a>
          <Link href="#contact" className={`btn btn-primary ${styles.mobileCta}`} onClick={closeMenu}>
            Get a Transport Quote
          </Link>
        </div>
      </nav>
    </header>
  );
}
