import { cn } from "@/lib/utils";

type Tone = "green" | "red" | "amber" | "blue" | "purple" | "gray";

const toneClasses: Record<Tone, string> = {
  green:  "bg-success-bg  text-success",
  red:    "bg-danger-bg   text-danger",
  amber:  "bg-warning-bg  text-warning",
  blue:   "bg-info-bg     text-info",
  purple: "bg-[#E9E5F0]   text-[#6B5B95]",
  gray:   "bg-[#EAE5D9]   text-[#7A7468]",
};

interface ChipProps {
  text: string;
  tone?: Tone;
  className?: string;
}

export function Chip({ text, tone = "amber", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap",
        toneClasses[tone],
        className
      )}
    >
      {text}
    </span>
  );
}
