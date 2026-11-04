import { INDUSTRIES } from "@/lib/data/industries";
import styles from "./IndustriesMobile.module.css";

const ICONS: Record<string, React.ReactNode> = {
  gem: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="6 3 18 3 22 9 12 22 2 9"/>
      <polygon points="12 22 12 9 6 3"/><polygon points="12 22 12 9 18 3"/>
      <line x1="2" x2="22" y1="9" y2="9"/>
    </svg>
  ),
  sprout: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/>
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/>
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>
    </svg>
  ),
  "hard-hat": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/>
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/>
      <path d="M4 15v-3a6 6 0 0 1 6-6h0"/><path d="M14 6h0a6 6 0 0 1 6 6v3"/>
    </svg>
  ),
  factory: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
      <path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>
    </svg>
  ),
  package: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m7.5 4.27 9 5.15"/>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/>
      <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
    </svg>
  ),
  "train-front": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/>
      <path d="m9 15-1-1"/><path d="m15 15 1-1"/>
      <path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"/>
      <path d="m8 19-2 3"/><path d="m16 19 2 3"/>
    </svg>
  ),
};

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
          {INDUSTRIES.map((industry) => (
            <li key={industry.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrap} aria-hidden="true">
                  {ICONS[industry.icon]}
                </div>
                <h3 className={`font-serif ${styles.cardTitle}`}>{industry.title}</h3>
              </div>
              <p className={styles.cardBody}>{industry.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
