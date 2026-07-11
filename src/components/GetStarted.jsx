import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function GetStarted() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={rootRef} className="bg-ink px-6 md:px-12 py-32">
      <div className="max-w-4xl mx-auto text-center bg-ash/40 border border-paper/10 text-paper rounded-sm px-8 md:px-16 py-20">
        <p className="cta-reveal label-mono text-xs mb-6">{"// Book a call"}</p>
        <h2 className="cta-reveal font-display text-3xl md:text-5xl mb-6 leading-tight">
          Tell me what eats
          <br />
          your team's <em className="italic">hours</em>.
        </h2>
        <p className="cta-reveal text-dust font-light max-w-lg mx-auto mb-10">
          I'll tell you if automation fixes it, what it costs, and when it ships.
          That's the whole call.
        </p>
        <a
          href="https://cal.com/mointhegrit/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-reveal magnetic-btn inline-flex items-center gap-2 relative overflow-hidden rounded-md bg-ember text-paper font-medium px-8 py-4 group"
        >
          <span className="relative z-10 flex items-center gap-2">
            Book a call <ArrowUpRight size={18} />
          </span>
          <span className="absolute inset-0 bg-ash scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
        </a>
        <p className="cta-reveal text-dust font-light text-sm mt-6">
          Or email{" "}
          <a href="mailto:hello@deployark.com" className="underline hover:text-paper">
            hello@deployark.com
          </a>
        </p>
      </div>
    </section>
  );
}
