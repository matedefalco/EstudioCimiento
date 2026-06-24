import { cn } from "@/lib/utils";

const COLORS = ["#D89149", "#3E6FA8", "#3E8460", "#6B5B95", "#B5863C"];

interface AvatarProps {
  initials: string;
  idx?: number;
  size?: number;
  className?: string;
}

export function Avatar({ initials, idx = 0, size = 28, className }: AvatarProps) {
  return (
    <div
      className={cn("rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white", className)}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: COLORS[idx % COLORS.length],
        border: "2px solid #FFFFFF",
      }}
    >
      {initials}
    </div>
  );
}

export function AvatarGroup({ people, size = 26 }: { people: string[]; size?: number }) {
  return (
    <div className="flex">
      {people.map((p, i) => (
        <div key={p} style={{ marginLeft: i === 0 ? 0 : -8 }}>
          <Avatar initials={p} idx={i} size={size} />
        </div>
      ))}
    </div>
  );
}
