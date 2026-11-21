---
name: testing-policy
description: >
  Defines the testing policy for the webspaces project.
  Use when: writing tests, deciding what to test, choosing test structure,
  setting up mocks, checking coverage targets, adding test files, implementing
  unit tests, component tests, integration tests, or asking about testing conventions.
---

# Testing Policy

## When to Use This Skill

Load this skill whenever you need to:

- Write or review tests for this project
- Decide whether a file needs a test
- Determine the correct test structure, naming, or file placement
- Choose a mocking strategy

---

## Test Types

| Type        | Scope                                    | Tool                     |
| ----------- | ---------------------------------------- | ------------------------ |
| Unit        | Pure functions, custom hooks             | Vitest                   |
| Component   | Rendered UI, interactions, prop branches | Vitest + Testing Library |
| Integration | Page-level data flow (future)            | Vitest + Testing Library |

---

## Mandatory Test Targets

Write tests for every file in these locations:

| Location                   | Reason                                     |
| -------------------------- | ------------------------------------------ |
| `src/utils/**`             | Pure functions; fully testable without DOM |
| `src/hooks/**`             | Custom hooks; test with `renderHook`       |
| `src/components/shared/**` | Reusable components; highest ROI           |
| `src/components/blog/**`   | Domain components; varied props/states     |
| `src/components/layout/**` | Layout components; structural correctness  |

---

## Excluded from Tests

Do **not** write tests for:

| Location                                                    | Reason                                               |
| ----------------------------------------------------------- | ---------------------------------------------------- |
| `src/app/**` (page components)                              | Thin App Router wrappers; covered by integration/E2E |
| `**/*.css.ts`                                               | vanilla-extract style files; no runtime logic        |
| `src/constants/**`                                          | Static values; no behavior to assert                 |
| `src/types/**`                                              | TypeScript type definitions; compile-time only       |
| Pure presentational components already covered by Storybook | Visual correctness delegated to Storybook            |

---

## File Placement

Use **colocation**: place the test file in the same directory as the source file.

```
src/utils/dayjs/
├── index.ts
└── index.test.ts        ← colocated

src/components/shared/BaseLink/
├── BaseLink.tsx
├── BaseLink.css.ts
├── BaseLink.stories.tsx
└── BaseLink.test.tsx    ← colocated
```

File naming: `<SourceFile>.test.ts` / `<SourceFile>.test.tsx`

---

## Naming Conventions

Use `describe` blocks nested with `it()`:

```ts
describe('ComponentName / functionName', () => {
  it('renders the expected text', () => { ... });
  it('calls onClick when the button is clicked', () => { ... });

  describe('when prop X is true', () => {
    it('shows the badge', () => { ... });
    it('hides the icon', () => { ... });
  });
});
```

- `describe`: component name, function name, or condition
- `it`: plain-English description of expected behavior

---

## Coverage Thresholds

All four metrics must stay at or above **90%**:

```
statements : 90%
functions  : 90%
branches   : 90%
lines      : 90%
```

These are enforced by `vitest.config.mts`. CI will fail if any metric drops below the threshold.

---

## Snapshot Testing

Actively use snapshots where the rendered structure is the primary thing to protect:

```ts
// Inline snapshot (preferred for small outputs)
expect(container.firstChild).toMatchInlineSnapshot(`...`);

// File snapshot (for larger structures)
expect(container.firstChild).toMatchSnapshot();
```

Update snapshots deliberately with `yarn test-update` only when the UI change is intentional.

---

## Mocking Strategy

### Module Mocking (`vi.mock`)

Use `vi.mock()` to replace modules that have side effects or external dependencies:

```ts
vi.mock('@/utils/dayjs', () => ({
  formatDate: vi.fn(() => '2023-12-31')
}));
```

Keep mocks minimal — mock only what the test subject actually uses.

### API Mocking (MSW)

MSW (Mock Service Worker) is the preferred tool for intercepting HTTP requests in integration tests.
MSW is not yet installed; add it when writing integration tests that require network interception.

```bash
yarn add -D msw
```

Follow the [MSW setup guide](https://mswjs.io/docs/getting-started) to configure handlers.

### General Rules

- Prefer `vi.mock()` for module-level dependencies
- Prefer MSW for HTTP/fetch-based dependencies
- Avoid excessive mocking; if you need to mock everything, consider splitting the unit

---

## Dummy Data

Reuse the shared dummy data from `src/dummy/index.ts` instead of defining inline fixtures:

```ts
import { dummyFactory, dummyNavTemplate } from '@/dummy';

const navItems = dummyFactory(3, dummyNavTemplate);
```

Available helpers:

- `dummyFactory<T>(n, fn)` — generates an array of `n` items using factory `fn`
- Pre-built templates: `dummyNavTemplate`, etc.
- Constants: `dummyImgUrl`, `dummyUrl`, `dummyDay`

---

## Component Test Checklist

For each component test, verify:

- [ ] **Rendering**: Key text, elements, and roles are present
- [ ] **Props branches**: Conditional rendering switches correctly with different prop values
- [ ] **User interactions**: Click, input, and keyboard events produce the expected outcome
- [ ] **Snapshot**: Rendered output matches the stored snapshot (add on first pass)

---

## Unit Test Checklist

For each utility/hook test, verify:

- [ ] **Happy path**: Returns the expected value for valid input
- [ ] **Edge cases**: Empty input, boundary values, falsy values
- [ ] **Type correctness**: TypeScript types are enforced (compilation errors count as failures)

---

## Running Tests

```bash
yarn test              # Run all tests once
yarn test-update       # Re-run and update snapshots
```
