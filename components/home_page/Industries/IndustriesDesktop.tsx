import { INDUSTRIES } from "@/lib/data/industries";
import { withBase } from "@/lib/withBase";
import {
  ARROW_RIGHT,
  BADGE_ICONS,
  CHECK_MARK,
  SECTOR_ICONS,
} from "./icons";
import styles from "./IndustriesDesktop.module.css";

export default function IndustriesDesktop() {
  return (
    <section
      id="industries"
      className={styles.section}
      aria-labelledby="industries-heading-desktop"
    >
      <div className="container">
        <div className={styles.intro}>
          <span className="section-label">Cargo &amp; Industries We Support</span>
          <h2 id="industries-heading-desktop" className={`font-serif ${styles.heading}`}>
            Moving the commodities that drive business.
          </h2>
          <p className={styles.body}>
            Cargo Flow Africa Transport Group supports businesses operating
            across a broad range of commodity and commercial sectors.
          </p>
        </div>

        <ul className={styles.stack} role="list">
          {INDUSTRIES.map((industry, i) => {
            const flipped = i % 2 === 1;
            return (
              <li
                key={industry.id}
                className={`${styles.showcase} ${flipped ? styles.showcaseFlip : ""}`}
              >
                <img
                  className={styles.image}
                  src={withBase(industry.image)}
                  alt={industry.imageAlt}
                  style={{ objectPosition: industry.focal }}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <div className={styles.scrim} aria-hidden="true" />

                {industry.badges.map((badge, b) => (
                  <span
                    key={badge.label}
                    className={`${styles.floatBadge} ${
                      b === 0 ? styles.floatBadgeTop : styles.floatBadgeBottom
                    }`}
                    aria-hidden="true"
                  >
                    <span className={styles.floatBadgeIcon} aria-hidden="true">
                      {BADGE_ICONS[badge.icon]}
                    </span>
                    {badge.label}
                  </span>
                ))}

                <div className={styles.content}>
                  <span className={styles.catBadge}>
                    <span className={styles.catBadgeIcon} aria-hidden="true">
                      {SECTOR_ICONS[industry.icon]}
                    </span>
                    {industry.category}
                  </span>

                  <h3 className={`font-serif ${styles.title}`}>{industry.title}</h3>

                  <p className={styles.narrative}>{industry.narrative}</p>

                  <ul className={styles.stats} role="list">
                    {industry.stats.map((stat) => (
                      <li key={stat} className={styles.stat}>
                        <span className={styles.statIcon} aria-hidden="true">
                          {CHECK_MARK}
                        </span>
                        {stat}
                      </li>
                    ))}
                  </ul>

                  <a
                    className={`btn btn-cta btn-lg ${styles.cta}`}
                    href={industry.cta.href}
                  >
                    {industry.cta.label}
                    <span className={styles.ctaArrow} aria-hidden="true">
                      {ARROW_RIGHT}
                    </span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
