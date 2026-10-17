# SDD ledger — plan: docs/temp/plans/2026-10-17-tour-idiomas-aparencias.md

Implementation branch: `feat/tour-i18n-style-variants`; worktree: `/home/daniel/.codex/worktrees/19d2/estilos-visuais`; plan base: `9d88197`; review range will start there.

## Pre-flight interface scan

| Tasks | Interface/file overlap | Finding / ruling |
|---|---|---|
| 1 ↔ 2/3/4 | skill-link URL and localized tour/popover | Central `skillUrl(slug)` plus translation keys; tests derive expected path independently from Coacus tree. |
| 2 ↔ 3 | locale resolver consumes catalog availability | Expose only existing catalogs until all 11 are created; after adding, activate them and run order tests. |
| 2/3 ↔ 4 | locale setter updates selector and tour | Locale operation changes existing strings safely, preserves children, cleans/remounts FX under generation token. |
| 4 ↔ 5/6 | appearance selector consumes variant registry and CSS | Only show completed entries; default always available; pilot Nordic gates loader before broad rollout. |
| 5 ↔ 6 | CSS IDs, colors and motion contracts | Schema: `default,c1,c2,c3,e1,e2,e3`; each style's six IDs activated after CSS/catalog/test pass. |
| 1–6 ↔ 7 | all interactions and assets enter audits/deploy | Strict coverage manifest and pre/post snapshots are final gates. |

## Rulings

- Ruling: retain the explicit required viewport matrix even though it is large — plan requires recorded coverage and the feature spans 82 styles; cost if wrong: long audit runtime.
- Ruling: keep published Coacus targets read-only and verify at `origin/main` — user asked to link and open skills, not to change Coacus in this task; cost if wrong: a style whose skill is absent would be surfaced as unavailable.
- Ruling: preserve `dan.seg.br` with snapshots and verify after deployment — same GitHub Pages repo may publish under its subdomain, and user explicitly requires safety of the root domain; cost if wrong: rollback/recovery work.

Task 0: in progress. Baseline source revision captured as `9d88197c1068e398de031287834e19c7a0860425`; original browser capture attempt failed due Playwright `arg` API usage, corrected before any product files changed.
Task 0: complete (commits 9d88197..8ffebdd, tests: bash -lc 'python3 tools/test_help_dialog.py && python3 tools/test_scrollytelling.py && python3 tools/test_button_bounds.py && python3 -c "import json; m=json.load(open(\".superpowers/sdd/2026-10-17-tour-idiomas-aparencias/baseline/manifest.json\")); assert m[\"captureCount\"] == 1312 and m[\"slugCount\"] == 82"' -> 82 styles: buttons stay in their sections at 320px, 375px and 1280px)
Task 1: complete — skillUrl validates style slugs; welcome tour points to the skill; contextual popover adds a DOM link for the current style. `tools/test_help_dialog.py` and `tools/test_skill_tour.py` passed; synchronized Coacus `HEAD=origin/main` at `8ab8e28`, and all 82 raw skill URLs returned HTTP 200 with non-empty SKILL.md content.
