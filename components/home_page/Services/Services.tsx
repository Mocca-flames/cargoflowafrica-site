import { SERVICES } from "@/lib/data/services";
import styles from "./Services.module.css";

// Icon map — inline SVGs keyed by icon name
const ICONS: Record<string, React.ReactNode> = {
  search: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  boxes: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/>
      <path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/>
      <path d="M12 13.5V8L7 5l-4.03 2.42A2 2 0 0 0 2 9.13v3.24a2 2 0 0 0 .97 1.71l3 1.8 5-3Z"/>
      <path d="m7 10.5-4.74-2.85"/><path d="m7 10.5 5-3"/><path d="M7 10.5v5.17"/>
      <path d="M21.03 12.92A2 2 0 0 1 22 14.63v3.24a2 2 0 0 1-.97 1.71l-3 1.8a2 2 0 0 1-2.06 0L12 19v-5.5l5-3 4.03 2.42Z"/>
      <path d="m17 16.5 4.74-2.85"/><path d="m17 16.5-5-3"/><path d="M17 16.5v5.17"/>
    </svg>
  ),
  map: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/>
    </svg>
  ),
  settings: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  radio: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.9 19.1C3.1 17.3 2 14.8 2 12s1.1-5.3 2.9-7.1"/>
      <path d="M8.3 15.7c-1-1-1.6-2.4-1.6-3.7s.6-2.7 1.6-3.7"/>
      <circle cx="12" cy="12" r="2"/>
      <path d="M15.7 15.7c1-1 1.6-2.4 1.6-3.7s-.6-2.7-1.6-3.7"/>
      <path d="M19.1 19.1c1.8-1.8 2.9-4.3 2.9-7.1s-1.1-5.3-2.9-7.1"/>
    </svg>
  ),
  "file-signature": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 19.5v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5.5"/>
      <path d="m8 11.5 5 5L22 4"/><path d="M8 17h.01"/>
    </svg>
  ),
};

export default function Services() {
  return (
    <section
      id="services"
      className={styles.section}
      aria-labelledby="services-heading"
    >
      <div className="container">
        <div className={styles.intro}>
          <span className="section-label">Our Services</span>
          <h2 id="services-heading" className={`font-serif ${styles.heading}`}>
            Transport solutions built around your cargo.
          </h2>
          <p className={styles.body}>
            Cargo Flow Africa Transport Group provides transport brokerage and
            logistics coordination services designed to connect your specific
            cargo requirements with suitable transportation capacity.
          </p>
        </div>

        <ul className={styles.grid} role="list">
          {SERVICES.map((service) => (
            <li key={service.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={`font-mono ${styles.cardNumber}`}>{service.number}</span>
                <span className={styles.cardIcon} aria-hidden="true">
                  {ICONS[service.icon]}
                </span>
              </div>
              <h3 className={`font-serif ${styles.cardTitle}`}>{service.title}</h3>
              <p className={styles.cardBody}>{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
