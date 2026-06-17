# UI Kit · Operaciones (el wedge)

Recreación del producto de entrada de Estudio Cimiento: un sistema de operaciones y tareas estilo Notion, productizado y a medida. Es lo que el cliente recibe y aprende a manejar solo.

## Pantalla
- `index.html` — sistema de operaciones completo, interactivo (tabla ↔ tablero, navegación de workspace).

## Componentes
- `OpsSidebar.jsx` — navegación del workspace del cliente; "finanzas" aparece como expansión futura (upsell), no como feature presente.
- `OpsBoard.jsx` — superficie de trabajo: KPIs, tabla de tareas y vista de tablero. Usa `Badge`, `Tag`, `Card`, `Button` del sistema.

## Notas
- Datos de ejemplo (negocio ficticio "negocio de ana"). El caso real Gryphon vive en el landing.
- Paleta día por defecto; el sistema soporta noche envolviendo la raíz en `data-theme="night"`.
- No se inventan features fuera del alcance del wedge: operaciones, tareas, comitentes y bases de datos. Finanzas queda explícitamente marcada como próxima.
