import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("h-7 w-7", className)} fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M3 26 L12 9 L17 18 L21 12 L29 26 Z" />
      <path d="M12 9 L14.5 26 M21 12 L19 26 M17 18 L14.5 26 M17 18 L19 26" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={inverted ? "text-brass" : "text-forest"} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] tracking-[0.18em]">MADER</span>
        <span className="eyebrow text-[0.55rem] tracking-[0.42em] text-brass">Steinwelt</span>
      </span>
    </span>
  );
}
