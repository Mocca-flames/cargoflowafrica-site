import { withBase } from "@/lib/withBase";
import styles from "./AboutDesktop.module.css";

const PILLARS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
        <path d="M15 18H9"/>
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
        <circle className={styles.iconAccent} cx="17" cy="18" r="2"/><circle className={styles.iconAccent} cx="7" cy="18" r="2"/>
      </svg>
    ),
    title: "Greater Access to Capacity",
    description: "We source suitable transport operators through a broader network of fleet owners and commercial transport businesses.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline className={styles.iconAccent} points="16 3 21 3 21 8"/><line x1="4" x2="21" y1="20" y2="3"/>
        <polyline className={styles.iconAccent} points="21 16 21 21 16 21"/><line x1="15" x2="21" y1="15" y2="21"/>
        <line x1="4" x2="9" y1="4" y2="9"/>
      </svg>
    ),
    title: "Flexibility",
    description: "Identify transportation options suited to different cargo types, shipment volumes, vehicle requirements, and specific routes.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/>
        <path className={styles.iconAccent} d="M21 16v2a4 4 0 0 1-4 4h-5"/>
      </svg>
    ),
    title: "Responsive Coordination",
    description: "Receive dedicated support in identifying transport solutions and responding swiftly to changing shipment requirements.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <circle className={styles.iconAccentFill} cx="8.5" cy="10" r="1.1"/>
        <circle className={styles.iconAccentFill} cx="12" cy="10" r="1.1"/>
        <circle className={styles.iconAccentFill} cx="15.5" cy="10" r="1.1"/>
      </svg>
    ),
    title: "Clear Communication",
    description: "We maintain better coordination and transparency between cargo owners, transport operators, and all relevant parties.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path className={styles.iconAccent} d="M2 12h20"/>
      </svg>
    ),
    title: "Regional Connectivity",
    description: "Access potential transport solutions for local and cross-border movements through our extensive, vetting-backed regional network.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m11 17 2 2a1 1 0 0 0 3-3"/>
        <path d="m14 14 2.5 2.5a1 1 0 0 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 0 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
        <path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 0 0 3-3"/>        <path className={styles.iconAccent} d="M3 4h8"/>
      </svg>
    ),
    title: "Professional Partnerships",
    description: "Work with a business that values reliability, transparency, road safety, compliance, and long-term commercial relationships.",
  },
];

export default function AboutDesktop() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading-desktop">
      <div className="container">
        <div className={styles.intro}>
          <span className="section-label">Why Partner With Us</span>
          <h2 id="about-heading-desktop" className={`font-serif ${styles.heading}`}>
            More than a transport connection. <br />
            <span className={styles.headingMuted}>
              A logistics partner focused on making cargo movement simpler.
            </span>
          </h2>
          <p className={styles.body}>
            Our business operates through a network-driven model. Rather than
            depending on a single fleet, we source transportation capacity from a
            broader network of operators, allowing us to respond to different
            cargo volumes, vehicle requirements, and transport routes across the
            continent.
          </p>
          <a
            href={withBase("/profile.pdf")}
            download
            className={`btn btn-outline btn-sm ${styles.profileBtn}`}
          >
            Download Company Profile (PDF)
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8l-8-8z"/>
              <path d="M14 2v8h8"/>
              <path d="M12 19v-8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v8"/>
              <path d="M10 17l2 2 2-2"/>
            </svg>
          </a>
        </div>

        <ul className={styles.grid} role="list">
          {PILLARS.map((pillar) => (
            <li key={pillar.title} className={styles.card}>
              <div className={styles.iconWrap} aria-hidden="true">
                {pillar.icon}
              </div>
              <h3 className={`font-serif ${styles.cardTitle}`}>{pillar.title}</h3>
              <p className={styles.cardBody}>{pillar.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
