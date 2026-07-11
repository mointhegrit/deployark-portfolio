import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Clock,
  TrendingDown,
  Zap,
  ShieldCheck,
  LineChart,
  Layers,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  {
    icon: Clock,
    title: "Hours back, every week",
    body: "Industry studies put it at 10–15 hours per employee, per week, lost to repetitive manual work. Automation returns those hours to work that needs a human.",
  },
  {
    icon: TrendingDown,
    title: "Lower operating cost",
    body: "Companies running process automation report 20–35% lower operational costs. Same workload, fewer hours burned on it.",
  },
  {
    icon: Zap,
    title: "Faster response",
    body: "A system answers in seconds: the follow-up email, the data lookup, the alert. Customers and journalists don't wait for someone to get to the inbox.",
  },
  {
    icon: ShieldCheck,
    title: "Fewer human errors",
    body: "Typos, missed steps, forgotten follow-ups. A workflow with validation gates does the same thing correctly every single run.",
  },
  {
    icon: LineChart,
    title: "Everything auditable",
    body: "Every system I ship logs its runs: what executed, what failed, what got published where. You see your operations instead of guessing.",
  },
  {
    icon: Layers,
    title: "Scale without hiring",
    body: "Ten times the volume through a pipeline costs nearly nothing extra. Growth stops meaning another junior handling the busywork.",
  },
];

export default function Impact() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".impact-reveal",
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
    <section ref={rootRef} className="bg-ink px-6 md:px-12 py-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="impact-reveal label-mono text-xs mb-4">{"// Business impact"}</p>
          <h2 className="impact-reveal font-display text-paper text-4xl md:text-6xl leading-tight mb-6">
            Work less on repetitive tasks.
            <br />
            Focus more on growth.
          </h2>
          <p className="impact-reveal text-dust font-light text-lg max-w-2xl mx-auto">
            Businesses lose hours every week to manual data entry, follow-up emails,
            report generation, and process coordination. Automation replaces that
            busywork with systems that run consistently, so your team spends time on
            work that actually moves the business forward.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="impact-reveal bg-ash/30 border border-paper/10 rounded-sm p-8 hover:border-paper/25 transition-colors"
            >
              <div className="w-11 h-11 rounded-sm bg-ash/60 border border-paper/10 flex items-center justify-center mb-6">
                <b.icon size={20} className="text-ember" strokeWidth={1.8} />
              </div>
              <h3 className="font-display text-paper text-xl mb-3">{b.title}</h3>
              <p className="text-dust font-light text-sm leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
