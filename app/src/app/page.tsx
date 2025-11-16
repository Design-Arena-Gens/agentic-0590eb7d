import Link from "next/link";
import { AutomationBuilder } from "@/components/automation-builder";

const launchStats = [
  { label: "Creators automated", value: "218" },
  { label: "Avg. time saved", value: "17 hrs/week" },
  { label: "Campaign uplift", value: "3.2x CTR" },
];

const integrations = [
  { name: "YouTube Data API", copy: "Audience intel + scheduled uploads" },
  { name: "OpenAI", copy: "Scriptwriting + LLM decision nodes" },
  { name: "Google Drive", copy: "Asset delivery for editors" },
  { name: "Airtable", copy: "Sponsor pipeline sync" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.35),_transparent_55%)]" />
        <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-24 px-6 pb-24 pt-24 md:px-10">
          <section className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col gap-10">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
                  Agentic n8n Orchestrator
                </span>
                <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl">
                  Automate your YouTube engine with an AI operator that wires
                  directly into n8n.
                </h1>
                <p className="mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
                  Blueprint ideation, scripting, sponsorship, and community
                  follow-up in a single control room. Generate a production-ready
                  n8n workflow and ship videos on autopilot.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {launchStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-indigo-500/10"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-300">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <span className="text-indigo-200">Integrates with</span>
                {integrations.map((integration) => (
                  <span
                    key={integration.name}
                    className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2"
                  >
                    <span className="font-medium text-white">
                      {integration.name}
                    </span>{" "}
                    · {integration.copy}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-800 bg-gradient-to-br from-white/5 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-indigo-500/20">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 text-sm text-slate-300 shadow-inner">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">
                  Playbook Preview
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  All ops data in one surface
                </h2>
                <ul className="mt-4 space-y-4">
                  <li className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-sm font-semibold text-white">
                      AI research trains n8n branching
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Multivariate ideation + sponsor matching fed into
                      automation nodes.
                    </p>
                  </li>
                  <li className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-sm font-semibold text-white">
                      Guardrails keep humans in the loop
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Approvals, QA audits, and schedule overrides surface at
                      critical points.
                    </p>
                  </li>
                  <li className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-sm font-semibold text-white">
                      Deploy with one click to Vercel
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Ship your agentic command center anywhere the team needs
                      it.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <AutomationBuilder />

          <section className="grid gap-8 rounded-[32px] border border-slate-800 bg-slate-950/70 p-10 text-sm text-slate-300 shadow-2xl shadow-indigo-500/20 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Bring your stack
              </h3>
              <p className="mt-3 text-base text-slate-400">
                Our agent outputs an import-ready JSON for n8n. Stay within your
                existing automations, sync to Slack or Discord, and connect
                analytics without writing another zap.
              </p>
            </div>
            <div className="rounded-2xl border border-indigo-500/40 bg-indigo-500/10 p-6 text-slate-100">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
                Next Steps
              </p>
              <ul className="mt-4 space-y-3">
                <li>Download the generated nodes JSON</li>
                <li>Import into n8n and link your credentials</li>
                <li>Monitor KPIs in the Ops layer</li>
              </ul>
              <Link
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                href="https://n8n.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore n8n integrations →
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
