import Image from "next/image";
import { withBase } from "@/lib/withBase";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>

          {/* Brand + Contact */}
          <div className={styles.brand}>
            <Link href="/" aria-label="Cargo Flow Africa — Home">
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={withBase("/images/logo-mobile.avif")}
                  type="image/avif"
                />
                <Image
                  src={withBase("/images/logo-desktop.avif")}
                  alt="Cargo Flow Africa Transport Group"
                  width={140}
                  height={36}
                  className={styles.logo}
                />
              </picture>
            </Link>

            <p className={styles.tagline}>
              Connecting cargo across 12 African nations in the SADC region.
            </p>

            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <div>
                  <span className={styles.contactLabel}>Contact Person</span>
                  <span className={styles.contactValue}>Fred Otlogetswe</span>
                </div>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <div>
                  <span className={styles.contactLabel}>Phone &amp; WhatsApp</span>
                  <a href="tel:+2673110098" className={styles.contactLink}>+267 311 0098</a>
                  <a href="https://wa.me/26773732442" className={styles.contactLink} target="_blank" rel="noopener noreferrer">WhatsApp: +267 73 732 442</a>
                </div>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
                <div>
                  <span className={styles.contactLabel}>Email</span>
                  <a href="mailto:info@cargoflowafrica.co.za" className={styles.contactLink}>info@cargoflowafrica.co.za</a>
                </div>
              </li>
            </ul>

            <a href={withBase("/profile.pdf")} download className={styles.profileLink}>
              Download Company Profile (PDF)
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8l-8-8z"/>
                <path d="M14 2v8h8"/>
                <path d="M12 19v-8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v8"/>
                <path d="M10 17l2 2 2-2"/>
              </svg>
            </a>
          </div>

          {/* Quick Links */}
          <div className={styles.linkGroup}>
            <h4 className={`font-serif ${styles.linkGroupTitle}`}>Quick Links</h4>
            <nav aria-label="Footer quick links">
              <ul className={styles.linkList}>
                <li><Link href="#about"      className={styles.footerLink}>About Us</Link></li>
                <li><Link href="#services"   className={styles.footerLink}>Our Services</Link></li>
                <li><Link href="#industries" className={styles.footerLink}>Industries</Link></li>
                <li><Link href="#process"    className={styles.footerLink}>Our Process</Link></li>
                <li><Link href="#contact"    className={styles.footerLink}>Contact Us</Link></li>
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div className={styles.linkGroup}>
            <h4 className={`font-serif ${styles.linkGroupTitle}`}>Services</h4>
            <nav aria-label="Footer services links">
              <ul className={styles.linkList}>
                <li><Link href="#services" className={styles.footerLink}>Transport Brokerage</Link></li>
                <li><Link href="#services" className={styles.footerLink}>Bulk Cargo Coordination</Link></li>
                <li><Link href="#services" className={styles.footerLink}>Cross-Border Transport</Link></li>
                <li><Link href="#services" className={styles.footerLink}>Load &amp; Capacity Matching</Link></li>
                <li><Link href="#contact"  className={styles.footerLink}>Get a Quote</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright bar */}
        <div className={styles.copyright}>
          <p>&copy; {year} Cargo Flow Africa Transport Group</p>
          <p>Connecting Businesses to Opportunity</p>
        </div>
      </div>
    </footer>
  );
}
