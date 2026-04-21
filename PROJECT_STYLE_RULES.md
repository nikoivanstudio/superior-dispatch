# Project Style Rules

These rules define the default implementation style for this repository. Future tasks should read and follow this file before making UI changes.

## UI primitives

- Use `shadcn/ui` primitives for interactive controls in frontend apps.
- Replace raw `<button>` with the local `Button` wrapper when working in apps that expose it.
- Replace raw `<input>` with the local `Input` wrapper when working in apps that expose it.
- Replace raw `<a>` with framework navigation components when available.
- In `carrier-crm`, use `Link` from `react-router` instead of raw anchors, including for `tel:` targets when no native anchor is required.

## Visual consistency

- Do not change the design unless the task explicitly asks for a redesign.
- When migrating native elements to shared UI primitives, preserve existing class names and behavior so the rendered UI stays visually identical.
- Prefer composition over restyling: pass existing classes into shared primitives instead of rewriting the appearance.

## Working agreement

- Treat this file as the source of truth for style preferences that the user wants enforced across future changes.
- Extend this file incrementally as new rules appear instead of scattering style instructions across unrelated files.
