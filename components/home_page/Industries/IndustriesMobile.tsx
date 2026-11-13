import { INDUSTRIES } from "@/lib/data/industries";
import { withBase } from "@/lib/withBase";
import {
  ARROW_RIGHT,
  BADGE_ICONS,
  CHECK_MARK,
  SECTOR_ICONS,
} from "./icons";
import styles from "./IndustriesMobile.module.css";

export default function IndustriesMobile() {
  return (
    <section
      id="industries"
      className={styles.section}
      aria-labelledby="industries-heading-mobile"
    >
      <div className="container">
        <div className={styles.intro}>
          <span className="section-label">Cargo &amp; Industries We Support</span>
          <h2 id="industries-heading-mobile" className={`font-serif ${styles.heading}`}>
            Moving the commodities that drive business.
          </h2>
          <p className={styles.body}>
            Supporting businesses operating across key commercial sectors in
            Southern and Central Africa.
          </p>
        </div>

        <ul className={styles.stack} role="list">
          {INDUSTRIES.map((industry, i) => (
            <li key={industry.id} className={styles.showcase}>
              <img
                className={styles.image}
                src={withBase(industry.image)}
                alt={industry.imageAlt}
                style={{ objectPosition: industry.focal }}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className={styles.scrim} aria-hidden="true" />

              <span className={styles.floatBadge} aria-hidden="true">
                <span className={styles.floatBadgeIcon} aria-hidden="true">
                  {BADGE_ICONS[industry.badges[0].icon]}
                </span>
                {industry.badges[0].label}
              </span>

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
                  {industry.stats.slice(0, 2).map((stat) => (
                    <li key={stat} className={styles.stat}>
                      <span className={styles.statIcon} aria-hidden="true">
                        {CHECK_MARK}
                      </span>
                      {stat}
                    </li>
                  ))}
                </ul>

                <a
                  className={`btn btn-cta ${styles.cta}`}
                  href={industry.cta.href}
                >
                  {industry.cta.label}
                  <span className={styles.ctaArrow} aria-hidden="true">
                    {ARROW_RIGHT}
                  </span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
