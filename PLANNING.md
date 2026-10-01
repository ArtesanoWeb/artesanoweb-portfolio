# Portfolio Redesign — VS Code Theme

**Status:** Planning — nothing implemented yet. Working on `develop`. The
current minimal site stays live on `main` until this is ready to replace it.

## Goal

A "pro" portfolio themed as a VS Code window. Starts in **light theme**
only — dark theme is a deliberate later iteration (the current site already
has the CSS variable infrastructure for it, so it's a matter of extending
the theme, not rebuilding it).

## Core concept

The whole site is chrome-styled like a VS Code window:

- **Title bar** — window controls (decorative).
- **File explorer sidebar** — static sections as "files": `about.ts`,
  `skills.ts`, `contact.ts`, `blog/`. Clicking a file opens it as a real tab
  in the editor (open/close tabs, not just scroll-to-anchor like the current
  site).
- **Editor area (center)** — real tabbed interface. Content inside tabs is
  styled as literal code (e.g. `about.ts` renders as a typed object
  literal), not prose with syntax-highlighting bolted on.
- **Status bar (bottom)** — decorative (branch name, cursor position, etc.)
- **Terminal panel** — simulated (scripted commands, not a real shell). See
  below.
- **"Artesan Code" panel** — a custom panel styled after the real **Claude
  Code VS Code extension's** agent-flow UI. This is the main/landing view —
  it fully replaces the live-GitHub-fetch Projects grid from the current
  site. Experience *and* Projects both live here, not in the file tree.

## The Artesan Code panel, in detail

- A vertical, scrollable log of "steps" — one per Experience/Project entry
  — styled like a Claude Code tool call:
  - **`in`** block: the assignment (role, company, period).
  - **`out`** block: the result (bullets / outcomes).
  - Both collapsed by default, like a real agent trace.
- Clicking a step's `in`/`out` **opens a new tab** in the main editor
  showing that entry rendered as syntax-highlighted **TSX "source code"** —
  a stylized fake component representing the experience/project, not just
  an inline expansion.
- Steps **don't populate instantly** — each one plays its own short "agent
  working" animation (e.g. a brief typing/streaming effect) before
  revealing its `in`/`out` content. This is the same theming as the boot
  sequence, applied per-entry rather than just once at load.
- **Boot sequence on page load**: before the panel is usable, it plays a
  short animation as if the agent were starting up — like Claude Code's own
  boot/init sequence. The steps it appears to run are, literally, what's
  loading the Experience entries (static, instant) and the Projects entries
  (real network fetch to the GitHub API — this animation isn't purely
  decorative, it can be wired to the actual `Suspense`/fetch state so the
  theming matches real loading time instead of faking a delay). Once
  "booted," the in/out steps populate progressively rather than all
  appearing at once.
  - Plays **once per visit** (session-scoped, e.g. `sessionStorage` — not
    every time the tab is reopened within the same visit).
  - **Chat-style intro, before the boot sequence**: the very first thing a
    visitor sees is a chat-input-style screen (mimicking the Claude Code
    prompt box) with a welcome message/prompt (e.g. "Welcome to the
    portfolio"). Submitting/triggering it kicks off the boot sequence,
    which then opens into the full VS Code workspace. Must be
    **skippable** (a click / "skip intro") so repeat visitors or anyone in
    a hurry isn't forced to sit through it.

## Menu bar

Functional, not just decorative chrome:

- **File** → "Save As → PDF" downloads the CV.
- **Edit** → "Find" filters Experience/Projects entries by keyword; "Copy
  Email" quick action.
- **Selection** → "Select All" selects all text in the active tab (real
  browser selection); "Copy" copies the active tab's content to the
  clipboard. Faithful to what Selection does in real VS Code, scoped to
  read-only content instead of editable code.
- **View** → "Toggle Sidebar" (same toggle used for the mobile file tree);
  "Toggle Theme" (disabled / "coming soon" until dark mode exists).
- **Go** → quick-jump shortcuts (e.g. "Go to Experience", "Go to Contact")
  — lightweight navigation, not a full command palette.
- **Run** → "▶ Replay intro" — reruns the chat-intro + boot sequence on
  demand, since it otherwise only plays once per session.
- **Terminal** → not a dropdown menu — a single toggle button that
  shows/hides the terminal panel. **Terminal is visible by default on
  load** (unlike real VS Code, where it's closed by default).
- **Help** → "About this site" — short modal with the stack used and a
  link to the repo.

## Activity bar (left icon column)

- **Search** → global search across all content (about, skills, experience,
  projects, blog) — distinct from Edit → Find, which only searches within
  the currently active tab.
- **Source Control (git icon)** → a visual **git graph**:
  - One branch: Experience + Projects as commits, chronological — same
    underlying data as the Artesan Code panel, shown as a timeline instead
    of an agent conversation.
  - A second branch: things about Henrique outside of programming
    (hobbies/interests). **Needs real content from Henrique** — not
    invented, waiting on him to provide 3-4 points to use as "commits."
- **Extensions** → the real tech stack (React, Next.js, PostgreSQL, Docker,
  etc.), each displayed like an installed VS Code extension (icon, name,
  short description).
- **Run and Debug** (the icon — distinct from the "Run" top-menu item,
  which replays the intro) → same quick-jump shortcuts as the "Go" menu.
- **File Explorer** → already defined (file tree section above).
- **Accounts (bottom)** → Henrique's real GitHub avatar; clicking opens a
  small menu with GitHub / LinkedIn / email links (replacing the fake
  VS Code account options like "Backup and Sync Settings").

## Terminal

Simulated only (scripted commands, no real shell). v1 baseline:

- `show contact` → prints contact info (email, LinkedIn, GitHub — same
  links as the current Contact section).
- `show author` → prints a copyright/credits line, something like
  `© 2026 Henrique Alvarez — ArtesanoWeb. All rights reserved.`

Room to add more playful commands later (`help`, `whoami`, etc.) — not
blocking v1.

## Layout: desktop vs. mobile

- **Desktop:** file tree sidebar visible by default alongside the Artesan
  Code tab (classic VS Code two-pane layout).
- **Mobile:** file tree hidden by default (no permanent sidebar), reachable
  behind a toggle — expands as an overlay/drawer when opened.
- The in/out steps inside Artesan Code get no special mobile treatment for
  now — reflow naturally with the rest of the responsive layout. Revisit
  once there's a real build to look at on a phone screen.

## Non-goals for v1

- No dark theme yet.
- No command palette (Cmd+K) — deferred to a later iteration.
- The current minimal site isn't being deleted — it stays in git history on
  `main` as a fallback until this redesign is ready to ship.

## Open questions

None blocking — ready to start prototyping. Follow-ups below are
deliberately deferred, not unresolved.

## Build phases (each one its own branch off `develop`)

Every phase is a separate feature branch cut from `develop`, PR'd back into
`develop` when done (not into `main` — `main` only gets updated once the
whole redesign is reviewed as a piece, per the existing repo workflow).

1. `feature/vscode-shell` — static shell: title bar, file tree, real
   open/close tabs, status bar, and the static content files (`about.ts`,
   `skills.ts`, `contact.ts`) rendered as code.
2. `feature/artesan-code-panel` — the agent in/out flow for
   Experience/Projects, per-entry "agent working" animation, click-through
   to a TSX detail tab.
3. `feature/intro-boot-sequence` — chat-style intro + boot animation,
   once per session, skippable.
4. `feature/terminal` — terminal toggle button (visible by default),
   `show contact` / `show author` commands.
5. `feature/menu-bar` — File/Edit/Selection/View/Go/Run/Help
   functionality.
6. `feature/activity-bar` — Search (global), Git graph, Extensions-as-stack,
   Run-and-Debug (mirrors Go), Accounts menu.
7. `feature/mobile-responsive` — sidebar drawer toggle + general responsive
   pass across everything built in the phases above.

## Follow-ups (post-v1, not blocking)

- Revisit whether the in/out steps need a dedicated mobile layout once
  there's something real to test.
- Dark theme.
- Command palette (Cmd+K).
- More terminal commands.

## Decisions log

- **2026-08-04** — Full interactive VS Code simulation, not just visual
  chrome: the file tree really opens/closes tabs.
- **2026-08-04** — Editor content is styled as literal code, not prose.
- **2026-08-04** — v1 includes a fake terminal.
- **2026-08-04** — Experience/Projects presented via an agent-style in/out
  flow, not the file tree. Clicking an entry opens its detail as a new TSX
  tab.
- **2026-08-04** — Light theme first; dark theme deferred.
- **2026-08-04** — The agent-flow panel is the main/landing view, replacing
  the live-GitHub-fetch Projects grid — Experience and Projects both flow
  through it.
- **2026-08-04** — Boot sequence added: an agent-startup animation on load,
  tied to real Experience/Projects loading state. Once per visit (session).
- **2026-08-04** — Boot sequence is preceded by a chat-style intro screen
  (a Claude-Code-like prompt input with a welcome message) that triggers
  the boot on submit; must be skippable.
- **2026-08-04** — Layout: sidebar visible by default on desktop, hidden
  behind a toggle on mobile.
- **2026-08-04** — Panel named **"Artesan Code."**
- **2026-08-04** — Mobile in/out layout: reflow naturally, revisit later.
- **2026-08-04** — Terminal commands: `show contact`, `show author`.
- **2026-08-04** — Menu bar made functional (File/Edit/Selection/View/Go/
  Run/Help — see Menu bar section). Selection: "Select All" + "Copy",
  scoped to the active tab's content.
- **2026-08-04** — Terminal is a single toggle button (not a dropdown),
  visible by default on load.
- **2026-08-04** — Experience/Project steps play a short "agent working"
  animation per entry before revealing, not an instant reveal.
- **2026-08-04** — Activity bar made functional: global Search, Git graph
  (Experience/Projects timeline + a personal/hobbies branch pending real
  content), Extensions-as-tech-stack, Run-and-Debug icon mirrors "Go,"
  Accounts menu uses real GitHub avatar + GitHub/LinkedIn/email links.
