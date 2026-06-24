"use client";
import { C, COMPONENTS, RUBRO_OPTIONS, MODALIDAD_OPTIONS, TOOLS_OPTIONS, URGENCIA_OPTIONS, SIZE_OPTIONS, BRAND_COLORS, INTERFACE_STYLES, getSuggestedModules } from "./constants";
import { ECSymbol, Overline } from "./primitives";
import { ParticleField } from "./ParticleField";
import { Cimiento3D } from "./Cimiento3D";
import type { QuoteState } from "@/types";

const h2s: React.CSSProperties = { fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0, textTransform: "lowercase" };
const cardBase: React.CSSProperties = { background: C.surface, border: `1px solid ${C.line}`, borderRadius: 12, padding: "16px 18px", cursor: "pointer", transition: "all 200ms ease" };
const primaryBtn: React.CSSProperties = { background: C.copper, color: C.steel, fontSize: 14, fontWeight: 600, letterSpacing: "0.04em", textTransform: "lowercase", padding: "15px 32px", borderRadius: 4, border: "none", cursor: "pointer", fontFamily: "inherit" };
const inputStyle: React.CSSProperties = { background: C.surface, border: `1px solid ${C.line}`, borderRadius: 8, padding: "13px 16px", fontSize: 14.5, color: C.cream, fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color 200ms ease" };

interface Props {
  step: number;
  go: (n: number) => void;
  transitioning: boolean;
  quoteState: QuoteState;
  setQuoteField: <K extends keyof QuoteState>(key: K, val: QuoteState[K]) => void;
  toggleTool: (id: string) => void;
  toggleComp: (id: string) => void;
  onSubmit: () => void;
  submitStatus: "idle" | "loading" | "success" | "error";
  submitError: string | null;
}

export function QuoteFlow({ step, go, transitioning, quoteState, setQuoteField, toggleTool, toggleComp, onSubmit, submitStatus, submitError }: Props) {
  const { rubro, modalidad, tools, urgencia, selected, size, brandName, brandColor, interfaceStyle, contactName, contactEmail, contactCompany } = quoteState;
  const suggested = getSuggestedModules(rubro, urgencia);
  const canSubmit = contactName.trim() && contactEmail.trim() && selected.length > 0 && submitStatus !== "loading";

  return (
    <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
      <ParticleField active={true} intensity={selected.length} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.line} 1px,transparent 1px),linear-gradient(90deg,${C.line} 1px,transparent 1px)`, backgroundSize: "64px 64px", opacity: 0.5, pointerEvents: "none" }} />

      {/* header */}
      <div style={{ position: "absolute", top: 28, left: 32, display: "flex", alignItems: "center", gap: 10, zIndex: 5 }}>
        <ECSymbol size={22} />
        <span style={{ fontSize: 14, opacity: 0.9 }}>estudio <strong style={{ fontWeight: 600 }}>cimiento</strong></span>
      </div>
      <div style={{ position: "absolute", top: 32, right: 32, display: "flex", gap: 6, alignItems: "center", zIndex: 5 }}>
        {[0,1,2,3,4,5].map(n => (
          <div key={n} style={{ width: 8, height: 8, borderRadius: "50%", background: n <= step ? C.copper : C.lineStrong, transition: "all 300ms ease" }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 4, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32, opacity: transitioning ? 0 : 1, transition: "opacity 480ms ease" }}>

        {/* STEP 0: rubro */}
        {step === 0 && (
          <div className="fade-stage" style={{ maxWidth: 560, width: "100%" }}>
            <Overline>relevamiento · 1 de 6</Overline>
            <h2 style={h2s}>¿a qué se dedica tu negocio?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 32 }}>
              {RUBRO_OPTIONS.map(o => (
                <div key={o.id} onClick={() => { setQuoteField("rubro", o.id); go(1); }}
                  style={{ ...cardBase, display: "flex", alignItems: "center", gap: 12, borderColor: rubro === o.id ? C.copper : C.line }}>
                  <span style={{ fontSize: 16, color: rubro === o.id ? C.copper : C.grayCold, width: 20, textAlign: "center" }}>{o.glyph}</span>
                  <span style={{ fontSize: 14, color: C.cream }}>{o.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: modalidad + herramientas */}
        {step === 1 && (
          <div className="fade-stage" style={{ maxWidth: 560, width: "100%" }}>
            <Overline>relevamiento · 2 de 6</Overline>
            <h2 style={h2s}>¿cómo operás y qué usás hoy?</h2>

            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.14em", color: C.grayCold, textTransform: "lowercase", marginBottom: 12 }}>¿cómo operás?</div>
              <div style={{ display: "flex", gap: 10 }}>
                {MODALIDAD_OPTIONS.map(o => (
                  <div key={o.id} onClick={() => setQuoteField("modalidad", o.id)}
                    style={{ ...cardBase, padding: "10px 18px", borderColor: modalidad === o.id ? C.copper : C.line, background: modalidad === o.id ? "rgba(216,145,73,0.08)" : C.surface }}>
                    <span style={{ fontSize: 13.5, color: modalidad === o.id ? C.copper : C.cream }}>{o.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.14em", color: C.grayCold, textTransform: "lowercase", marginBottom: 12 }}>¿qué herramientas usás hoy? (podés elegir más de una)</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {TOOLS_OPTIONS.map(o => {
                  const on = tools.includes(o.id);
                  return (
                    <div key={o.id} onClick={() => toggleTool(o.id)}
                      style={{ ...cardBase, padding: "11px 14px", display: "flex", alignItems: "center", gap: 10, borderColor: on ? C.copper : C.line, background: on ? "rgba(216,145,73,0.08)" : C.surface }}>
                      <span style={{ width: 14, height: 14, border: `1.5px solid ${on ? C.copper : C.lineStrong}`, borderRadius: 3, background: on ? C.copper : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: C.steel, fontSize: 10, flexShrink: 0 }}>{on ? "✓" : ""}</span>
                      <span style={{ fontSize: 13, color: on ? C.copper : C.cream }}>{o.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              disabled={!modalidad}
              onClick={() => go(2)}
              style={{ ...primaryBtn, marginTop: 28, opacity: !modalidad ? 0.35 : 1, cursor: !modalidad ? "not-allowed" : "pointer" }}>
              seguir
            </button>
          </div>
        )}

        {/* STEP 2: urgencia */}
        {step === 2 && (
          <div className="fade-stage" style={{ maxWidth: 560, width: "100%" }}>
            <Overline>relevamiento · 3 de 6</Overline>
            <h2 style={h2s}>¿en qué momento está el negocio?</h2>
            <p style={{ fontSize: 14.5, color: C.grayCold, lineHeight: 1.55, marginTop: 14 }}>esto nos ayuda a entender el contexto, no solo lo que querés.</p>
            <div style={{ display: "grid", gap: 12, marginTop: 28 }}>
              {URGENCIA_OPTIONS.map(o => (
                <div key={o.id} onClick={() => { setQuoteField("urgencia", o.id); go(3); }}
                  style={{ ...cardBase, borderColor: urgencia === o.id ? C.copper : C.line }}>
                  <span style={{ fontSize: 15, color: C.cream }}>{o.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: módulos con 3D preview */}
        {step === 3 && (
          <div className="fade-stage" style={{ display: "flex", gap: 64, alignItems: "center", maxWidth: 900, width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ flex: "1 1 420px", maxWidth: 480 }}>
              <Overline>desarrollo · 4 de 6</Overline>
              <h2 style={h2s}>¿qué querés ordenar primero?</h2>
              <p style={{ fontSize: 14.5, color: C.grayCold, lineHeight: 1.55, marginTop: 14 }}>elegí los componentes. mirá cómo se levanta tu sistema a la derecha.</p>
              <div style={{ display: "grid", gap: 10, marginTop: 28 }}>
                {COMPONENTS.map(c => {
                  const on = selected.includes(c.id);
                  const isSuggested = suggested.includes(c.id) && !on;
                  return (
                    <div key={c.id} onClick={() => toggleComp(c.id)}
                      style={{ ...cardBase, display: "flex", alignItems: "center", gap: 16, borderColor: on ? C.copper : C.line, background: on ? "rgba(216,145,73,0.08)" : C.surface }}>
                      <span style={{ fontSize: 18, color: on ? C.copper : C.grayCold, width: 22 }}>{c.glyph}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 500, color: C.cream, display: "flex", alignItems: "center", gap: 8 }}>
                          {c.name}
                          {isSuggested && <span style={{ fontSize: 10, letterSpacing: "0.1em", color: C.copper, border: `1px solid ${C.copper}`, borderRadius: 20, padding: "2px 8px", textTransform: "lowercase" }}>sugerido</span>}
                        </div>
                        <div style={{ fontSize: 12.5, color: C.grayCold, marginTop: 3, lineHeight: 1.4 }}>{c.desc}</div>
                      </div>
                      <span style={{ width: 18, height: 18, border: `1.5px solid ${on ? C.copper : C.lineStrong}`, borderRadius: 3, background: on ? C.copper : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: C.steel, fontSize: 12, flexShrink: 0 }}>{on ? "✓" : ""}</span>
                    </div>
                  );
                })}
              </div>
              <button disabled={selected.length === 0} onClick={() => go(4)}
                style={{ ...primaryBtn, marginTop: 24, opacity: selected.length === 0 ? 0.35 : 1, cursor: selected.length === 0 ? "not-allowed" : "pointer" }}>
                seguir
              </button>
            </div>
            <div style={{ flex: "0 0 auto", textAlign: "center" }}>
              <Cimiento3D layers={selected} />
              <div style={{ fontSize: 11, letterSpacing: "0.2em", color: C.grayCold, marginTop: 8 }}>
                {selected.length === 0 ? "tu base" : `${selected.length} ${selected.length === 1 ? "componente" : "componentes"}`}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: personalización */}
        {step === 4 && (
          <div className="fade-stage" style={{ maxWidth: 560, width: "100%" }}>
            <Overline>personalización · 5 de 6</Overline>
            <h2 style={h2s}>dale identidad a tu sistema</h2>
            <p style={{ fontSize: 14.5, color: C.grayCold, lineHeight: 1.55, marginTop: 14 }}>opcional, pero hace que el demo se sienta tuyo.</p>

            <div style={{ marginTop: 32 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.14em", color: C.grayCold, textTransform: "lowercase", marginBottom: 10 }}>nombre de tu negocio</div>
              <input
                type="text"
                placeholder="ej: ferretería norte"
                value={brandName}
                onChange={e => setQuoteField("brandName", e.target.value)}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = C.copper)}
                onBlur={e => (e.currentTarget.style.borderColor = C.line)}
              />
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.14em", color: C.grayCold, textTransform: "lowercase", marginBottom: 14 }}>acento de color del sistema</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {BRAND_COLORS.map(bc => (
                  <div key={bc.id} onClick={() => setQuoteField("brandColor", bc.hex)}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%", background: bc.hex,
                      border: brandColor === bc.hex ? `2px solid ${C.cream}` : "2px solid transparent",
                      boxShadow: brandColor === bc.hex ? `0 0 0 2px ${bc.hex}` : "none",
                      transition: "all 200ms ease",
                    }} />
                    <span style={{ fontSize: 10, color: brandColor === bc.hex ? C.cream : C.grayCold, letterSpacing: "0.08em" }}>{bc.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.14em", color: C.grayCold, textTransform: "lowercase", marginBottom: 14 }}>estilo de interfaz</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {INTERFACE_STYLES.map(s => {
                  const on = interfaceStyle === s.id;
                  return (
                    <div key={s.id} onClick={() => setQuoteField("interfaceStyle", s.id)}
                      style={{ ...cardBase, padding: "14px 16px", borderColor: on ? brandColor : C.line, background: on ? "rgba(216,145,73,0.06)" : C.surface, cursor: "pointer" }}>
                      {/* mini preview */}
                      <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", marginBottom: 10, height: 36, border: `1px solid ${C.line}` }}>
                        <div style={{ width: "30%", background: s.sidebarBg }} />
                        <div style={{ flex: 1, background: s.contentBg, display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
                          <div style={{ width: "80%", height: "70%", background: s.cardBg, borderRadius: 3, border: `1px solid ${s.borderColor}` }} />
                        </div>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: on ? brandColor : C.cream }}>{s.label}</div>
                      <div style={{ fontSize: 11, color: C.grayCold, marginTop: 2 }}>{s.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button onClick={() => go(5)} style={{ ...primaryBtn, marginTop: 32, background: brandColor, color: "#fff" }}>
              seguir
            </button>
          </div>
        )}

        {/* STEP 5: contacto + tamaño */}
        {step === 5 && (
          <div className="fade-stage" style={{ maxWidth: 560, width: "100%" }}>
            <Overline>contacto · 6 de 6</Overline>
            <h2 style={h2s}>¿con quién hablamos?</h2>
            <p style={{ fontSize: 14.5, color: C.grayCold, lineHeight: 1.55, marginTop: 14 }}>te mostramos el sistema ahora. te contactamos después para hablar de tu proyecto.</p>

            <div style={{ display: "grid", gap: 14, marginTop: 32 }}>
              <div>
                <div style={{ fontSize: 12, letterSpacing: "0.14em", color: C.grayCold, textTransform: "lowercase", marginBottom: 8 }}>tu nombre *</div>
                <input type="text" placeholder="ej: lucas" value={contactName} onChange={e => setQuoteField("contactName", e.target.value)}
                  style={inputStyle} onFocus={e => (e.currentTarget.style.borderColor = brandColor)} onBlur={e => (e.currentTarget.style.borderColor = C.line)} />
              </div>
              <div>
                <div style={{ fontSize: 12, letterSpacing: "0.14em", color: C.grayCold, textTransform: "lowercase", marginBottom: 8 }}>email *</div>
                <input type="email" placeholder="ej: lucas@minegocio.com" value={contactEmail} onChange={e => setQuoteField("contactEmail", e.target.value)}
                  style={inputStyle} onFocus={e => (e.currentTarget.style.borderColor = brandColor)} onBlur={e => (e.currentTarget.style.borderColor = C.line)} />
              </div>
              <div>
                <div style={{ fontSize: 12, letterSpacing: "0.14em", color: C.grayCold, textTransform: "lowercase", marginBottom: 8 }}>empresa o negocio (opcional)</div>
                <input type="text" placeholder={brandName || "ej: ferretería norte"} value={contactCompany} onChange={e => setQuoteField("contactCompany", e.target.value)}
                  style={inputStyle} onFocus={e => (e.currentTarget.style.borderColor = brandColor)} onBlur={e => (e.currentTarget.style.borderColor = C.line)} />
              </div>
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.14em", color: C.grayCold, textTransform: "lowercase", marginBottom: 12 }}>¿cuántas personas lo van a usar?</div>
              <div style={{ display: "flex", gap: 10 }}>
                {SIZE_OPTIONS.map(o => (
                  <div key={o.id} onClick={() => setQuoteField("size", o.id)}
                    style={{ ...cardBase, padding: "10px 18px", flex: 1, textAlign: "center", borderColor: size === o.id ? brandColor : C.line, background: size === o.id ? "rgba(216,145,73,0.08)" : C.surface }}>
                    <span style={{ fontSize: 13.5, color: size === o.id ? brandColor : C.cream }}>{o.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {submitError && (
              <div style={{ marginTop: 16, fontSize: 13, color: C.red, background: C.redBg, borderRadius: 8, padding: "10px 14px" }}>
                {submitError}
              </div>
            )}

            <button disabled={!canSubmit} onClick={onSubmit}
              style={{ ...primaryBtn, marginTop: 28, background: brandColor, color: "#fff", opacity: !canSubmit ? 0.35 : 1, cursor: !canSubmit ? "not-allowed" : "pointer", width: "100%" }}>
              {submitStatus === "loading" ? "enviando..." : "ver mi sistema →"}
            </button>
            <p style={{ fontSize: 12, color: C.grayCold, marginTop: 12, textAlign: "center" }}>no spam. te contactamos solo si tiene sentido para vos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
