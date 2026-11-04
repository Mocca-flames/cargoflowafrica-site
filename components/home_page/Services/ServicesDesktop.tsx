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

export { SERVICES as services };

export default function ServicesDesktop() {
  const root = useRef<HTMLElement>(null);
  const count = SERVICES.length;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const track = el.querySelector<HTMLElement>(".services-track");
      if (!track) return;

      const panels = q(".services-panel");
      const images = q(".services-image");
      const railDots = q(".services-rail__dot");
      const fill = el.querySelector<HTMLElement>(".services-rail__fill");

      let current = -1;
      const activate = (i: number) => {
        if (i === current) return;
        current = i;

        panels.forEach((p, k) => {
          const active = k === i;
          p.classList.toggle("is-active", active);
          p.classList.toggle("is-past", k < i);
          p.classList.toggle("is-future", k > i);
          p.setAttribute("aria-hidden", String(!active));
        });

        images.forEach((m, k) => {
          m.classList.toggle("is-active", k === i);
          m.classList.toggle("is-past", k < i);
          m.classList.toggle("is-future", k > i);
        });

        railDots.forEach((d, k) => {
          d.classList.toggle("is-active", k === i);
          d.classList.toggle("is-past", k < i);
        });

        if (fill) {
          const pct = count > 1 ? (i / (count - 1)) * 100 : 0;
          fill.style.setProperty("--rail-p", String(pct / 100));
        }
      };
      activate(0);

      const st = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) =>
          activate(Math.min(count - 1, Math.floor(self.progress * count))),
      });

      const onDot = (i: number) => () => {
        const y = st.start + ((i + 0.5) / count) * (st.end - st.start);
        window.scrollTo({ top: y, behavior: "smooth" });
      };
      const handlers = railDots.map((d, i) => {
        const h = onDot(i);
        d.addEventListener("click", h);
        return h;
      });

      return () => {
        railDots.forEach((d, i) => {
          d.removeEventListener("click", handlers[i]);
        });
        st.kill();
      };
    },
    { scope: root, dependencies: [count] }
  );

  return (
    <section id="services" ref={root} className="services services--desktop" aria-label="Our Services">
      <div className="services-track" style={{ height: `calc(${count} * 100svh)` }}>
        <div className="services-sticky">
          <div className="services-rail">
            <div className="services-rail__track" aria-hidden="true" />
            <div className="services-rail__fill" aria-hidden="true" />
            <ol className="services-rail__dots">
              {SERVICES.map((s, i) => (
                <li key={s.id}>
                  <button
                    className="services-rail__dot"
                    aria-label={`Service ${i + 1}: ${s.title}`}
                  />
                </li>
              ))}
            </ol>
          </div>

          <div className="services-panels">
            {SERVICES.map((s, i) => (
              <article
                key={s.id}
                className="services-panel"
                aria-hidden={i !== 0 ? "true" : "false"}
              >
                <span className="services-panel__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="services-panel__title">{s.title}</h3>
                <p className="services-panel__body">{s.body}</p>
              </article>
            ))}
          </div>

          <div className="services-images" aria-hidden="true">
            {SERVICES.map((s, i) => (
              <div key={s.id} className="services-image">
                <picture>
                  <source
                    media="(min-width: 1025px)"
                    srcSet={withBase(`/images/services/s${i + 1}_desktop.avif`)}
                  />
                  <source
                    srcSet={withBase(`/images/services/s${i + 1}_mobile.avif`)}
                  />
                  <img
                    src={withBase(`/images/services/s${i + 1}.webp`)}
                    alt={s.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
