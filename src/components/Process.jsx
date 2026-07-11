import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "Scope",
    desc: "One call. You describe what eats your team's hours; I tell you if automation fixes it, what it costs, and when it ships. Fixed price, defined scope, agreed before any work starts.",
  },
  {
    n: "02",
    title: "Build",
    desc: "n8n and Claude. That is the stack. Boring, and it works. Every workflow ships with quality gates, error guards, and an audit trail. No black boxes.",
  },
  {
    n: "03",
    title: "Handover",
    desc: "The system lands in your instance, documented and running. Your team owns it from day one. No retainer required to keep the lights on.",
  },
];

function ArcMotif() {
  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40 protocol-spin">
      {[0, 1].map((s) => (
        <g key={s} transform={`rotate(${s * 180} 100 100)`}>
          {Array.from({ length: 10 }).map((_, i) => (
            <circle
              key={i}
              cx={100 + Math.sin(i * 0.6) * 60}
              cy={20 + i * 17}
              r="4"
              fill="#C47B3A"
              opacity={0.4 + i * 0.06}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

function ScanGrid() {
  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40">
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 6 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={20 + c * 32} cy={20 + r * 32} r="3" fill="#C47B3A" opacity="0.3" />
        ))
      )}
      <rect x="0" y="0" width="200" height="4" fill="#C47B3A" className="protocol-scan" />
    </svg>
  );
}

function Waveform() {
  return (
    <svg viewBox="0 0 200 100" className="w-40 h-40">
      <path
        d="M0 50 L50 50 L60 20 L70 80 L80 50 L130 50 L140 30 L150 70 L160 50 L200 50"
        fill="none"
        stroke="#C47B3A"
        strokeWidth="2.5"
        className="protocol-wave"
      />
    </svg>
  );
}

const ICONS = [ArcMotif, ScanGrid, Waveform];

export default function Process() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".protocol-card");
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: cards[i + 1],
            start: "top top",
            end: "bottom top",
            onEnter: () =>
              gsap.to(card, { scale: 0.9, filter: "blur(20px)", opacity: 0.5, duration: 0.5, ease: "power2.inOut" }),
            onLeaveBack: () =>
              gsap.to(card, { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.5, ease: "power2.inOut" }),
          });
        }
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: i === cards.length - 1,
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={rootRef} className="relative">
      {STEPS.map((step, i) => {
        const Icon = ICONS[i];
        return (
          <div
            key={step.n}
            className="protocol-card h-screen w-full flex items-center justify-center bg-ink text-paper px-6"
          >
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="label-mono text-sm">{step.n}</span>
                <h3 className="font-display text-4xl md:text-6xl mt-4 mb-6">{step.title}</h3>
                <p className="text-dust font-light text-lg leading-relaxed max-w-md">{step.desc}</p>
              </div>
              <div className="flex justify-center">
                <Icon />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
