# React — Senior Developer Topics

## Core Concepts
- JSX syntax and transpilation
- Components: function vs class (legacy)
- Props and prop types / TypeScript interfaces
- State and immutability
- Controlled vs uncontrolled components
- Component lifecycle (mount, update, unmount)
- Keys and reconciliation algorithm (diffing)
- Synthetic events and event delegation
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
