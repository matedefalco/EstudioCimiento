// Simple 16x16 stroke-based icons for rubros and modules
export function Icon({ name, size = 16, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const paths: Record<string, React.ReactNode> = {
    // rubros
    freelance:      <><circle cx="7" cy="5" r="2.5"/><path d="M2 14c0-2.76 2.24-5 5-5"/><path d="M11 10l3 2-3 2"/><path d="M14 12h-4"/></>,
    contenido:      <><rect x="2" y="3" width="12" height="9" rx="1"/><path d="M6 12v2M10 12v2M4 14h8"/><path d="M7 8.5l3.5-2v4L7 8.5z"/></>,
    produccion:     <><rect x="2" y="5" width="8" height="8" rx="1"/><path d="M10 8l4-2v6l-4-2V8z"/></>,
    emprendimiento: <><path d="M8 13V9M5.5 11h5"/><path d="M8 2c0 0-4 3-4 6h8c0-3-4-6-4-6z"/><path d="M6 8v1M10 8v1"/></>,
    agencia:        <><circle cx="5.5" cy="6" r="2"/><circle cx="10.5" cy="6" r="2"/><path d="M1 14c0-2.5 2-4 4.5-4M15 14c0-2.5-2-4-4.5-4"/><path d="M5.5 10c1.38 0 2.5 1.5 5 0"/></>,
    servicios:      <><rect x="4" y="7" width="8" height="7" rx="1"/><path d="M6 7V5a2 2 0 014 0v2"/><circle cx="8" cy="11" r="1"/></>,
    // dashboard
    resumen:        <><rect x="2" y="2" width="5" height="5" rx="0.5"/><rect x="9" y="2" width="5" height="5" rx="0.5"/><rect x="2" y="9" width="5" height="5" rx="0.5"/><rect x="9" y="9" width="5" height="5" rx="0.5"/></>,
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
