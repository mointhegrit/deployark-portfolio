import { Star, Quote } from "lucide-react";
import useMarquee from "../hooks/useMarquee";

// Placeholder quotes for layout demo. Swap with real client reviews once collected.
const REVIEWS = [
  {
    quote:
      "The database used to be someone's part-time job. Now it updates itself every morning and nobody thinks about it. That's the whole point.",
    name: "Amara Osei",
    title: "Operations Lead",
    company: "Northwind Marketing",
    rating: 5,
    initials: "AO",
  },
  {
    quote:
      "We asked for a system, not a slide deck. That's exactly what we got: fixed price, clear timeline, running before the deadline we agreed on.",
    name: "Daniel Reyes",
    title: "Founder",
    company: "Cartwheel Goods",
    rating: 5,
    initials: "DR",
  },
  {
    quote:
      "What stood out was the handover. Everything documented, nothing hidden behind a login only Moin has access to. It's actually ours.",
    name: "Priya Nair",
    title: "Head of Growth",
    company: "Fieldstone Agency",
    rating: 5,
    initials: "PN",
  },
  {
    quote:
      "Every automation ships with an error alert wired in. The first time something broke at 2 AM, we knew before our clients did.",
    name: "Tom Fischer",
    title: "CEO",
    company: "Halden & Co.",
    rating: 5,
    initials: "TF",
  },
  {
    quote:
      "n8n and Claude, exactly as promised. No mystery stack, no vendor lock-in. If Moin walked away tomorrow, our team could still run it.",
    name: "Leah Kimura",
    title: "Marketing Director",
    company: "Orbit Commerce",
    rating: 5,
    initials: "LK",
  },
];

function ReviewCard({ r }) {
  return (
    <div className="testimonial-card shrink-0 w-[380px] bg-grain rounded-sm border border-ink/5 p-8 flex flex-col mr-6">
      <Quote size={22} className="text-ember mb-5" strokeWidth={1.8} />
      <p className="text-ash font-light leading-relaxed flex-1">"{r.quote}"</p>
      <div className="flex gap-1 mt-6 mb-5">
        {Array.from({ length: r.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-ember fill-ember" />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-ash flex items-center justify-center shrink-0">
          <span className="font-display text-paper text-sm">{r.initials}</span>
        </div>
        <div>
          <p className="font-display text-base leading-none">{r.name}</p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-ash/60 mt-1.5">
            {r.title}, {r.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useMarquee(40);
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section className="bg-paper text-ink py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center mb-16">
        <p className="label-mono text-xs mb-4">{"// What clients say"}</p>
        <h2 className="font-display text-4xl md:text-6xl">Real teams, running systems.</h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-paper to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-paper to-transparent z-10" />
        <div ref={trackRef} className="flex w-max pl-6 md:pl-12">
          {doubled.map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
