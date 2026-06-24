// Simple 16x16 stroke-based icons for rubros and modules
export function Icon({ name, size = 16, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const paths: Record<string, React.ReactNode> = {
    // rubros
    gastronomy:   <><path d="M5 2v5a3 3 0 006 0V2"/><path d="M8 9v5"/></>,
    services:     <><circle cx="8" cy="5.5" r="2.5"/><path d="M2 14.5c0-3.31 2.69-6 6-6s6 2.69 6 6"/></>,
    retail:       <><path d="M3 4h10l-1.5 7H4.5L3 4z"/><path d="M5.5 4V3a2.5 2.5 0 015 0v1"/><circle cx="6" cy="13.5" r="1"/><circle cx="10" cy="13.5" r="1"/></>,
    construction: <><path d="M2 14h12M8 2v8M5 6l3-4 3 4"/><rect x="5" y="10" width="6" height="4" rx="0.5"/></>,
    health:       <><circle cx="8" cy="8" r="6"/><path d="M8 5v6M5 8h6"/></>,
    other:        <><circle cx="4.5" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="11.5" cy="8" r="1.5"/></>,
    // modules
    ops:          <><rect x="3" y="2" width="10" height="12" rx="1"/><path d="M6 5h4M6 8.5h2"/><path d="M9 8l1.5 1.5L13 7"/></>,
    fin:          <><path d="M2 11l3-5 3 3 3-4 3 3M2 13h12"/></>,
    stock:        <><path d="M8 2l5 3v6l-5 3-5-3V5z"/><path d="M8 8v5M3 5l5 3 5-3"/></>,
    clients:      <><rect x="3" y="2" width="10" height="12" rx="1"/><path d="M6 5h4M6 8h4M6 11h2.5"/></>,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"
      stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {paths[name] ?? paths.other}
    </svg>
  );
}
