'use client';

import { FormEvent, useMemo, useState } from "react";
import {
  GeneratedWorkflow,
  WorkflowGoal,
  WorkflowInput,
} from "@/lib/workflow";

const defaultForm: WorkflowInput = {
  channelName: "",
  channelTopic: "",
  tone: "educational",
  cadencePerWeek: 3,
  goals: ["audienceGrowth", "contentVelocity"],
  automationLevel: "hybrid",
  n8nWebhook: "",
  preferredPublishTime: "17:00",
  monetizationTarget: "$5k monthly",
  includeShorts: true,
  notes: "",
};

type GoalOption = {
  id: WorkflowGoal;
  label: string;
  description: string;
};

const goalOptions: GoalOption[] = [
  {
    id: "audienceGrowth",
    label: "Audience Growth",
    description: "Trend scouting, title + thumbnail iteration, metadata sync.",
  },
  {
    id: "contentVelocity",
    label: "Content Velocity",
    description: "AI scriptwriting, b-roll prep, editor asset handoff.",
  },
  {
    id: "monetization",
    label: "Monetization",
    description: "Sponsor matching, CTA placement, deliverable tracking.",
  },
  {
    id: "community",
    label: "Community",
    description: "Comment intelligence, channel posts, engagement prompts.",
  },
];

const toneOptions = [
  "educational",
  "story-driven",
  "high-energy",
  "documentary",
  "tutorial",
];

type SubmissionState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: GeneratedWorkflow };

export function AutomationBuilder() {
  const [form, setForm] = useState<WorkflowInput>(defaultForm);
  const [result, setResult] = useState<SubmissionState>({ status: "idle" });

  const cadenceLabel = useMemo(() => {
    if (form.cadencePerWeek >= 5) return "Daily";
    if (form.cadencePerWeek >= 3) return "3-4x Weekly";
    return "Weekly";
  }, [form.cadencePerWeek]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult({ status: "loading" });

    try {
      const response = await fetch("/api/workflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Unable to generate workflow. Try again.");
      }

      const data = (await response.json()) as GeneratedWorkflow;
      setResult({ status: "success", data });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Try again.";
      setResult({ status: "error", message });
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <div className="grid grid-cols-1 gap-6 rounded-3xl bg-white/95 p-8 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 backdrop-blur dark:bg-slate-950/80 dark:ring-slate-800 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 text-sm text-slate-600 dark:text-slate-300"
        >
          <header className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Workflow Blueprint
            </h2>
            <p>
              Generate an n8n-driven automation for your channel with a single
              click. We produce the nodes, prompts, and rollout timeline.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Channel Name
              </span>
              <input
                required
                value={form.channelName}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    channelName: event.target.value,
                  }))
                }
                className="rounded-lg border border-slate-300/70 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                placeholder="Orbit Labs"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Channel Topic
              </span>
              <input
                required
                value={form.channelTopic}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    channelTopic: event.target.value,
                  }))
                }
                className="rounded-lg border border-slate-300/70 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                placeholder="AI tools for creators"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Tone Profile
              </span>
              <select
                value={form.tone}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    tone: event.target.value,
                  }))
                }
                className="rounded-lg border border-slate-300/70 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                {toneOptions.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Videos Per Week
              </span>
              <input
                type="number"
                min={1}
                max={14}
                value={form.cadencePerWeek}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    cadencePerWeek: Number(event.target.value),
                  }))
                }
                className="rounded-lg border border-slate-300/70 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Preferred Publish Time
              </span>
              <input
                type="time"
                value={form.preferredPublishTime}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    preferredPublishTime: event.target.value,
                  }))
                }
                className="rounded-lg border border-slate-300/70 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Monetization Target
              </span>
              <input
                value={form.monetizationTarget}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    monetizationTarget: event.target.value,
                  }))
                }
                className="rounded-lg border border-slate-300/70 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                placeholder="$5k monthly"
              />
            </label>
          </div>

          <fieldset className="flex flex-col gap-3">
            <legend className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Automation Goals
            </legend>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {goalOptions.map((goal) => {
                const selected = form.goals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() =>
                      setForm((prev) => {
                        const isSelected = prev.goals.includes(goal.id);
                        const nextGoals = isSelected
                          ? prev.goals.filter((item) => item !== goal.id)
                          : [...prev.goals, goal.id];
                        return { ...prev, goals: nextGoals as WorkflowGoal[] };
                      })
                    }
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      selected
                        ? "border-indigo-500 bg-indigo-50 text-indigo-900 shadow-sm dark:border-indigo-400/80 dark:bg-indigo-500/15 dark:text-indigo-100"
                        : "border-slate-300/70 hover:border-indigo-400 hover:bg-indigo-50/40 dark:border-slate-800 dark:hover:border-indigo-400/60 dark:hover:bg-indigo-500/10"
                    }`}
                  >
                    <div className="text-sm font-semibold">{goal.label}</div>
                    <p className="mt-1 text-xs opacity-80">{goal.description}</p>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-xl border border-slate-300/70 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <input
                type="radio"
                name="automationLevel"
                value="assist"
                checked={form.automationLevel === "assist"}
                onChange={() =>
                  setForm((prev) => ({ ...prev, automationLevel: "assist" }))
                }
                className="h-4 w-4 accent-indigo-500"
              />
              Assist Mode · human-led with AI research
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-300/70 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <input
                type="radio"
                name="automationLevel"
                value="hybrid"
                checked={form.automationLevel === "hybrid"}
                onChange={() =>
                  setForm((prev) => ({ ...prev, automationLevel: "hybrid" }))
                }
                className="h-4 w-4 accent-indigo-500"
              />
              Hybrid Mode · human review before publish
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-300/70 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 md:col-span-2">
              <input
                type="radio"
                name="automationLevel"
                value="autopilot"
                checked={form.automationLevel === "autopilot"}
                onChange={() =>
                  setForm((prev) => ({ ...prev, automationLevel: "autopilot" }))
                }
                className="h-4 w-4 accent-indigo-500"
              />
              Autopilot · full orchestration with guardrails
            </label>
          </fieldset>

          <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-300/70 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <span>Repurpose to Shorts automatically</span>
            <input
              type="checkbox"
              checked={form.includeShorts}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  includeShorts: event.target.checked,
                }))
              }
              className="h-4 w-4 accent-indigo-500"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              n8n Webhook URL (optional)
            </span>
            <input
              value={form.n8nWebhook}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  n8nWebhook: event.target.value,
                }))
              }
              placeholder="https://n8n.workflows/run"
              className="rounded-lg border border-slate-300/70 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Notes & Constraints
            </span>
            <textarea
              value={form.notes}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  notes: event.target.value,
                }))
              }
              rows={4}
              placeholder="Reference brand guidelines, compliance rules, preferred collaborators..."
              className="rounded-lg border border-slate-300/70 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </label>

          <button
            type="submit"
            disabled={result.status === "loading"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-wait disabled:bg-indigo-400"
          >
            {result.status === "loading" ? "Generating..." : "Generate Workflow"}
          </button>
        </form>

        <aside className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-slate-200/70 bg-gradient-to-br from-indigo-500/10 via-white to-slate-50 p-6 shadow-inner dark:border-slate-800 dark:from-indigo-500/15 dark:via-slate-950 dark:to-slate-900">
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Publish Rhythm
            </h3>
            <p className="text-4xl font-bold text-slate-900 dark:text-indigo-50">
              {cadenceLabel}
            </p>
            <p className="opacity-80">
              We tune automation intensity and talent bandwidth to match this
              cadence.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/60 bg-white/80 p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-white">
              How it works
            </p>
            <ul className="mt-2 space-y-2">
              <li>1. We blueprint n8n nodes, AI prompts, and data hand-offs.</li>
              <li>2. Connect your webhook or import JSON into n8n.</li>
              <li>3. Launch, monitor metrics, and tweak in the Ops Hub.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-indigo-200/40 bg-indigo-50/70 p-4 text-xs text-indigo-900 shadow-sm dark:border-indigo-500/40 dark:bg-indigo-500/15 dark:text-indigo-100">
            <p className="font-semibold">n8n Ready</p>
            <p className="mt-1 opacity-85">
              Copy the generated node map straight into the n8n workflow
              builder—no manual wiring required.
            </p>
          </div>
        </aside>
      </div>

      <ResultPanel state={result} />
    </section>
  );
}

function ResultPanel({ state }: { state: SubmissionState }) {
  if (state.status === "idle") {
    return (
      <div className="grid gap-4 rounded-3xl border border-dashed border-slate-300 bg-white/60 p-12 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
        <p className="text-base font-medium text-slate-700 dark:text-slate-200">
          Blueprint your automation to reveal the workflow canvas, metrics, and
          exportable nodes.
        </p>
        <p>
          Harness AI routing, sponsor alignment, and community cadence in a
          single n8n pipeline.
        </p>
      </div>
    );
  }

  if (state.status === "loading") {
    return (
      <div className="flex items-center justify-center rounded-3xl border border-slate-200 bg-white/70 p-10 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300">
        Spinning up your agentic workflow…
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="rounded-3xl border border-rose-300/70 bg-rose-50/70 p-10 text-sm text-rose-700 shadow-sm dark:border-rose-500/50 dark:bg-rose-500/20 dark:text-rose-100">
        {state.message}
      </div>
    );
  }

  return <WorkflowCanvas data={state.data} />;
}

function WorkflowCanvas({ data }: { data: GeneratedWorkflow }) {
  return (
    <div className="flex flex-col gap-8">
      <header className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-800 to-indigo-600 p-[1px]">
        <div className="rounded-[22px] bg-slate-950/95 p-8 text-slate-100 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">
            Agentic Control Room
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            {data.headline}
          </h2>
          <p className="mt-3 max-w-3xl text-base text-slate-200/80">
            {data.summary}
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
            Automation Score · {data.automationScore}%
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {data.metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
              {metric.label}
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
              {metric.value}
            </p>
            <p className="mt-2 text-sm opacity-75">{metric.helper}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            n8n Node Map
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Import into n8n or replicate node sequence manually. Dependencies
            indicate execution order when auto-running the agent.
          </p>

          <div className="mt-6 grid gap-4">
            {data.steps.map((step) => (
              <div
                key={step.id}
                className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 p-5 text-sm text-slate-700 shadow-inner dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 dark:text-slate-200"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {step.title}
                  </p>
                  <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-500 dark:bg-indigo-500/15 dark:text-indigo-200">
                    {step.durationMinutes}m
                  </span>
                </div>
                <p className="mt-2 text-sm opacity-90">{step.description}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-slate-200/70 px-3 py-1 font-medium uppercase tracking-wide text-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
                    {step.n8nNode}
                  </span>
                  {step.aiInvolved && (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-100">
                      AI Agent
                    </span>
                  )}
                </div>

                {step.dependencies.length > 0 && (
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                    Depends on: {step.dependencies.join(", ")}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-300">
                  {step.outputs.map((output) => (
                    <span
                      key={output}
                      className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800/70"
                    >
                      {output}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Launch Timeline
            </h3>
            <ul className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              {data.timeline.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </p>
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                      {item.eta}
                    </span>
                  </div>
                  <p className="mt-2 text-xs opacity-80">{item.details}</p>
                </li>
              ))}
            </ul>
          </div>

          {data.operatorNotes.length > 0 && (
            <div className="rounded-3xl border border-amber-200/60 bg-amber-50/80 p-6 text-sm text-amber-900 shadow-xl shadow-amber-500/10 dark:border-amber-400/40 dark:bg-amber-500/15 dark:text-amber-100">
              <h3 className="text-lg font-semibold">Operator Notes</h3>
              <ul className="mt-3 space-y-2">
                {data.operatorNotes.map((note, index) => (
                  <li
                    key={`${note}-${index}`}
                    className="rounded-xl bg-white/70 p-3 text-sm font-medium dark:bg-slate-950/60"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              AI Prompt Pack
            </h3>
            <p className="mt-2 text-sm opacity-80">
              Drop these instructions into n8n OpenAI nodes or your preferred
              LLM connector.
            </p>
            <div className="mt-4 space-y-4">
              {data.prompts.map((prompt) => (
                <article
                  key={prompt.id}
                  className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-indigo-500">
                    <span>{prompt.title}</span>
                    <span>{prompt.model}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    {prompt.instructions}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    {prompt.inputSchema.map((input) => (
                      <span
                        key={input}
                        className="rounded-full bg-white px-3 py-1 shadow-sm dark:bg-slate-950"
                      >
                        {input}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-indigo-200/50 bg-indigo-500/10 p-6 text-sm text-indigo-900 shadow-inner dark:border-indigo-500/40 dark:bg-indigo-500/20 dark:text-indigo-100">
            <h3 className="text-lg font-semibold">Hook Scripts</h3>
            <ul className="mt-3 space-y-2">
              {data.hookIdeas.map((hook) => (
                <li key={hook} className="rounded-xl bg-white/70 p-3 dark:bg-slate-950/60">
                  {hook}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs opacity-80">
              Feed hooks into your shorts repurposing node or thumbnail IDE.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
