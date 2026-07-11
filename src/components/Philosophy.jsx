import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".phil-line",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-ash text-paper py-36 px-6 md:px-16 overflow-hidden "
    >
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="phil-line text-dust text-lg md:text-xl font-light mb-6">
          Most automation consultants deliver: decks, roadmaps, retainers.
        </p>
        <p className="phil-line font-display text-4xl md:text-6xl leading-tight">
          We deliver <em className="italic">running systems</em>.
        </p>
        <p className="phil-line font-mono text-[11px] uppercase tracking-[0.18em] text-dust mt-10">
          n8n and Claude. That is the stack. Boring, and it works.
        </p>
      </div>
    </section>
  );
}
