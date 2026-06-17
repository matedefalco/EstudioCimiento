# estudio cimiento — sistema de diseño

**Agencia de sistemas operativos digitales para pequeños negocios y emprendedores.**
Fundada por Suka (Mateo De Falco).

> sistemas que ordenan tu operación.
> construimos la base digital de tu negocio y te dejamos al mando.

Estudio Cimiento construye la base digital de pequeños negocios y los deja al mando de su propia operación. El producto real es criterio organizativo: captar cómo funciona el negocio del cliente y bajarlo a estructura digital. La tecnología (Notion, IA, web) es el vehículo; el diferencial es el **traspaso**: el cliente termina autónomo, no dependiente.

---

## Qué contiene este repositorio

Este repositorio es el **sistema de diseño de Estudio Cimiento**: la base visual y de componentes para todas las interfaces de la marca.

- **Tokens de diseño** (`tokens/`) — color, tipografía, espaciado, efectos e imports de fuentes como propiedades CSS personalizadas
- **Componentes core** (`components/`) — componentes React (JSX) con definiciones TypeScript y prompts de uso
- **UI kit landing** (`ui_kits/landing/`) — hero, nav, proceso, prueba y wedge para el sitio de marca
- **UI kit operaciones** (`ui_kits/operaciones/`) — el tablero de operaciones y tareas estilo Notion (el producto de entrada)
- **Assets de marca** (`assets/`) — logos y símbolo en SVG en todas sus variantes
- **Guidelines** (`guidelines/`) — tarjetas HTML de especímenes para cada categoría de tokens
- **Punto de entrada CSS** (`styles.css`) — un solo import que jalona todos los tokens

---

## Paleta de colores

El sistema tiene dos modos. **El día es el principal**; el nocturno se activa con `data-theme="night"`.

| Rol | Día | Noche |
|---|---|---|
| Fondo | `#F4F0E8` (crema) | `#1E2530` (acero) |
| Superficie elevada | crema cálido | `#2A323F` |
| Tinta / texto | `#1C1E22` | `#F2F0EA` (crema) |
| Texto secundario | `#8A8276` (gris cálido) | `#8A93A0` (gris frío) |
| Acento metálico | `#B5863C` (bronce) | `#D89149` (cobre) |

**Regla del acento:** el metálico va en dosis chicas: símbolo, hairline, detalle, un solo CTA primario. Nunca grandes áreas metálicas.

---

## Tipografía

- **Principal:** [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) — grotesque humanista, pesos 300–700
- **Mono:** JetBrains Mono — para tablas de datos y código
- Titulares en peso **500 (medium)** con tracking negativo (`-0.02em`)
- El **overline** es el gesto tipográfico firma: minúscula, tracking ancho (`0.32em`), color acento

> Si tenés licencia de General Sans, reemplazá Hanken Grotesk en `tokens/fonts.css`.

---

## Cómo usar

### Tokens

Enlazá `styles.css` como único punto de entrada; importa todos los archivos de tokens:

```html
<link rel="stylesheet" href="/styles.css">
```

Luego usá las propiedades CSS personalizadas en tus estilos:

```css
.mi-elemento {
  background: var(--surface-base);
  color: var(--ink-primary);
  border-color: var(--accent);
}
```

### Componentes

Los componentes están en `components/` como JSX con definiciones TypeScript. Cada uno incluye un `.prompt.md` que documenta intención y uso para desarrollo asistido por IA.

```jsx
import Button from './components/core/Button'
import Logo from './components/brand/Logo'
import PhaseList from './components/brand/PhaseList'
```

---

## Estructura de carpetas

```
EstudioCimiento/
├── styles.css                  # Punto de entrada CSS (importa todos los tokens)
├── SKILL.md                    # Definición de Agent Skill para Claude Code
├── tokens/
│   ├── colors.css              # Propiedades de color (día + noche)
│   ├── typography.css          # Escala tipográfica
│   ├── spacing.css             # Espaciado base 8px y radios de borde
│   ├── effects.css             # Sombras y transiciones
│   └── fonts.css               # @font-face / import de Google Fonts
├── assets/
│   ├── logo-day.svg            # Lockup completo, paleta día
│   ├── logo-night.svg          # Lockup completo, paleta noche
│   ├── symbol.svg              # Solo el símbolo (currentColor)
│   ├── symbol-bronze.svg       # Símbolo, acento día
│   └── symbol-copper.svg       # Símbolo, acento noche
├── components/
│   ├── core/                   # Button, Badge, Tag, Card
│   ├── forms/                  # Input
│   └── brand/                  # Logo, Overline, PhaseList
├── ui_kits/
│   ├── landing/                # Secciones del sitio de marca
│   └── operaciones/            # Tablero de operaciones y tareas (producto de entrada)
└── guidelines/                 # Tarjetas HTML de especímenes del sistema de diseño
```

---

## Las cuatro fases del servicio

El proceso de Estudio Cimiento sigue cuatro fases estructuradas, representadas como escalones ascendentes (el símbolo de la marca):

1. **Relevamiento** — Entender cómo funciona hoy el negocio
2. **Desarrollo** — Construir el sistema a medida
3. **Validación** — Probar con el cliente y ajustar
4. **Traspaso** — El cliente queda al mando de su propia operación

Estas fases aparecen como el componente de marca `PhaseList`.

---

## Caso de prueba: Gryphon

Una financiera manejaba toda su base de datos en un Excel que le quedó corto al querer escalar. Suka desarrolló una plataforma de gestión online con interfaz a medida: administración de comitentes, visualización de operaciones en distintos mercados, bases de datos ordenadas y sistema de tareas. El resultado fue una reducción amplia de tiempos operativos; el cliente usa el sistema y está conforme.

> Formato: contexto, problema, solución, resultado. (**Pendiente:** confirmar métricas exactas del ahorro de tiempo antes de publicarlas.)

---

## Agent Skill para Claude Code

`SKILL.md` en la raíz del repositorio define un **Agent Skill** para Claude Code. Cuando este repo se carga como skill, Claude se convierte en un diseñador experto de Estudio Cimiento, capaz de generar prototipos HTML, componentes de producción y assets de marca siguiendo todas las guías visuales y de voz documentadas acá.

Invocalo con `/estudio-cimiento-design` en una sesión de Claude Code que tenga este repo configurado como fuente de skill.
