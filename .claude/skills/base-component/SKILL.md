---
name: base-component
description: >
  Rules for base (shared, reusable) components in webspaces, such as src/components/shared/Base*.
  Use when: creating or editing a Base* component or its .css.ts, styling a shared component,
  deciding where margin / positioning / CSS resets belong, or fixing a layout issue where a
  parent's className style is overridden by a child component's own style.
---

# Base Component Rules

## Core Principle

A base component cannot know where it will be placed. It owns **how it looks inside its own box**,
never **how its box sits in the parent**. Placement is always decided by the parent.

## Rules

### 1. Do not declare outer-layout properties on the root element

The root element's styles must not include any property that affects its placement in the parent:

- `margin` (any side, **including `margin: 0`**)
- `position` offsets (`top` / `right` / `bottom` / `left`), `inset`
- Flex / grid item properties: `align-self`, `justify-self`, `flex`, `flex-grow`, `flex-shrink`, `order`, `grid-area`, `grid-column`, `grid-row`
- `z-index`

`margin: 0` is also forbidden. A reset in the component has the same specificity as the parent's
`className`, so whichever stylesheet loads later wins, and the parent's margin may be silently ignored.

### 2. Allowed on the root element

Properties that define the component's own appearance:

- `display` and internal layout (`justify-content`, `align-items`, `gap`, ... for its children)
- `padding`, `border`, `border-radius`, `background`, `color`, typography, as part of the design
  (resets such as `padding: 0` are not design; see Rule 4)
- Intrinsic size when the component has a fixed design size (e.g. a 36px icon button)
- Interaction states (`:hover`, `:focus-visible`, transitions)

### 3. Accept `className` and merge it on the root

```tsx
<button className={clsx(styles.button, className)} />
```

The parent passes placement styles (margin, align-self, etc.) through `className`.

### 4. Normalize browser defaults in the global reset, not in the component

Do not assume what the browser's defaults are. Any style whose purpose is to cancel a browser
default (`margin: 0`, `padding: 0`, `border: none`, `background: transparent`, `list-style: none`,
`text-decoration: none`, ...) belongs in the global reset of `src/app/layout.css.ts`, written with
an element selector (lower specificity than a class), so a parent's `className` always wins.

```ts
globalStyle('button', { margin: 0, padding: 0, border: 'none', background: 'transparent' });
```

### 5. Do not size the root relative to the parent

Do not set parent-relative sizes on the root (`width: 100%`, `width: 70%`, `vw` / `vh`, `min-width`
/ `max-width` tuned for a specific layout). How wide a component is depends on where it is placed,
so the parent decides. A fixed design size (Rule 2) is allowed.

### 6. Do not depend on the parent context

Do not write selectors that assume a specific parent or position (`.navBar &`, `:first-child`,
`:last-child`, sibling selectors to adjust its own spacing). The component must behave the same in
any parent.

### 7. Use theme tokens for colors

Use `vars.color.*` from `src/constants/theme.css.ts` or `currentColor`. Do not hardcode color values
(`#fff`, `rgb(...)`, named colors), so the component follows light / dark themes.

### 8. Parents must not work around a child's style

If a parent's placement style does not apply because of a base component, fix the base component.
Do not compensate with extra wrappers, parent padding, or higher-specificity hacks (`&&`, `!important`).

### 9. Inner elements are free

Rules 1 and 5 apply only to the root element. Inner elements may use margin, positioning, and
relative sizes for the component's internal layout.

## Checklist

- [ ] Root style has no `margin`, position offsets, flex/grid item properties, or `z-index`
- [ ] Root has no parent-relative size
- [ ] Root merges `className` via `clsx(styles.xxx, className)`
- [ ] Browser default resets live in `src/app/layout.css.ts`, not in the component
- [ ] No selectors that depend on the parent or siblings
- [ ] Colors come from `vars.color.*` or `currentColor`
- [ ] No parent-side workaround for this component's styles
