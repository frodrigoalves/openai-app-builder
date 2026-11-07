import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AdminPage({ title, text, action, children }: { title: string; text?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="rise space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="text-4xl">{title}</h1>{text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}</div>
        {action}
      </div>
      {children}
    </div>
  );
}
export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("border border-border bg-card p-5", className)}>{children}</div>;
}
export const btn = "inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-sm text-primary-foreground hover:bg-ink disabled:opacity-40";
export const btnGhost = "inline-flex items-center gap-2 border border-border px-3 py-2 text-sm hover:bg-accent";
export const field = "w-full border border-input bg-background px-3 py-2 text-sm";
export function DemoTag() { return <span className="bg-brass/15 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-brass">Demo</span>; }
