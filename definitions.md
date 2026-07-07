# React — Senior Developer Topics

## Core Concepts
[001] 2026-06-29 JSX syntax and transpilation - https://chatgpt.com/c/6a42719d-2808-83e9-b2ad-35a1d4abec3e
[002] 2026-06-30 Components: function vs class (legacy) -https://chatgpt.com/c/6a439cff-ef2c-83e9-aa74-5883f9cf7b14
[003] 2026-06-30 Props and prop types / TypeScript interfaces - https://chatgpt.com/c/6a43d0a4-d084-83e9-9840-b299572debb1
[004] 2026-07-01 State and immutability - https://chatgpt.com/c/6a4508a7-8518-83e9-91f0-cbb8dfc8bada
[005] 2026-07-02 Controlled vs uncontrolled components - https://chatgpt.com/c/6a46a12f-6258-83e9-ac4f-c1353775722e
[006] 2026-07-03 Component lifecycle (mount, update, unmount) - https://chatgpt.com/c/6a47825d-a364-83e9-aaa1-2d359bf425fd
[007] 2026-07-06 Keys and reconciliation algorithm (diffing) - https://chatgpt.com/c/6a4bbc3b-5e3c-83e9-be76-dc11e3cdb312
[008] 2026-07-07 Synthetic events and event delegation - https://chatgpt.com/c/6a4cd540-4d34-83e9-ae22-4a47b47d9c11
- Portals
- Fragments (`<>...</>`)
- Error Boundaries

## Hooks
- `useState` — local state management
- `useEffect` — side effects and cleanup
- `useLayoutEffect` — synchronous DOM mutations
- `useContext` — consuming context without HOCs
- `useRef` — mutable refs, DOM access, preserving values across renders
- `useMemo` — memoizing expensive computations
- `useCallback` — stable function references
- `useReducer` — complex state logic
- `useId` — stable unique IDs for accessibility
- `useTransition` / `useDeferredValue` — concurrent rendering
- `useImperativeHandle` — customizing ref exposure
- `useDebugValue` — custom hook debugging
- Custom hooks — composing and sharing stateful logic

## Performance Optimization
- `React.memo` — preventing unnecessary re-renders
- `useMemo` and `useCallback` trade-offs
- Lazy loading with `React.lazy` and `Suspense`
- Code splitting at the route and component level
- Virtualization / windowing (e.g., react-window, react-virtual)
- Avoiding prop drilling via context or composition
- Profiler API and React DevTools Profiler
- Concurrent features: transitions and deferred values
- Batched state updates (React 18 automatic batching)

## State Management
- Local state vs lifted state vs global state
- Context API patterns and limitations
- Redux Toolkit (slices, thunks, RTK Query)
- Zustand / Jotai / Recoil (atomic state models)
- React Query / TanStack Query (server state)
- URL as state (react-router search params)
- When NOT to use global state

## Routing
- React Router v6: routes, nested routes, layouts
- `useNavigate`, `useParams`, `useLocation`, `useSearchParams`
- Loaders and actions (Data Router API)
- Protected routes and auth guards
- Lazy-loaded routes with `Suspense`
- History API and hash routing

## Data Fetching
- `fetch` inside `useEffect` patterns
- Suspense for data fetching
- TanStack Query (caching, invalidation, optimistic updates)
- SWR
- Server-Sent Events / WebSockets integration
- Optimistic UI updates
- Error and loading state handling

## Component Patterns
- Composition over inheritance
- Compound components
- Render props
- Higher-Order Components (HOCs) — when to avoid
- Controlled / uncontrolled inputs
- Forwarding refs (`React.forwardRef`)
- Slot pattern with `children` and named slots
- Headless components
- Provider pattern

## Forms
- Controlled inputs and validation
- React Hook Form — performance and ergonomics
- Formik — schema-based validation
- Zod / Yup for schema validation
- File inputs and multi-step forms
- Accessibility in forms (labels, ARIA, error messages)

## Styling Approaches
- CSS Modules
- CSS-in-JS (styled-components, Emotion)
- Tailwind CSS with React
- CSS custom properties and theming
- `clsx` / `classnames` utility

## Testing
- Unit testing with Vitest / Jest
- React Testing Library — user-centric queries and interactions
- `userEvent` vs `fireEvent`
- Mocking modules, hooks, and API calls
- Testing custom hooks with `renderHook`
- Integration and E2E testing with Playwright / Cypress
- Snapshot testing (use sparingly)
- Accessibility testing with `jest-axe`

## TypeScript with React
- Typing props, state, and events
- `React.FC` vs function declaration (prefer declaration)
- Generic components
- `ReactNode` vs `ReactElement` vs `JSX.Element`
- Discriminated unions for component variants
- Typing refs: `RefObject` vs `MutableRefObject`
- Module augmentation for custom themes / context types

## Architecture & Patterns
- Feature-based folder structure
- Separation of UI from business logic (container/presentational, hooks layer)
- Dependency injection via context
- Module boundaries and barrel exports
- Monorepo setup with Turborepo / Nx
- Design systems and component libraries

## Server-Side & Meta-Frameworks
- Next.js: pages vs app router, SSR, SSG, ISR, RSC
- Remix: loaders, actions, nested routes, progressive enhancement
- React Server Components (RSC) — server/client boundary
- Hydration and hydration mismatches
- Streaming with Suspense on the server

## Accessibility (a11y)
- Semantic HTML in React
- ARIA roles, states, and properties
- Focus management and keyboard navigation
- `useId` for associating labels
- Screen reader testing
- Color contrast and motion preferences

## Security
- Avoiding `dangerouslySetInnerHTML` (XSS)
- Sanitizing user-generated content
- Secure handling of tokens (avoid localStorage for sensitive data)
- Content Security Policy compatibility
- Dependency auditing (`npm audit`)

## Tooling & Ecosystem
- Vite — fast dev server and build
- ESLint with `eslint-plugin-react-hooks`
- Prettier for formatting
- TypeScript compiler configuration for React
- Storybook for component development and documentation
- Chromatic / Percy for visual regression testing
- Bundler analysis (rollup-plugin-visualizer)
