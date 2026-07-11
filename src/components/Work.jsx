import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import ArkMark from "./ArkMark";
import PROJECTS from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

function WorkRow({ project: p, index: i }) {
  return (
    <article
      className={`work-row grid lg:grid-cols-2 gap-10 items-center ${
        i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Link
        to={`/work/${p.slug}`}
        className="block rounded-sm border border-paper/10 bg-ash/30 p-2 transition-colors hover:border-paper/30"
      >
        <div className="overflow-hidden rounded-none aspect-[16/9]">
          {p.image ? (
            <img
              src={p.image}
              alt={`${p.title} — n8n workflow canvas`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              style={{ objectPosition: "50% 30%" }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-ink">
              <ArkMark size={56} arc="#FAFAF9" strokeWidth={3} />
              <span className="label-mono text-[10px]">{"// Architecture & build spec"}</span>
            </div>
          )}
        </div>
      </Link>
      <div className={i % 2 === 1 ? "lg:pr-8" : "lg:pl-8"}>
        <p className="label-mono text-[10px] mb-4">{p.label}</p>
        <h3 className="font-display text-paper text-3xl md:text-4xl mb-5">
          <Link to={`/work/${p.slug}`} className="hover:text-paper/80 transition-colors">
            {p.title}
          </Link>
        </h3>
        <p className="text-dust font-light leading-relaxed max-w-lg">{p.summary}</p>
        <ul className="flex flex-wrap gap-2 mt-6">
          {p.tags.slice(0, 5).map((t) => (
            <li
              key={t}
              className="font-mono text-[10px] uppercase tracking-wider text-paper/60 border border-paper/15 rounded-sm px-3 py-1.5"
            >
              {t}
            </li>
          ))}
        </ul>
        <Link
          to={`/work/${p.slug}`}
          className="hover-lift inline-flex items-center gap-1.5 text-ember text-sm font-medium mt-7"
        >
          Read the case study <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}

export default function Work() {
  const rootRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  const featured = PROJECTS.filter((p) => p.featured);
  const more = PROJECTS.filter((p) => !p.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".work-row").forEach((row) => {
        gsap.fromTo(
          row,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%" },
          }
        );
      });
      ScrollTrigger.refresh();
    }, rootRef);
    return () => ctx.revert();
  }, [showAll]);

  return (
    <section id="work" ref={rootRef} className="bg-ink px-6 md:px-12 py-28">
      <div className="max-w-7xl mx-auto">
        <p className="label-mono text-xs mb-4">{"// Selected work"}</p>
        <h2 className="font-display text-paper text-4xl md:text-6xl max-w-3xl mb-20">
          Systems running in production. Not mockups.
        </h2>

        <div className="space-y-24">
          {featured.map((p, i) => (
            <WorkRow key={p.slug} project={p} index={i} />
          ))}
          {showAll &&
            more.map((p, i) => (
              <WorkRow key={p.slug} project={p} index={featured.length + i} />
            ))}
        </div>

        <div className="flex justify-center mt-20">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="magnetic-btn inline-flex items-center gap-2 rounded-md border border-paper/20 text-paper/90 px-8 py-4 hover:border-paper/50 transition-colors"
          >
            {showAll ? (
              <>
                <Minus size={16} /> Show less
              </>
            ) : (
              <>
                <Plus size={16} /> Show more builds ({more.length})
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
