import styles from "./Network.module.css";

const COUNTRIES = [
  "Botswana", "South Africa", "Zimbabwe", "Zambia",
  "Namibia", "Mozambique", "Eswatini", "Lesotho",
  "Malawi", "Tanzania", "DR Congo", "Angola",
];

const VETTING_STANDARDS = [
  "Suitable vehicle capacity and route capability verification.",
  "Appropriate operating licences and documentation checks.",
  "Relevant insurance and strict regulatory compliance.",
  "Professional conduct and dependable communication standards.",
  "Absolute commitment to cargo and road safety across all routes.",
];

export default function Network() {
  return (
    <section className={styles.section} aria-labelledby="network-heading">
      <div className="container">
        <div className={styles.intro}>
          <span className="section-label">Our Network</span>
          <h2 id="network-heading" className={`font-serif ${styles.heading}`}>
            Connecting transport capacity across Africa.
          </h2>
          <p className={styles.body}>
            A broader network creates greater possibilities. We maintain
            relationships with fleet owners, independent transporters, regional
            operators, and specialist transportation businesses across the
            continent.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardGrid}>
            {/* Countries */}
            <div>
              <h3 className={`font-serif ${styles.cardTitle}`}>
                Our Regional Connectivity
              </h3>
              <p className={styles.cardBody}>
                We proudly facilitate routes spanning these core African nations:
              </p>
              <ul className={styles.countryGrid} aria-label="Countries we serve">
                {COUNTRIES.map((country) => (
                  <li key={country} className={styles.countryItem}>
                    <span className={styles.countryDot} aria-hidden="true" />
                    <span className={styles.countryName}>{country}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vetting standards */}
            <div className={styles.vettingCard}>
              <h3 className={`font-serif ${styles.vettingTitle}`}>
                Our Vetting Standards
              </h3>
              <ul className={styles.vettingList} aria-label="Operator vetting standards">
                {VETTING_STANDARDS.map((standard) => (
                  <li key={standard} className={styles.vettingItem}>
                    <svg
                      width="20" height="20"
                      viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"
                      className={styles.vettingIcon}
                      aria-hidden="true"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                    <span className={styles.vettingText}>{standard}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
