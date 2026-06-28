# Tekrogen-Design-System-Registry

> **Real solutions. Built, proven, ready to use.**
>
> The Visual Design System and SOP for creating visual products across the
> four Tekrogen entities — .org, .studio, .com, .net. Four wings, one
> pursuit: build it, prove it, publish what we learned.

---

**Author:** @tekrogen
**Inputs:**
- Github: `https://github.com/tekrogen/Tekrogen-Design-System-Registry`
- GitHub Original Branding Source: `https://github.com/tekrogen/Tekrogen-Brand-Design-System`
- Claude Design Files: `https://claude.ai/design/p/019e1ce2-d0e9-7542-b649-e21f0ca4512e`
- Tekrogen BNR: `admin/internal/business/01.Tekrogen_BNR_Roadmap_v1.md`
- Tekrogen Domain Architecture: `admin/internal/business/02.Tekrogen_Domain_Architecture_v1.md`

---

## What we want to achieve

Forked Project Functional Goal: https://github.com/vercel/registry-starter/

1. Create a registry of the Tekrogen Design System for Tekrogen's four entities: .org, .studio, .com, and .net.
2. Build a unified visual language and design system for creating consistent and high-quality visual products across all Tekrogen entities.
3. Integrate the registry into existing design workflows.
4. Use Shadcn UI for the base

---

## About Tekrogen Design System Registry

Tekrogen Design System Registry is a collection of design systems and style guides for Tekrogen's four entities: .org, .studio, .com, and .net. The registry provides a unified visual language and design system for creating consistent and high-quality visual products across all Tekrogen entities.

The registry is built on top of the Tekrogen Branding System, which serves as the foundation for all Tekrogen entities. The registry includes a range of design systems and style guides, including typography, color, spacing, and layout guidelines, as well as component libraries and design patterns.

The registry is designed to be easy to use and integrate into existing design workflows. It includes a range of tools and resources, including design files, code snippets, and documentation, to help designers and developers create visually stunning and consistent products.

Overall, the Tekrogen Design System Registry is a valuable resource for Tekrogen's designers and developers, providing a unified visual language and design system for creating high-quality visual products across all Tekrogen entities.

---

## What is a registry - Mental model: two halves

A **shadcn registry** is a code-distribution mechanism: a set of JSON files,
served over HTTP, that the `shadcn` CLI reads to copy components — along with
their npm dependencies, other registry items they depend on, and theme tokens —
straight into a project. Unlike an npm package, the code is *copied into* the
consumer, who then owns and can edit it (shadcn's "open code" model). Tekrogen's
registry distributes our design-system components this way.

In practice it has an **authoring** side (this repo) and a **consuming** side
(any app that installs from it):

```
authoring (here)                         consuming (any project)
─────────────────                        ───────────────────────
registry/<category>/<item>.tsx           components.json → registries: { "@tekrogen": ".../r/{name}.json" }
registry.json  (manifest)                       │
   │  pnpm registry:build                       ▼
   ▼                                      pnpm dlx shadcn@latest add @tekrogen/<item>
public/r/<item>.json  (built, served)  ──────►  files copied into the consumer's project
```

You **author** source files + a manifest, **build** them into static JSON under
`public/r/`, **host** that (Vercel), and consumers **install** items by namespace.

---

## Using the app

This repo is a [Next.js](https://nextjs.org) app (forked from
[registry-starter](https://github.com/vercel/registry-starter)) that both
**serves** the registry JSON and provides a browsable preview UI.

### Prerequisites
- **Node** 20+
- **pnpm** (enforced via `devEngines`; `npx`/`npm` are intentionally blocked).
  If you don't have it: `corepack enable` or `npm i -g pnpm`.

### Run it locally
```bash
pnpm install          # install dependencies
pnpm dev              # builds the registry, then starts Next.js on http://localhost:3000
```

`dev` and `build` run `pnpm registry:build` first, so the served JSON under
`public/r/` is always regenerated from `registry.json` (that folder is
git-ignored — never commit it).

### What you can open
| Route | Shows |
|---|---|
| `/` | Registry index — every item in `registry.json` |
| `/registry/[name]` | A single item's generated JSON / install info |
| `/demo/[name]` | Live preview of a block/component (e.g. `/demo/dashboard`) |
| `/tokens` | The design tokens (colors, fonts) from the theme |

### Common commands
```bash
pnpm dev              # local dev server (regenerates registry first)
pnpm build            # production build (registry:build + next build)
pnpm start            # serve the production build
pnpm registry:build   # build registry JSON only → public/r/*.json
pnpm lint             # biome check
pnpm lint:fix         # biome check --write (safe autofixes)
```

### Add a registry item
1. Create the source under `registry/<category>/<item>.tsx` (this fork organizes
   by **category** — e.g. `registry/layouts/`, `registry/common/`).
2. Add an entry to `registry.json` (`name`, `type`, `title`, `files[]`, and any
   `dependencies` / `registryDependencies` / `cssVars`).
3. `pnpm registry:build` and open `/demo/<item>` (or `/registry/<item>`) to verify.

Full authoring reference: [`admin/internal/workflows/00.install-shadcn-registry.md`](admin/internal/workflows/00.install-shadcn-registry.md).

### Install items into another project
Once this app is deployed, a consumer adds the namespace once and installs by name:
```bash
# configure once (or add "@tekrogen" to the consumer's components.json "registries")
pnpm dlx shadcn@latest registry add @tekrogen=https://<your-domain>/r/{name}.json
# then install any item
pnpm dlx shadcn@latest add @tekrogen/<item>
```

---

## What's in the box

> **Status:** registry app scaffolded from registry-starter and building. Items
> are still the starter's defaults — Tekrogen rebranding of components/tokens is
> in progress.

```text
.
├── src/                   # Next.js app — registry index, /registry/[name], /demo/[name], /tokens
├── registry/              # Registry item SOURCE, organized by category (common/, layouts/, …)
├── registry.json          # Registry manifest (the list of items the build compiles)
├── public/                # Static assets; built JSON lands in public/r/ (git-ignored)
├── components.json        # shadcn config (style: new-york)
├── biome.json             # Lint/format (vendored ui/ dirs excluded)
├── next.config.ts / postcss.config.mjs / tsconfig.json
├── package.json           # pnpm-only; app + registry scripts
├── pnpm-workspace.yaml    # pnpm settings (allowed native build scripts)
├── CLAUDE.md              # Working rules: behavioral guidelines + 5 hard project rules
├── CHANGELOG.md           # Generated by release-please (Conventional Commits)
├── LICENSE                # MIT
├── .env.example           # Vercel env vars (VERCEL_PROJECT_PRODUCTION_URL, REGISTRY_AUTH_TOKEN)
└── admin/                 # Knowledge base (not shipped product)
    ├── internal/business/   # BNR roadmap, domain→architecture mapping, Ghost specs
    ├── internal/workflows/  # How-to guides (release-please, shadcn registry install)
    └── public/              # Public brief, investor pitch
```

**Toolchain**
- **pnpm** — enforced package manager (`devEngines`, committed lockfile).
- **Next.js + shadcn** — the registry app; `pnpm registry:build` compiles the registry.
- **biome** — lint/format (`pnpm lint`).
- **commitlint + husky** — Conventional Commits, no leading emoji (`.husky/commit-msg`).

## Release Management

Releases and `CHANGELOG.md` are fully automated by
[release-please](https://github.com/googleapis/release-please) (active —
current release **v0.1.0**). The loop:

1. Land Conventional Commits (`feat:`, `fix:`, `chore(deps):`, `fix(security):`) —
   no leading emoji; enforced by the commitlint `commit-msg` hook.
2. On push to `main`, **release-please** opens/updates a standing **Release PR**
   that bumps the version (`package.json` + `.release-please-manifest.json`) and
   writes the new `CHANGELOG.md` section.
3. Merge the Release PR to ship — this tags `vX.Y.Z`, publishes a GitHub release,
   and commits the changelog to `main`.

While the repo is `0.x` (`bump-minor-pre-major`), `feat:` bumps the minor and
`fix:` the patch; breaking changes stay in the minor until `1.0.0`.

> **Do not hand-edit `CHANGELOG.md`.** It is generated from commit history —
> edits are overwritten on the next release. Fix the changelog by fixing the
> commit messages.

Branch naming follows the governance convention in `CLAUDE.md`: `<type>/<issue#>-<slug>`,
with `Closes #N` in the PR body. Merged branches are auto-deleted on the remote.

