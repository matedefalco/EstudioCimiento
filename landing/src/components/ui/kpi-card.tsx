import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  sub?: string;
  className?: string;
}

export function KpiCard({ label, value, delta, positive, sub, className }: KpiCardProps) {
  return (
    <div
      className={cn(
        "bg-panel-surface border border-panel-line rounded-2xl p-[18px_20px] min-w-[160px] flex-1",
        className
      )}
    >
      <p className="text-[12px] text-[#7A7468] mb-2.5">{label}</p>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      {sub && <p className="text-[11px] text-[#7A7468] mt-0.5">{sub}</p>}
      {delta && (
        <p
          className={cn(
            "text-[11.5px] font-medium mt-1.5",
            positive ? "text-success" : "text-danger"
          )}
        >
          {positive ? "↑" : "↓"} {delta}
        </p>
      )}
    </div>
  );
}
