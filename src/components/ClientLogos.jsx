import useMarquee from "../hooks/useMarquee";

// Real clients only. Add here as new engagements ship.
const CLIENTS = [
  { name: "SparkPR", logo: "/clients/sparkpr.svg", height: 28 },
  { name: "1Kosmos", logo: "/clients/1kosmos-mark.png", height: 44, showName: true },
];

function ClientCard({ c }) {
  return (
    <div className="shrink-0 w-[220px] h-[120px] bg-ash rounded-sm border border-paper/10 flex flex-col items-center justify-center gap-3 mr-6 px-6">
      <img
        src={c.logo}
        alt={c.name}
        style={{ height: c.height }}
        className="object-contain max-w-[140px]"
      />
      {c.showName && (
        <span className="font-display text-paper text-sm">{c.name}</span>
      )}
    </div>
  );
}

export default function ClientLogos() {
  const trackRef = useMarquee(28);
  const doubled = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

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
