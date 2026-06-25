"use client";
import { useState } from "react";
import { C } from "./constants";

// ── isometric math ────────────────────────────────────────────────────────────
const S = 16,
	CX = 135,
	CY = 195;

function iso(x: number, y: number, z: number): [number, number] {
	return [CX + (x - y) * S * 0.866, CY + (x + y) * S * 0.5 - z * S];
}
function p(x: number, y: number, z: number) {
	const [a, b] = iso(x, y, z);
	return `${a.toFixed(1)},${b.toFixed(1)}`;
}
function xy(x: number, y: number, z: number) {
	const [a, b] = iso(x, y, z);
	return { x: a, y: b };
}

// ── building data ─────────────────────────────────────────────────────────────
const FLOORS = [
	{ x0: 0, y0: 0, x1: 6, y1: 4, z0: 0, z1: 3 }, // sabiduría
	{ x0: 0.5, y0: 0.25, x1: 5.5, y1: 3.75, z0: 3, z1: 6 }, // trabajo
	{ x0: 1, y0: 0.5, x1: 5, y1: 3.5, z0: 6, z1: 9 }, // belleza
];

const PRINCIPIOS = [
	{
		id: "sabiduría",
		title: "sabiduría",
		tag: "el criterio es el límite",
		body: "sabiduría como el grado más alto del conocimiento: no información acumulada, sino la capacidad de usarla bien. en cada proyecto, eso tiene una sola traducción. no construimos lo que no podemos explicar.",
	},
	{
		id: "trabajo",
		title: "trabajo",
		tag: "la acción define",
		body: "trabajo como el esfuerzo humano aplicado a la producción. aplicado. no pensado, no planificado: ejecutado. sin esa ejecución nada existe. hacemos, ajustamos, volvemos a hacer.",
	},
	{
		id: "belleza",
		title: "belleza",
		tag: "la forma importa",
		body: "belleza como la propiedad de las cosas que hace amarlas. esa propiedad no aparece al final: está en cada decisión de diseño desde la primera línea. cuando la forma y la función coinciden, el resultado no necesita explicación.",
	},
];

// hotspot positions: front-right edge, mid-height of each floor
const HOTSPOTS = FLOORS.map((f) => xy(f.x1, f.y0, (f.z0 + f.z1) / 2));

// ── label icons (small, centered at origin) ───────────────────────────────────
function LabelIcon({
	type,
	x,
	y,
	color,
	opacity,
}: {
	type: number;
	x: number;
	y: number;
	color: string;
	opacity: number;
}) {
	return (
		<g
			transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`}
			stroke={color}
			strokeOpacity={opacity}
			fill="none"
			strokeLinecap="round"
		>
			{type === 0 && ( // raíces
				<>
					<line x1="0" y1="-9" x2="0" y2="0" strokeWidth="1.1" />
					<line x1="0" y1="0" x2="-6" y2="9" strokeWidth="0.9" />
					<line x1="0" y1="0" x2="6" y2="9" strokeWidth="0.9" />
					<line
						x1="-3"
						y1="4.5"
						x2="-8"
						y2="9"
						strokeWidth="0.65"
						strokeOpacity={opacity * 0.6}
					/>
					<line
						x1="3"
						y1="4.5"
						x2="8"
						y2="9"
						strokeWidth="0.65"
						strokeOpacity={opacity * 0.6}
					/>
				</>
			)}
			{type === 1 && ( // estratos
				<>
					<rect
						x="-8"
						y="5"
						width="16"
						height="4.5"
						rx="0.5"
						strokeWidth="0.8"
						fill={color}
						fillOpacity={opacity * 0.18}
					/>
					<rect
						x="-6"
						y="-1"
						width="12"
						height="4.5"
						rx="0.5"
						strokeWidth="0.8"
						fill={color}
						fillOpacity={opacity * 0.13}
					/>
					<rect
						x="-4"
						y="-7"
						width="8"
						height="4.5"
						rx="0.5"
						strokeWidth="0.8"
						fill={color}
						fillOpacity={opacity * 0.08}
					/>
				</>
			)}
			{type === 2 && ( // flor geométrica (7 círculos: centro + 6 pétalos)
				<>
					{(
						[
							[0.5, 0],
							[0, -0.5],
							[0.5, 0.5],
							[-0.5, 0],
							[0, 0.5],
							[-0.5, -0.5],
						] as [number, number][]
					).map(([dx, dy], i) => {
						const [px, py] = iso(dx, dy, 0);
						const cx = px - CX;
						const cy2 = py - CY;
						return (
							<circle
								key={i}
								cx={cx * 0.28}
								cy={cy2 * 0.28}
								r="3.8"
								strokeWidth="0.7"
							/>
						);
					})}
					<circle cx="0" cy="0" r="3.8" strokeWidth="0.7" />
				</>
			)}
		</g>
	);
}

// ── floor geometry + decoration ───────────────────────────────────────────────
function IsoFloor({
	idx,
	active,
	hovered,
	onClick,
	onHover,
	isDark,
}: {
	idx: number;
	active: boolean;
	hovered: boolean;
	onClick: () => void;
	onHover: (v: boolean) => void;
	isDark: boolean;
}) {
	const f = FLOORS[idx];
	const { x0, y0, x1, y1, z0, z1 } = f;

	const accent = isDark ? C.copper : "#B5863C";
	const neutral = isDark ? C.cream : "#1C1E22";
	const strokeC = active ? accent : isDark ? "#8A93A0" : "#8A8276";
	const fillC = active ? accent : neutral;

	const tOp = active ? 0.28 : hovered ? 0.15 : 0.07;
	const rOp = active ? 0.16 : hovered ? 0.09 : 0.04;
	const lOp = active ? 0.12 : hovered ? 0.07 : 0.03;
	const sOp = active ? 0.88 : hovered ? 0.56 : 0.32;
	const dOp = active ? 0.52 : hovered ? 0.28 : 0.14;

	const midY = (y0 + y1) / 2;

	return (
		<g
			onClick={onClick}
			onMouseEnter={() => onHover(true)}
			onMouseLeave={() => onHover(false)}
			style={{ cursor: "pointer" }}
		>
			{/* top face */}
			<polygon
				points={[
					p(x0, y0, z1),
					p(x1, y0, z1),
					p(x1, y1, z1),
					p(x0, y1, z1),
				].join(" ")}
				fill={fillC}
				fillOpacity={tOp}
				stroke={strokeC}
				strokeWidth="0.85"
				strokeOpacity={sOp}
				style={{ transition: "all 280ms ease" }}
			/>
			{/* right face (x=x1) */}
			<polygon
				points={[
					p(x1, y0, z0),
					p(x1, y0, z1),
					p(x1, y1, z1),
					p(x1, y1, z0),
				].join(" ")}
				fill={fillC}
				fillOpacity={rOp}
				stroke={strokeC}
				strokeWidth="0.85"
				strokeOpacity={sOp}
				style={{ transition: "all 280ms ease" }}
			/>
			{/* left face (y=y1) */}
			<polygon
				points={[
					p(x0, y1, z0),
					p(x1, y1, z0),
					p(x1, y1, z1),
					p(x0, y1, z1),
				].join(" ")}
				fill={fillC}
				fillOpacity={lOp}
				stroke={strokeC}
				strokeWidth="0.85"
				strokeOpacity={sOp}
				style={{ transition: "all 280ms ease" }}
			/>

			{/* ── sabiduría: raíces en cara derecha ── */}
			{idx === 0 &&
				(() => {
					const trunk0 = xy(x1, midY, z0 + 0.35);
					const trunk1 = xy(x1, midY, z1 - 0.35);
					const fork = xy(x1, midY, z0 + 1.2);
					const bl = xy(x1, y0 + 0.6, z0 + 0.2);
					const br = xy(x1, y1 - 0.6, z0 + 0.2);
					const ml = xy(x1, y0 + 1.3, z0 + 0.65);
					const mr = xy(x1, y1 - 1.3, z0 + 0.65);
					const bll = xy(x1, y0 + 0.3, z0 + 0.1);
					const brr = xy(x1, y1 - 0.3, z0 + 0.1);
					return (
						<g
							stroke={strokeC}
							strokeOpacity={dOp}
							fill="none"
							strokeLinecap="round"
							style={{ transition: "stroke-opacity 280ms ease" }}
						>
							<line
								x1={trunk0.x}
								y1={trunk0.y}
								x2={trunk1.x}
								y2={trunk1.y}
								strokeWidth="1.1"
							/>
							<line
								x1={fork.x}
								y1={fork.y}
								x2={bl.x}
								y2={bl.y}
								strokeWidth="0.85"
							/>
							<line
								x1={fork.x}
								y1={fork.y}
								x2={br.x}
								y2={br.y}
								strokeWidth="0.85"
							/>
							<line
								x1={ml.x}
								y1={ml.y}
								x2={bll.x}
								y2={bll.y}
								strokeWidth="0.65"
							/>
							<line
								x1={mr.x}
								y1={mr.y}
								x2={brr.x}
								y2={brr.y}
								strokeWidth="0.65"
							/>
						</g>
					);
				})()}

			{/* ── trabajo: estratos en cara derecha ── */}
			{idx === 1 &&
				[0.65, 1.3, 1.95, 2.6].map((dz, i) => {
					const a = xy(x1, y0 + 0.35, z0 + dz);
					const b = xy(x1, y1 - 0.35, z0 + dz);
					return (
						<line
							key={i}
							x1={a.x}
							y1={a.y}
							x2={b.x}
							y2={b.y}
							stroke={strokeC}
							strokeWidth="0.85"
							strokeOpacity={dOp * (1 - i * 0.14)}
							style={{ transition: "stroke-opacity 280ms ease" }}
						/>
					);
				})}

			{/* ── belleza: flor geométrica en cara superior ── */}
			{idx === 2 &&
				(() => {
					const cx2 = (x0 + x1) / 2;
					const cy2 = (y0 + y1) / 2;
					const r = 0.5;
					const petalOffsets: [number, number][] = [
						[r, 0],
						[0, -r],
						[r, r],
						[-r, 0],
						[0, r],
						[-r, -r],
					];
					const center = xy(cx2, cy2, z1);
					const petals = petalOffsets.map(([dx, dy]) =>
						xy(cx2 + dx, cy2 + dy, z1),
					);
					// petal radius in SVG px
					const pr = Math.sqrt(
						Math.pow(petals[0].x - center.x, 2) +
							Math.pow(petals[0].y - center.y, 2),
					);
					return (
						<g
							stroke={strokeC}
							strokeOpacity={dOp}
							fill="none"
							strokeWidth="0.75"
							style={{ transition: "stroke-opacity 280ms ease" }}
						>
							{petals.map((pt2, i) => (
								<circle key={i} cx={pt2.x} cy={pt2.y} r={pr} />
							))}
							<circle cx={center.x} cy={center.y} r={pr} />
						</g>
					);
				})()}
		</g>
	);
}

// ── roof ──────────────────────────────────────────────────────────────────────
function Roof({
	active,
	hovered,
	onClick,
	onHover,
	isDark,
}: {
	active: boolean;
	hovered: boolean;
	onClick: () => void;
	onHover: (v: boolean) => void;
	isDark: boolean;
}) {
	const accent = isDark ? C.copper : "#B5863C";
	const neutral = isDark ? C.cream : "#1C1E22";
	const strokeC = active ? accent : isDark ? "#8A93A0" : "#8A8276";
	const fillC = active ? accent : neutral;
	const sOp = active ? 0.88 : hovered ? 0.56 : 0.28;
	const fOp = active ? 0.22 : hovered ? 0.1 : 0.04;

	return (
		<g
			onClick={onClick}
			onMouseEnter={() => onHover(true)}
			onMouseLeave={() => onHover(false)}
			style={{ cursor: "pointer" }}
		>
			<polygon
				points={[p(5, 0.5, 9), p(3, 2, 11), p(5, 3.5, 9)].join(" ")}
				fill={fillC}
				fillOpacity={fOp}
				stroke={strokeC}
				strokeWidth="0.85"
				strokeOpacity={sOp}
				style={{ transition: "all 280ms ease" }}
			/>
			<polygon
				points={[p(1, 0.5, 9), p(5, 0.5, 9), p(3, 2, 11)].join(" ")}
				fill={fillC}
				fillOpacity={fOp * 0.6}
				stroke={strokeC}
				strokeWidth="0.85"
				strokeOpacity={sOp}
				style={{ transition: "all 280ms ease" }}
			/>
			<polygon
				points={[p(1, 0.5, 9), p(3, 2, 11), p(1, 3.5, 9)].join(" ")}
				fill={fillC}
				fillOpacity={fOp * 0.3}
				stroke={strokeC}
				strokeWidth="0.85"
				strokeOpacity={sOp * 0.7}
				style={{ transition: "all 280ms ease" }}
			/>
		</g>
	);
}

// ── main component ────────────────────────────────────────────────────────────
const primaryBtn = (isDark: boolean): React.CSSProperties => ({
	background: isDark ? C.copper : "#B5863C",
	color: isDark ? C.steel : "#FFFFFF",
	fontSize: 14,
	fontWeight: 600,
	letterSpacing: "0.04em",
	textTransform: "lowercase",
	padding: "14px 28px",
	borderRadius: 4,
	border: "none",
	cursor: "pointer",
	fontFamily: "inherit",
});

interface Props {
	onDone: () => void;
	isDark?: boolean;
}

export function PrincipiosIso({ onDone, isDark = true }: Props) {
	const [active, setActive] = useState<number | null>(null);
	const [hovered, setHovered] = useState<number | null>(null);

	const accent = isDark ? C.copper : "#B5863C";
	const muted = isDark ? C.grayCold : "#8A8276";
	const textC = isDark ? C.cream : "#1C1E22";
	const borderC = isDark ? C.lineStrong : "rgba(28,30,34,0.12)";
	const cardBg = isDark ? "rgba(242,240,234,0.04)" : "rgba(28,30,34,0.03)";

	const activePrincipio = active !== null ? PRINCIPIOS[active] : null;

	return (
		<div
			style={{
				maxWidth: 820,
				width: "100%",
				display: "flex",
				flexDirection: "column",
				gap: 24,
			}}
		>
			<div
				style={{
					fontSize: 11,
					letterSpacing: "0.28em",
					color: muted,
					textTransform: "lowercase",
					textAlign: "center",
				}}
			>
				nuestros principios
			</div>
			<div
				style={{
					fontSize: 14,
					color: muted,
					lineHeight: 1.6,
					textAlign: "center",
					maxWidth: 420,
					margin: "0 auto",
				}}
			>
				tres principios, ninguno separado de los otros. tocá cada nivel para ver
				qué sostiene la estructura.
			</div>

			<div
				style={{
					display: "flex",
					gap: 24,
					alignItems: "center",
					justifyContent: "center",
					flexWrap: "wrap",
				}}
			>
				{/* isometric SVG */}
				<svg
					viewBox="0 0 420 260"
					width={420}
					style={{ flex: "0 0 auto", maxWidth: "100%", overflow: "visible" }}
				>
					{/* foundation slab */}
					<polygon
						points={[p(0, 0, -0.3), p(6, 0, -0.3), p(6, 0, 0), p(0, 0, 0)].join(
							" ",
						)}
						fill={isDark ? C.cream : "#1C1E22"}
						fillOpacity="0.04"
						stroke={isDark ? "#8A93A0" : "#8A8276"}
						strokeWidth="0.7"
						strokeOpacity="0.22"
					/>
					<polygon
						points={[
							p(0, 0, -0.3),
							p(0, 4, -0.3),
							p(6, 4, -0.3),
							p(6, 0, -0.3),
						].join(" ")}
						fill={isDark ? C.cream : "#1C1E22"}
						fillOpacity="0.03"
						stroke={isDark ? "#8A93A0" : "#8A8276"}
						strokeWidth="0.7"
						strokeOpacity="0.18"
					/>
					<polygon
						points={[p(0, 4, -0.3), p(0, 4, 0), p(6, 4, 0), p(6, 4, -0.3)].join(
							" ",
						)}
						fill={isDark ? C.cream : "#1C1E22"}
						fillOpacity="0.025"
						stroke={isDark ? "#8A93A0" : "#8A8276"}
						strokeWidth="0.7"
						strokeOpacity="0.15"
					/>

					{/* floors bottom-to-top */}
					{FLOORS.map((_, i) => (
						<IsoFloor
							key={i}
							idx={i}
							active={active === i}
							hovered={hovered === i}
							onClick={() => setActive(active === i ? null : i)}
							onHover={(v) => setHovered(v ? i : null)}
							isDark={isDark}
						/>
					))}

					{/* roof (part of belleza — floor 2) */}
					<Roof
						active={active === 2}
						hovered={hovered === 2}
						onClick={() => setActive(active === 2 ? null : 2)}
						onHover={(v) => setHovered(v ? 2 : null)}
						isDark={isDark}
					/>

					{/* connector lines + hotspot dots + label icons + text */}
					{HOTSPOTS.map((hs, i) => {
						const isAct = active === i;
						const isHov = hovered === i;
						const lineC = isAct ? accent : isHov ? accent : muted;
						const lineOp = isAct ? 0.88 : isHov ? 0.55 : 0.28;
						const labelC = isAct ? accent : isHov ? textC : muted;
						const textOp = isAct ? 1 : isHov ? 0.75 : 0.5;
						const lineEnd = { x: hs.x + 34, y: hs.y };
						const iconX = hs.x + 48;
						const nameX = hs.x + 70;

						return (
							<g
								key={i}
								onClick={() => setActive(active === i ? null : i)}
								onMouseEnter={() => setHovered(i)}
								onMouseLeave={() => setHovered(null)}
								style={{ cursor: "pointer" }}
							>
								{/* dashed connector */}
								<line
									x1={hs.x}
									y1={hs.y}
									x2={lineEnd.x}
									y2={lineEnd.y}
									stroke={lineC}
									strokeWidth="0.85"
									strokeOpacity={lineOp}
									strokeDasharray={isAct ? "none" : "2.5 2"}
									style={{ transition: "all 280ms ease" }}
								/>
								{/* hotspot circle */}
								<circle
									cx={hs.x}
									cy={hs.y}
									r={isAct ? 4 : 2.5}
									fill={isAct ? accent : "none"}
									stroke={lineC}
									strokeWidth="1"
									strokeOpacity={lineOp}
									style={{ transition: "all 280ms ease" }}
								/>
								{/* small symbol icon */}
								<LabelIcon
									type={i}
									x={iconX}
									y={hs.y}
									color={labelC}
									opacity={isAct ? 0.9 : isHov ? 0.65 : 0.4}
								/>
								{/* principle name */}
								<text
									x={nameX}
									y={hs.y + 4.5}
									fontFamily="'Hanken Grotesk', system-ui, sans-serif"
									fontSize="11.5"
									letterSpacing="0.08em"
									fill={labelC}
									fillOpacity={textOp}
									textAnchor="start"
									style={{ transition: "all 280ms ease", userSelect: "none" }}
								>
									{PRINCIPIOS[i].title}
								</text>
							</g>
						);
					})}
				</svg>

				{/* text card — aparece al activar un piso */}
				{activePrincipio && (
					<div
						key={activePrincipio.id}
						className="fade-stage"
						style={{
							flex: "1 1 240px",
							maxWidth: 280,
							background: cardBg,
							border: `1px solid ${accent}`,
							borderRadius: 14,
							padding: "24px 20px",
							display: "flex",
							flexDirection: "column",
							gap: 14,
						}}
					>
						<div
							style={{
								fontSize: 11,
								color: accent,
								letterSpacing: "0.22em",
								textTransform: "lowercase",
							}}
						>
							{activePrincipio.tag}
						</div>
						<div
							style={{
								fontSize: 22,
								fontWeight: 500,
								color: textC,
								textTransform: "lowercase",
								letterSpacing: "-0.01em",
								lineHeight: 1.2,
							}}
						>
							{activePrincipio.title}
						</div>
						<div style={{ fontSize: 13.5, color: muted, lineHeight: 1.65 }}>
							{activePrincipio.body}
						</div>
					</div>
				)}
			</div>

			<div style={{ textAlign: "center", marginTop: 40 }}>
				<button onClick={onDone} style={primaryBtn(isDark)}>
					quiero mi cotización →
				</button>
			</div>
		</div>
	);
}
