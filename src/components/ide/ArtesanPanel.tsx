"use client";

import { useEffect, useState } from "react";
import type { ArtesanStepMeta } from "@/lib/artesan";

const FIRST_STEP_DELAY_MS = 500;
const STEP_DELAY_MS = 900;
const WORKING_DURATION_MS = 1100;

const PANEL_BG = "#fafafa";

function TimelineDot({ tone }: { tone: "working" | "done" }) {
  return (
    <span
      className={`relative z-10 mt-0.75 size-2.5 shrink-0 rounded-full ring-4 ${
        tone === "working" ? "animate-pulse bg-[#007acc]" : "bg-[#2c9f4b]"
      }`}
      style={{ boxShadow: `0 0 0 4px ${PANEL_BG}` }}
    />
  );
}

function ArtesanStepRow({
  step,
  onOpenDetail,
}: {
  step: ArtesanStepMeta;
  onOpenDetail: (id: string) => void;
}) {
  const [working, setWorking] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setWorking(false), WORKING_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (working) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [working]);

  if (working) {
    return (
      <div className="flex items-start gap-3">
        <TimelineDot tone="working" />
        <span className="pt-0.5 text-[#8a8a8a]">
          {step.kind === "experience" ? "Loading experience entry…" : "Fetching repository…"}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <TimelineDot tone="done" />
      <button
        onClick={() => onOpenDetail(step.id)}
        className="group flex min-w-0 flex-1 flex-col items-stretch gap-1.5 rounded-md px-1.5 py-1 text-left"
      >
        <span className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-semibold text-[#1e1e1e] group-hover:underline">
            Write {step.tabName}
          </span>
          <span className="text-[11px] font-normal text-[#8a8a8a]">
            · {step.lineCount} lines
          </span>
        </span>

        <div className="w-full overflow-hidden rounded border border-[#e3e3e3] bg-[#f3f3f3] group-hover:border-[#c9c9c9]">
          <div className="border-b border-[#e3e3e3] px-2.5 py-1.5">
            <div className="pb-1 text-[10px] font-semibold tracking-wide text-[#8a8a8a]">IN</div>
            <div className="flex flex-col gap-0.5">
              {step.inFields.map(([key, value]) => (
                <div key={key} className="flex min-w-0 gap-2 text-[12px]">
                  <span className="shrink-0 text-[#8957e5]">{key}:</span>
                  <span className="truncate text-[#3b3b3b]">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white px-2.5 py-1.5">
            <div className="pb-1 text-[10px] font-semibold tracking-wide text-[#8a8a8a]">OUT</div>
            <div className="flex max-h-24 flex-col gap-0.5 overflow-y-auto text-[12px] text-[#3b3b3b]">
              {step.outLines.map((line, i) => (
                <div key={i} className="flex gap-1.5">
                  <span className="shrink-0 text-[#8a8a8a]">-</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </button>
    </div>
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
    <div className="flex flex-col gap-3 px-4 py-4 font-mono text-[13px]" style={{ background: PANEL_BG }}>
      <div className="text-[11px] font-semibold tracking-wide text-[#8a8a8a]">
        ARTESAN CODE — EXPERIENCE &amp; PROJECTS
      </div>
      <div className="relative flex flex-col gap-5">
        <div className="absolute top-1 bottom-1 left-1 w-px bg-[#dcdcdc]" aria-hidden />
        {steps.slice(0, revealed).map((step) => (
          <ArtesanStepRow key={step.id} step={step} onOpenDetail={onOpenDetail} />
        ))}
        {revealed < steps.length && (
          <div className="flex items-start gap-3">
            <TimelineDot tone="working" />
            <span className="pt-0.5 text-[#8a8a8a]">working…</span>
          </div>
        )}
      </div>
    </div>
  );
}
