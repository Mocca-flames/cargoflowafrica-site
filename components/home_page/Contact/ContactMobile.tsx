import styles from "./ContactMobile.module.css";

export default function ContactMobile() {
  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-heading-mobile"
    >
      <div className="container">
        <div className={styles.intro}>
          <h2 id="contact-heading-mobile" className={`font-serif ${styles.heading}`}>
            Let&apos;s keep your cargo{" "}
            <em className={styles.accentItalic}>moving.</em>
          </h2>
          <p className={styles.body}>
            Contact our regional dispatch offices directly for quotes, capacity, and corridor inquiries.
          </p>
        </div>

        <div className={styles.mobileStack}>
          {/* Botswana Office */}
          <div className={styles.officeCard}>
            <div className={styles.officeHeader}>
              <span className={styles.officeBadge}>Botswana</span>
              <h4 className={styles.officeName}>Gaborone Office</h4>
            </div>

            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <div className={styles.contactIconWrap} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Physical Office</span>
                  <address className={styles.address}>
                    Office Suite Eh Nol, Eland House,<br />
                    Gaborone West Industrial, Botswana
                  </address>
                </div>
              </li>

              <li className={styles.contactItem}>
                <div className={styles.contactIconWrap} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Call or WhatsApp</span>
                  <a href="tel:+26778717146" className={styles.contactLink}>+267 787 171 46</a>
                  <a href="https://wa.me/26778717146" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                    WhatsApp Message
                  </a>
                </div>
              </li>

              <li className={styles.contactItem}>
                <div className={styles.contactIconWrap} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Email Address</span>
                  <a href="mailto:info@cargoflowafrica.co.bw" className={styles.contactLink}>
                    info@cargoflowafrica.co.bw
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* South Africa Office */}
          <div className={styles.officeCard}>
            <div className={styles.officeHeader}>
              <span className={styles.officeBadge}>South Africa</span>
              <h4 className={styles.officeName}>Midrand Office</h4>
            </div>

            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <div className={styles.contactIconWrap} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Physical Office</span>
                  <address className={styles.address}>
                    191 Bekker Road, Midrand
                  </address>
                </div>
              </li>

              <li className={styles.contactItem}>
                <div className={styles.contactIconWrap} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Call or WhatsApp</span>
                  <a href="tel:+27817584591" className={styles.contactLink}>+27 81 758 4591</a>
                  <a href="https://wa.me/27817584591" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                    WhatsApp Message
                  </a>
                </div>
              </li>

              <li className={styles.contactItem}>
                <div className={styles.contactIconWrap} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Email Address</span>
                  <a href="mailto:info@cargoflowafrica.co.za" className={styles.contactLink}>
                    info@cargoflowafrica.co.za
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Consultation CTA */}
          <div className={styles.ctaCard}>
            <div className={styles.grain} aria-hidden="true" />
            <div className={styles.ctaInner}>
              <h3 className={`font-serif ${styles.ctaTitle}`}>
                Request a Consultation
              </h3>
              <p className={styles.ctaBody}>
                Provide us with your cargo requirements and transport needs. Our team will identify the optimal capacity and corridor solutions.
              </p>
              <a
                href="mailto:info@cargoflowafrica.co.za?subject=Transport%20Coordination%20Enquiry"
                className={`btn ${styles.ctaBtn}`}
              >
                Send an Enquiry
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
