import Image from "next/image";
import { withBase } from "@/lib/withBase";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Background glows */}
      <div className={styles.glowRight} aria-hidden="true" />
      <div className={styles.glowLeft}  aria-hidden="true" />

      <div className={`container ${styles.grid}`}>
        {/* ── Text column ── */}
        <div className={styles.text}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            Connecting 12 African nations across the SADC region
          </div>

          <h1 className={`font-serif ${styles.headline}`}>
            Connecting Cargo.{" "}
            <br />
            Moving <em className={styles.accentItalic}>Africa.</em>
          </h1>

          <p className={styles.subheadline}>
            Cargo Flow Africa Transport Group is an African transport brokerage
            and logistics coordination company. We connect businesses, commodity
            traders, and manufacturers with verified transport operators capable
            of meeting their specific cargo requirements.
          </p>

          {/* CTAs */}
          <div className={styles.ctaRow}>
            <Link href="#contact" className={`btn btn-primary btn-lg ${styles.ctaPrimary}`}>
              Get a Transport Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 7h10v10"/>
                <path d="M7 17 17 7"/>
              </svg>
            </Link>
            <Link href="#services" className={`btn btn-secondary btn-lg`}>
              View Our Services
            </Link>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={`font-serif ${styles.statValue}`}>12</div>
              <div className={styles.statLabel}>Countries</div>
            </div>
            <div className={styles.stat}>
              <div className={`font-serif ${styles.statValue}`}>Network</div>
              <div className={styles.statLabel}>Driven Model</div>
            </div>
            <div className={styles.stat}>
              <div className={`font-serif ${styles.statValue}`}>100%</div>
              <div className={styles.statLabel}>Cargo Focus</div>
            </div>
          </div>
        </div>

        {/* ── Image column ── */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrap}>
            <Image
              src={withBase("/images/hero_landing.avif")}
              alt="Truck on an African highway at sunset — Cargo Flow Africa cross-border transport"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className={styles.image}
            />
            <div className={styles.imageOverlay} aria-hidden="true" />

            {/* Status card */}
            <div className={styles.card} aria-label="Live shipment status example">
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <span className={styles.cardDot} aria-hidden="true" />
                  <span className={styles.cardBadgeText}>Cross-Border Transport</span>
                </div>
                <span className={styles.cardStatus}>In Transit</span>
              </div>

              <div className={styles.cardRoute}>
                <div className={styles.cardCity}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cardPinAccent} aria-hidden="true">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className={styles.cardCityName}>Gaborone</span>
                </div>

                <div className={styles.cardProgressTrack} aria-hidden="true">
                  <div className={styles.cardProgressFill} />
                  <div className={styles.cardProgressDot} />
                </div>

                <div className={styles.cardCity}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cardPinMuted} aria-hidden="true">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className={styles.cardCityName}>Johannesburg</span>
                </div>
              </div>

              <p className={styles.cardMeta}>
                Bulk Minerals &bull; Sourced Capacity &bull; Full Documentation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
