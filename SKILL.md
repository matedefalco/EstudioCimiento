---
name: estudio-cimiento-design
description: Use this skill to generate well-branded interfaces and assets for Estudio Cimiento (agencia de sistemas operativos digitales), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files (tokens, components, ui_kits, guidelines, assets).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

Core rules to internalize before producing anything:
- Voz: arquitecto cálido, español rioplatense (voseo), minúscula como tratamiento de marca, sin jerga de IT, sin emojis, sin guion largo dentro de oraciones, sin frases de contraste "no es X, es Y". Punto principal primero, pedido al final, corto por defecto.
- Color: paleta día (crema/tinta/bronce) como principal, noche (acero/cobre) como variante vía `data-theme="night"`. Acento metálico solo en dosis chicas.
- Tipo: Hanken Grotesk, titulares en peso 500, overline de tracking ancho en acento.
- Forma: aire generoso, hairlines hacen la separación, sombra solo cuando algo flota, radios restringidos.
- Símbolo: copiar `assets/symbol-*.svg`, nunca redibujar.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
