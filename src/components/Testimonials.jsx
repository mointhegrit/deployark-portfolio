import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Placeholder quotes for layout demo. Swap with real client reviews once collected.
const REVIEWS = [
  {
    quote:
      "The database used to be someone's part-time job. Now it updates itself every morning and nobody thinks about it. That's the whole point.",
    name: "Operations Lead",
    role: "Marketing Agency",
    rating: 5,
  },
  {
    quote:
      "We asked for a system, not a slide deck. That's exactly what we got: fixed price, clear timeline, running before the deadline we agreed on.",
    name: "Founder",
    role: "E-commerce Brand",
    rating: 5,
  },
  {
    quote:
      "What stood out was the handover. Everything documented, nothing hidden behind a login only Moin has access to. It's actually ours.",
    name: "Head of Growth",
    role: "Marketing Agency",
    rating: 5,
  },
];

export default function Testimonials() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-paper text-ink px-6 md:px-12 py-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="label-mono text-xs mb-4">{"// What clients say"}</p>
          <h2 className="font-display text-4xl md:text-6xl">Real teams, running systems.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="testimonial-card bg-grain rounded-sm border border-ink/5 p-8 flex flex-col"
            >
              <Quote size={22} className="text-ember mb-5" strokeWidth={1.8} />
              <p className="text-ash font-light leading-relaxed flex-1">"{r.quote}"</p>
              <div className="flex gap-1 mt-6 mb-4">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-ember fill-ember" />
                ))}
              </div>
              <p className="font-display text-lg">{r.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-ash/60 mt-1">
                {r.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
