import ArkMark from "./ArkMark";
import SocialLinks from "./SocialLinks";

const COLUMNS = [
  {
    title: "Site",
    links: [
      ["Work", "/#work"],
      ["Process", "/#process"],
      ["About", "/#about"],
    ],
  },
  {
    title: "Contact",
    links: [
      ["hello@deployark.com", "mailto:hello@deployark.com"],
      ["LinkedIn", "https://www.linkedin.com/in/mointhegrit/"],
      ["X (Twitter)", "https://x.com/mointhegrit/"],
      ["GitHub", "https://github.com/mointhegrit"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-paper/10 px-6 md:px-12 pt-20 pb-10 mt-4 text-paper">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <div className="flex items-center gap-3">
            <ArkMark size={36} arc="#FAFAF9" />
            <span className="font-display text-2xl">DeployArk</span>
          </div>
          <p className="label-mono text-[9px] mt-3">{"// Moin Khan"}</p>
          <p className="text-dust font-light mt-4 max-w-xs">
            AI workflow automation for PR & marketing agencies.
          </p>
          <SocialLinks size={20} className="mt-6" />
        </div>
        <div className="grid grid-cols-2 gap-8">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="label-mono text-[10px] mb-4">{`// ${col.title}`}</h4>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="hover-lift inline-block text-sm font-light text-paper/70 hover:text-paper"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mt-16 pt-8 border-t border-paper/10">
        <p className="text-xs font-light text-paper/40">
          © {new Date().getFullYear()} DeployArk. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
          <span className="font-mono text-xs text-paper/50 uppercase tracking-wider">
            Systems Operational
          </span>
        </div>
      </div>
    </footer>
  );
}
