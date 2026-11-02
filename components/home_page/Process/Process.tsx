import { PROCESS_STEPS } from "@/lib/data/process-steps";
import styles from "./Process.module.css";

const ICONS: Record<string, React.ReactNode> = {
  "file-text": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 2h-5a2 2 0 0 0-2 2v1h4a1 1 0 0 1 0 2h-2a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1h3a1 1 0 0 1 0 2h-2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V4a1 1 0 0 0-1-1z"/>
    </svg>
  ),
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  handshake: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m11 17 2 2a1 1 0 0 0 3-3"/>
      <path d="m14 14 2.5 2.5a1 1 0 0 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 0 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
      <path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 0 0 3-3"/><path d="M3 4h8"/>
    </svg>
  ),
  truck: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
      <path d="M15 18H9"/>
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
      <circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>
    </svg>
  ),
  "check-circle": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
};

export default function Process() {
  return (
    <section
      id="process"
      className={styles.section}
      aria-labelledby="process-heading"
    >
      {/* Grain overlay */}
      <div className={styles.grain} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* Intro (sticky on desktop) */}
        <div className={styles.intro}>
          <span className={`section-label ${styles.accentLabel}`}>
            From Requirement to Delivery
          </span>
          <h2 id="process-heading" className={`font-serif ${styles.heading}`}>
            A straightforward process designed to keep your business moving.
          </h2>
          <p className={styles.body}>
            We coordinate the connection between cargo owners and transport
            operators through five key stages, ensuring transparency and
            accountability.
          </p>
        </div>

        {/* Steps list */}
        <ol className={styles.steps} aria-label="Our 5-step process">
          {PROCESS_STEPS.map((step) => (
            <li key={step.number} className={styles.step}>
              <span className={`font-mono ${styles.stepNumber}`}>{step.number}</span>
              <div className={styles.stepContent}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepIconWrap} aria-hidden="true">
                    {ICONS[step.icon]}
                  </div>
                  <h3 className={`font-serif ${styles.stepTitle}`}>{step.title}</h3>
                </div>
                <p className={styles.stepBody}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
