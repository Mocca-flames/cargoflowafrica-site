import Image from "next/image";
import { withBase } from "@/lib/withBase";
import Link from "next/link";
import styles from "./HeroMobile.module.css";

export default function HeroMobile() {
  return (
    <section className={styles.hero} aria-label="Hero">
        {/* Full-bleed 9:16 background image */}
        <div className={styles.bgImageWrap}>
          <Image
            src={withBase("/images/hero_landing.avif")}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.bgImage}
            role="presentation"
          />
          <div className={styles.bgGradient} aria-hidden="true" />
        </div>

        <div className={`container ${styles.content}`}>
          

          <h1 className={`font-serif ${styles.headline}`}>
            Connecting Cargo. <br />
            Moving <em className={styles.accentItalic}>Africa.</em>
          </h1>

          <p className={styles.subheadline}>
            Cargo Flow Africa Transport Group connects commercial traders, mining
            shippers, and manufacturers with verified regional transport capacity.
          </p>

          

          <div className={styles.statsRibbon}>
            <div className={styles.statItem}>
              <div className={`font-serif ${styles.statValue}`}>12</div>
              <div className={styles.statLabel}>Countries</div>
            </div>
            <div className={styles.statItem}>
              <div className={`font-serif ${styles.statValue}`}>Network</div>
              <div className={styles.statLabel}>Capacity</div>
            </div>
            <div className={styles.statItem}>
              <div className={`font-serif ${styles.statValue}`}>100%</div>
              <div className={styles.statLabel}>Cargo Focus</div>
            </div>
          </div>

          <div className={styles.ctaStack}>
            <Link
              href="#contact"
              className={styles.ctaBtnPrimary}
            >
              Request Quote
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ marginLeft: "0.5rem" }}
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>
            <Link
              href="#services"
              className={styles.ghostBtn}
            >
              Current Loads
            </Link>
          </div>
        </div>
      </section>
  );
}
