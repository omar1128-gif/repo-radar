# Repo Radar

Search GitHub repositories, track the ones you care about, and watch their stats.

## The task

Build a dashboard that lets users search GitHub repositories, track their favorites, and monitor their latest stats.

Required: React 19 + TypeScript, Redux Toolkit or Zustand, MUI, the GitHub REST API, deployed on Vercel.

## Features

- Debounced repository search, with pagination and a page size selector
- Track and untrack from the search results, with the count on the Tracked tab
- Tracked view with stars, open issues, last commit and last push per repo
- Refresh one repo or all of them
- Separate loading and error states for every repo
- Tracked repos saved in localStorage, validated when read back
- Bar chart of stars per tracked repo
- Light and dark theme

## Layout

npm workspaces, with the app and two shared packages:

```
apps/web         the dashboard
packages/ui      EmptyState, RepoStat, ResponsiveTooltip, the MUI theme
packages/plots   the bar chart
```

The packages are internal and consumed as TypeScript source, so there is no build step for them. Vite compiles them with the app. They also can't import anything from `apps/`, and ESLint fails if they try.

## Running it

```bash
npm install
npm run dev
```

Run everything from the root: `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. The build ends up in `apps/web/dist`.

You can add a GitHub token in `apps/web/.env` to get a higher rate limit while developing. The app works without one.

```
VITE_GITHUB_TOKEN=your_token
```

## Decisions

- **bullet-proof-react folder structure.** Each feature keeps its own api, components, store and types. Only shared things go in `src/components` and `src/utils`.
- **npm workspaces.** This is my first monorepo, so I kept it to what npm already gives you and added no extra tooling. The packages are consumed as source, and they keep React and MUI as peer dependencies so the bundle only ever has one copy of them.
- **Features don't import each other.** Search results render their Track button through a `renderRepoActions` prop, and `app.tsx` passes it in.
- **Redux Toolkit instead of Zustand.** I've used RTK before, and RTK Query comes with it, so caching, invalidation and loading states are handled. With Zustand I would have added TanStack Query next to it, since Zustand only covers client state. Redux DevTools also helps a lot while debugging.
- **User choices go in a slice, server data goes in RTK Query.** The slice keeps which repos are tracked, because that's a user choice that must survive a reload. Stars, issues and commits come from the cache, because they belong to the server and go stale right away. Search text, page and the active tab stay in component state.
- **One query per repo.** `getRepoStats` runs the repo request and the latest commit request together in one `queryFn`. Each repo gets its own cache entry, so each card has its own loading state, error and `refetch` without extra bookkeeping.
- **Refresh all is one line.** `invalidateTags(['RepoStats'])`, and every card reloads on its own.
- **The chart reads the cache.** It takes stars from the same entries the cards already fetched, so it makes no requests of its own and updates when a card refreshes.
- **No redux-persist.** I've used it before on React 18, but it hasn't been maintained for years and people have reported problems with React 19, so I didn't want to depend on it here. Instead the slice loads from localStorage in a lazy `initialState`, and listener middleware saves on track and untrack. A type guard checks what comes back, so bad or old data gives an empty list instead of a crash, and the key is versioned so the format can change later.

## Limitations

- **Rate limit.** Without a token GitHub allows 60 requests an hour and 10 searches a minute per IP. Each tracked repo costs 2 requests, so refreshing 10 repos costs 20. I used a token locally but did not set it on Vercel, because Vite puts `VITE_*` variables into the bundle and the token would be public. Rate limit errors get their own message, and a failed refresh keeps the numbers already on screen.
- **Search is capped.** GitHub returns at most 1000 search results and at most 100 per page, no matter how large the total is. The page count is based on what you can actually reach.
- **Open issues include pull requests.** `open_issues_count` counts both, same as GitHub's own UI. Splitting them would need another search request per repo, on a stricter quota.
- **Pushed and committed are different dates.** `pushed_at` is the last push to any branch. The commit date is the latest commit on the default branch. A branch push or a force push moves one and not the other, so both are shown.
- **Search results lag a little.** They come from GitHub's search index, so stars can differ slightly from the tracked view until you refresh.

## Tests

Vitest and Testing Library, on the parts where a mistake would be silent:

- the tracked repos reducer
- reading and writing localStorage, including invalid JSON, wrong shapes and storage that throws
- API error messages
- the pagination helper
- two repo cards rendered together where one request fails, checking the other is unaffected

```bash
npm test
```
