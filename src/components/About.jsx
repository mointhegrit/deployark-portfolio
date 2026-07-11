import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Workflow, Plug, GaugeCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    icon: Workflow,
    title: "AI & Workflow Automation",
    body: "n8n, LLM agents, and structured AI output that replace manual processes end-to-end — with quality gates and error guards built in.",
  },
  {
    icon: Plug,
    title: "Integrations & APIs",
    body: "Custom connectors between Airtable, Slack, Telegram, Gmail, CRMs — any platform with an API, wired into one system.",
  },
  {
    icon: GaugeCircle,
    title: "Process Optimization",
    body: "I map where your team's hours actually go, then design and ship the automation that gives them back.",
  },
];

export default function About() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
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
    <section id="about" ref={rootRef} className="bg-paper text-ink px-6 md:px-12 py-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="about-reveal label-mono text-xs mb-4">{"// The practitioner"}</p>
          <h2 className="about-reveal font-display text-4xl md:text-6xl mb-4">
            Meet the builder behind these systems.
          </h2>
          <p className="about-reveal text-ash font-light text-lg">
            Not an automation consultant. An engineer who ships.
          </p>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-12 items-start mb-16">
          <div className="about-reveal flex justify-center lg:justify-start">
            <img
              src="/headshot.jpg"
              alt="Moin Khan — AI Automation Specialist"
              className="w-64 h-64 md:w-72 md:h-72 rounded-full border border-ink/10 shadow-lg object-cover"
            />
          </div>
          <div>
            <h3 className="about-reveal font-display text-3xl md:text-4xl">
              Hi, I'm Moin Khan.
            </h3>
            <p className="about-reveal label-mono text-[11px] mt-3 mb-8">
              {"// AI Automation Specialist · DeployArk"}
            </p>
            <p className="about-reveal text-ash font-light text-lg leading-relaxed max-w-2xl">
              I build AI automation systems for marketing agencies — journalist
              databases that maintain themselves, content pipelines that publish to seven
              channels at once, agents your team talks to in Slack. Fixed price, defined
              scope, delivered running.
            </p>
            <p className="about-reveal text-ash font-light text-lg leading-relaxed max-w-2xl mt-5">
              Most automation consultants deliver decks and roadmaps. I'm one senior
              practitioner who ships working systems and hands them over documented — no
              juniors, no retainers, no black boxes.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="about-reveal bg-grain rounded-sm p-8 border border-ink/5">
              <c.icon size={22} className="text-ember mb-4" strokeWidth={1.8} />
              <h4 className="font-display text-xl mb-3">{c.title}</h4>
              <p className="text-ash font-light leading-relaxed text-sm">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
