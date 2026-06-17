Renders the four service phases (relevamiento → desarrollo → validación → traspaso) as numbered, ascending steps mirroring the logo. The signature brand storytelling element.

```jsx
<PhaseList active={1} />
<PhaseList phases={[{title:'…', desc:'…'}]} />
```

`active` highlights one phase in bronze; `-1` for none. Indent rises per row to echo the ascending steps.
