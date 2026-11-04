"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { withBase } from "@/lib/withBase";
import { SERVICES } from "@/lib/data/services";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ServicesMobile() {
  const root = useRef<HTMLElement>(null);
  const count = SERVICES.length;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const panels = q(".services-panel");
      const images = q(".services-image");

      let current = -1;
      const activate = (i: number) => {
        if (i === current) return;
        current = i;
        panels.forEach((p, k) => p.classList.toggle("is-active", k === i));
        images.forEach((m, k) => m.classList.toggle("is-active", k === i));
      };
      activate(0);

      const triggers = panels.map((panel, i) =>
        ScrollTrigger.create({
          trigger: panel,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && activate(i),
        })
      );

      return () => {
        triggers.forEach((st) => st.kill());
      };
    },
    { scope: root, dependencies: [count] }
  );

  return (
    <section id="services" ref={root} className="services services--mobile" aria-label="Our Services">
      <div className="services-track">
        <div className="services-sticky">
          <div className="services-images" aria-hidden="true">
            {SERVICES.map((s, i) => (
              <div key={s.id} className="services-image">
                <picture>
                  <source
                    media="(max-width: 1024px)"
                    srcSet={withBase(`/images/services/s${i + 1}_mobile.avif`)}
                  />
                  <img
                    src={withBase(`/images/services/s${i + 1}_desktop.avif`)}
                    alt={s.title}
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </picture>
              </div>
            ))}
          </div>

          <div className="services-panels">
            {SERVICES.map((s, i) => (
              <article key={s.id} className="services-panel">
                <span className="services-panel__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="services-panel__title">{s.title}</h3>
                <p className="services-panel__body">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
