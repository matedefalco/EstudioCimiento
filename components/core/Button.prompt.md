Pill-shaped action button with bronze primary accent; use exactly one `primary` per view, everything else `outline`/`ghost`/`secondary`.

```jsx
<Button variant="primary" size="md">empezá tu sistema</Button>
<Button variant="outline">ver el proceso</Button>
```

Variants: `primary` (bronze fill), `secondary` (ink fill), `outline` (hairline), `ghost` (text only). Sizes `sm | md | lg`. Props: `full`, `iconLeft`, `iconRight`, `disabled`. Adapts automatically inside a `[data-theme="night"]` subtree (accent rises to copper).
