import { useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import gsap from "gsap";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject } from "../data/projects";

function Section({ label, title, children }) {
  return (
    <div className="cs-reveal mb-14">
      <p className="label-mono text-[10px] mb-3">{label}</p>
      <h2 className="font-display text-paper text-2xl md:text-3xl mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cs-reveal",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  return (
    <main ref={rootRef} className="bg-ink min-h-screen px-6 md:px-12 pt-32 pb-24">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="cs-reveal hover-lift inline-flex items-center gap-2 text-dust text-sm mb-12 hover:text-paper transition-colors"
        >
          <ArrowLeft size={16} /> All work
        </Link>

        <p className="cs-reveal label-mono text-xs mb-5">{project.label}</p>
        <h1 className="cs-reveal font-display text-paper text-4xl md:text-6xl leading-tight mb-8">
          {project.title}
        </h1>

        <ul className="cs-reveal flex flex-wrap gap-2 mb-14">
          {project.tags.map((t) => (
            <li
              key={t}
              className="font-mono text-[10px] uppercase tracking-wider text-paper/60 border border-paper/15 rounded-sm px-3 py-1.5"
            >
              {t}
            </li>
          ))}
        </ul>

        {project.image && (
          <div className="cs-reveal rounded-sm border border-paper/10 bg-ash/30 p-2 mb-16">
            <img
              src={project.image}
              alt={`${project.title} — n8n workflow canvas`}
              className="w-full rounded-none"
            />
          </div>
        )}

        <Section label="// 01" title="The problem">
          <p className="text-dust font-light text-lg leading-relaxed">{project.problem}</p>
        </Section>

        <Section label="// 02" title="The system">
          <p className="text-dust font-light text-lg leading-relaxed">{project.solution}</p>
        </Section>

        <Section label="// 03" title="What it does, step by step">
          <ol className="space-y-4 mt-6">
            {project.steps.map((step, i) => (
              <li key={i} className="flex gap-5 items-start">
                <span className="font-mono text-ember text-xs pt-1 w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-dust font-light leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section label="// 04" title="The outcome">
          <p className="text-dust font-light text-lg leading-relaxed">{project.outcome}</p>
        </Section>

        <div className="cs-reveal border-t border-paper/10 pt-12 mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-paper font-light text-lg max-w-sm">
            Want a system like this running in your business?
          </p>
          <a
            href="https://cal.com/mointhegrit/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn inline-flex items-center gap-2 relative overflow-hidden rounded-md bg-ember text-paper font-medium px-7 py-3.5 group shrink-0"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book a call <ArrowUpRight size={17} />
            </span>
            <span className="absolute inset-0 bg-ash scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
          </a>
        </div>
      </div>
    </main>
  );
}
