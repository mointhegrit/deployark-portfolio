import { useEffect, useState } from "react";
import ArkMark from "./ArkMark";
import SocialLinks from "./SocialLinks";

const LINKS = ["Work", "Process", "About"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl rounded-md px-5 md:px-6 py-3 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "bg-ink/70 backdrop-blur-xl border border-paper/10 shadow-lg"
          : "bg-transparent border border-transparent"
      }`}
    >
      <a href="/#top" className="flex items-center gap-2.5">
        <ArkMark size={30} arc="#FAFAF9" strokeWidth={4} />
        <span className="flex flex-col leading-none">
          <span className="font-display text-paper text-lg tracking-tight">DeployArk</span>
          <span className="label-mono text-[8px] hidden md:block mt-1">
            {"// Moin Khan"}
          </span>
        </span>
      </a>
      <div className="hidden md:flex items-center gap-8 text-sm text-paper/80">
        {LINKS.map((l) => (
          <a
            key={l}
            href={`/#${l.toLowerCase()}`}
            className="hover-lift hover:text-paper"
          >
            {l}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-5">
        <SocialLinks size={17} className="hidden sm:flex" />
        <a
          href="https://cal.com/mointhegrit/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-btn relative overflow-hidden rounded-md bg-ember text-paper text-sm font-medium px-5 py-2 group"
        >
          <span className="relative z-10">Book a call</span>
          <span className="absolute inset-0 bg-ash scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
        </a>
      </div>
    </nav>
  );
}
