import { useEffect, useRef } from "react";
import gsap from "gsap";
import TechStack from "./TechStack";

const STATS = [
  ["90", "workflows in production"],
  ["30,000+", "records AI-enriched"],
  ["7", "publish channels, one pipeline"],
  ["12h", "saved weekly, one client"],
];

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".hero-reveal", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 })
        .fromTo(".hero-panel", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6")
        .fromTo(".hero-stat", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, "-=0.5");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative min-h-[100dvh] bg-ink flex flex-col justify-center overflow-hidden"
    >
      <img
        src="/hero-arc.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-32 pb-16 grid lg:grid-cols-[55fr_45fr] gap-14 items-center">
        <div>
          <p className="hero-reveal label-mono text-xs mb-8">{"// Moin Khan — AI Automation"}</p>
          <h1 className="hero-reveal font-display text-paper text-5xl md:text-7xl leading-[1.05] tracking-tight">
            Working <em className="italic">automation</em>,
            <br className="hidden md:block" /> handed over <em className="italic">running</em>.
          </h1>
          <p className="hero-reveal text-dust text-lg md:text-xl font-light mt-8 max-w-md">
            I design and build AI workflow systems for agencies. n8n + Claude Code.
          </p>
          <p className="hero-reveal font-mono text-paper/80 text-xs uppercase tracking-[0.18em] mt-3">
            Systems that ship.
          </p>
          <div className="hero-reveal flex flex-wrap items-center gap-4 mt-10">
            <a
              href="#work"
              className="magnetic-btn relative overflow-hidden rounded-md bg-ember text-paper font-medium px-8 py-4 group"
            >
              <span className="relative z-10">See the work</span>
              <span className="absolute inset-0 bg-ash scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
            </a>
            <a
              href="https://cal.com/mointhegrit/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-lift rounded-md border border-paper/20 text-paper/90 px-8 py-4 hover:border-paper/50 transition-colors"
            >
              Book a call
            </a>
          </div>

          <TechStack className="hero-reveal mt-14" />
        </div>

        {/* Reserved for future hero animation */}
        <div className="hero-panel relative hidden lg:block" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-14">
        <div className="border-t border-paper/10 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(([n, label]) => (
            <div key={label} className="hero-stat">
              <p className="font-display text-paper text-3xl md:text-4xl">{n}</p>
              <p className="font-mono text-dust text-[11px] uppercase tracking-wider mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
