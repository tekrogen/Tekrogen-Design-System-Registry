# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## 5. Rules

These must be followed with no exceptions:

1. Do not ever include a `Co-Authored-By: Claude …` trailer in commits in this code base.
2. **Check files first, assume nothing.** When there is any confusion, contradiction, or ambiguity — especially about what this project *is*, what it references, or how it relates to other projects (the DS repo, the two surfaces, vendored vs authored code) — verify against the documents, the data, and the codebase (README, CLAUDE.md, `git remote -v`, `git log`, `grep`) *before* answering or acting. Treat the repository's own files as authoritative over anything stated in chat, including loosely-worded inputs and your own prior statements. Report what the files say, then reason. Never carry an unverified claim from conversation forward as fact.
3. **Follow the branch-naming convention** (see Governance): `<type>/<issue#>-<slug>`, issue first, PR body `Closes #N`. Don't fix vendored `components/` here — fix upstream in the DS repo and re-vendor.
4. **Review and validate every UI/UX artifact before declaring it done.** Any UI/UX you author or change here (a mockup surface, a screen, an `admin/review/` artifact, any HTML/CSS) must be (a) **designed to the 3-expert review method** and (b) **validated against the Tekrogen Brand Design System** — *before* hand-off, not after the user reports a defect. The two operating briefs live in **`/Volumes/SERV01-DTMAC-1/_Code_Library/AI prompts/`** — read them when doing this work:
    - **`Design-System-UIUX-Review-Prompt.md`** — the **3-expert panel** (Senior Product Designer · Design Systems Architect · Front-End Engineering Lead): visual hierarchy/legibility, token/scale/spacing discipline, and rem/AA/focus/maintainability. Apply all three lenses; be evidence-based.
    - **`GHOST-CRM-AND-THEME-EXPERT.md`** — the Ghost CMS architecture lens (native routing/memberships/templates, GScan, accessibility) for anything theme-shaped.

   **Validation gate (run before saying "done"):** (1) **static token audit** — every `font-size` is a DS type-scale token (no hardcoded px); **nothing below the 12px legibility floor** (`--tk-fs-eyebrow`/`--tk-fs-meta` = `0.75rem`); lowest text colour is `--tk-fg-3` (AA) — never `fg-4`/`fg-5` for text. (2) **Render and check** at **1440px + 390px**: zero horizontal overflow (`documentElement.scrollWidth === clientWidth` at 390px); **serve, don't `file://`**. (3) **3-expert pass** with a short evidence-backed verdict. This is the same Phase-E acceptance bar used for the s2–s9 builds; record results in an `admin/review/VALIDATION.md`-style note for review artifacts.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.



