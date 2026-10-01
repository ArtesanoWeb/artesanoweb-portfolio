"use client";

import { useEffect, useState } from "react";
import type { ArtesanStepMeta } from "@/lib/artesan";

const FIRST_STEP_DELAY_MS = 300;
const STEP_DELAY_MS = 400;
const WORKING_DURATION_MS = 600;

function PulseDot() {
  return <span className="size-2 shrink-0 animate-pulse rounded-full bg-[#007acc]" />;
}

function ArtesanStepRow({
  step,
  onOpenDetail,
}: {
  step: ArtesanStepMeta;
  onOpenDetail: (id: string) => void;
}) {
  const [working, setWorking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setWorking(false), WORKING_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  if (working) {
    return (
      <div className="flex items-center gap-2 py-1.5 text-[#8a8a8a]">
        <PulseDot />
        <span>
          {step.kind === "experience" ? "Loading experience entry…" : "Fetching repository…"}
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={() => onOpenDetail(step.id)}
      className="group flex w-full flex-col items-start gap-0.5 rounded px-2 py-1.5 text-left hover:bg-[#eef1f8]"
    >
      <span className="flex min-w-0 items-center gap-1.5">
        <span className="shrink-0 font-semibold text-[#007acc]">in</span>
        <span className="truncate text-[#1e1e1e]">{step.inLabel}</span>
        <span className="shrink-0 text-[#8a8a8a]">— {step.inMeta}</span>
      </span>
      <span className="flex min-w-0 items-center gap-1.5 pl-3 text-[#6b6b6b]">
        <span aria-hidden className="shrink-0">
          ⎿
        </span>
        <span className="shrink-0 font-semibold text-[#2c7a2c]">out</span>
        <span className="truncate">{step.outSummary}</span>
      </span>
    </button>
  );
}

export function ArtesanPanel({
  steps,
  onOpenDetail,
}: {
  steps: ArtesanStepMeta[];
  onOpenDetail: (id: string) => void;
}) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= steps.length) return;
    const delay = revealed === 0 ? FIRST_STEP_DELAY_MS : STEP_DELAY_MS;
    const timer = setTimeout(() => setRevealed((n) => n + 1), delay);
    return () => clearTimeout(timer);
  }, [revealed, steps.length]);

  return (
    <div className="flex flex-col gap-0.5 bg-[#fafafa] px-4 py-4 font-mono text-[13px]">
      <div className="pb-2 text-[11px] font-semibold tracking-wide text-[#8a8a8a]">
        ARTESAN CODE — EXPERIENCE &amp; PROJECTS
      </div>
      {steps.slice(0, revealed).map((step) => (
        <ArtesanStepRow key={step.id} step={step} onOpenDetail={onOpenDetail} />
      ))}
      {revealed < steps.length && (
        <div className="flex items-center gap-2 py-1.5 text-[#8a8a8a]">
          <PulseDot />
          <span>working…</span>
        </div>
      )}
    </div>
  );
}
