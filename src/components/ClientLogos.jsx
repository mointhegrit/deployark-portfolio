import useMarquee from "../hooks/useMarquee";

// Real clients only. Add here as new engagements ship.
const CLIENTS = [
  { name: "SparkPR", note: "PR & marketing agency", logo: "/clients/sparkpr.svg", height: 26 },
  { name: "1Kosmos", note: "Identity security platform", logo: "/clients/1kosmos-mark.png", height: 40 },
];

function ClientCard({ c }) {
  return (
    <div className="group shrink-0 w-[300px] bg-ash rounded-sm border-t-2 border-t-transparent hover:border-t-ember border-x border-b border-paper/10 mr-6 px-8 pt-7 pb-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="h-14 flex items-center">
        <img
          src={c.logo}
          alt={c.name}
          style={{ height: c.height }}
          className="object-contain max-w-[150px]"
        />
      </div>
      <div className="mt-6 pt-5 border-t border-paper/10">
        <p className="font-display text-paper text-lg">{c.name}</p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-dust mt-1.5">
          {c.note}
        </p>
      </div>
    </div>
  );
}

export default function ClientLogos() {
  const trackRef = useMarquee(30);
  const doubled = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="bg-ink py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center mb-14">
        <p className="label-mono text-xs mb-4">{"// Who I've worked with"}</p>
        <h2 className="font-display text-paper text-3xl md:text-5xl">
          Teams that trusted the build.
        </h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-ink to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-ink to-transparent z-10" />
        <div ref={trackRef} className="flex w-max pl-6 md:pl-12">
          {doubled.map((c, i) => (
            <ClientCard key={`${c.name}-${i}`} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
