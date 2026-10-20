---
color-text: "#172b40"
color-text-muted: "#45586b"
color-background: "#f7f9fb"
color-surface: "#fafafa"
color-primary: "#123552"
color-on-primary: "#ffffff"
color-border: "#526578"
color-divider: "#b8c5d0"
color-focus: "#b16d00"
color-danger: "#922020"
color-attention: "#7a3d00"
color-attention-surface: "#ffe8c2"
font-body: "system-ui"
font-heading: "system-ui"
font-size-min: 14px
space-unit: 8px
radius: 4px
---

# STYLE.md

Accountable: the Implementer. Merged 2026-10-20 from the HW5 versions of Aaron,
Canon, Prince and Ryan, with the conflicts noted below, as STANDARDS.md was in
Phase 1. Nuhamin's HW5 version exists but she has left the course, so it was
not merged.

**Every token above is declared in `public/styles.css` as a CSS custom property
with the same hex string, and nothing outside that `:root` block hard-codes a
colour.** A grader opening both files sees the same values.

## How the conflicts were settled

Four members submitted four different palettes. Design tokens do not have a
"stricter" version the way a code rule does, so the tie-break was **measured
contrast**, computed with the WCAG 2.x relative-luminance formula, rather than
preference.

| Member | text on background | primary on background | accent or on-primary | font-size-min |
|---|---|---|---|---|
| Ryan | 13.67:1 | 12.01:1 | 12.68:1 | 14px |
| Canon | 13.98:1 | 5.45:1 | 5.70:1 | 12px |
| Aaron | 17.40:1 | 11.48:1 | **1.40:1** | 12px |
| Prince | 17.21:1 | 17.21:1 | **3.10:1** | 14px |

Thresholds: **4.5:1** for body text, **3:1** for non-text interface components.

**Palette: Ryan's, adopted whole.** Not because it is the prettiest. It is the
only one of the four whose every published pair clears both thresholds with
margin, and the only one that arrived with its ratios computed per pair rather
than asserted. It is also already deployed: F1 ships with these exact values in
`public/styles.css`, so adopting any other set means rewriting shipped code
rather than editing a token list.

**Aaron's gold accent `#FFD700` was not carried over.** Against his white
background it measures **1.40:1**, which fails the 3:1 non-text threshold by a
wide margin and would fail 4.5:1 as text by more. It is the one token in the
four sets that cannot be used for what an accent is for.

**Prince's `#A8842C` was not carried over either**, for a narrower reason. At
**3.10:1** on his cream background it passes for interface components and fails
for text, so it would be a token nobody could safely read. Our palette already
has `color-focus: #b16d00` and `color-attention: #7a3d00` covering that job at
higher contrast.

**font-size-min is 14px, not 12px.** Aaron and Canon set 12; Prince and Ryan set
14. This is the one conflict where the Phase 1 rule applies directly, so the
stricter value wins.

**font-heading is `system-ui`, matching font-body.** Aaron proposed Times New
Roman for headings against Arial body, and Prince proposed Arial for both. A
second typeface is a dependency on a font nobody has pinned, and `STANDARDS.md`
rule 10 forbids adding an asset without a `TOOLS.md` row. One family, no new
row, no new crossing.

**Multiple radius values were collapsed to one.** Canon set three
(`radius-control` 8px, `radius-task` 12px, `radius-panel` 16px). Three radii
describe three component types this build does not have yet. One token now, and
whoever needs the distinction can add it with a reason.

## Admired and resented

**Admired: Instagram**, for restraint rather than content. The chrome gets out
of the way and the thing you came for is the largest object on screen. F1 is
built that way: the gap list is the largest object, and the form shrinks once
there is an answer to read.

**Resented: Hudl**, which is where the refusals come from. It decorates numbers
it does not explain. Our `color-attention-surface` exists for exactly one job,
stating how old the posting data is, and it is never used to make a result look
more urgent than it is.

## What a reader should be able to check

- Open `public/styles.css`. Every hex string in the `:root` block matches this
  file exactly, and there is no hex string anywhere else in that file.
- Open the deployed page. Body text is `--color-text` on `--color-background`,
  which is 13.67:1.
- The only amber on the page is the collection-date line, which is `F1-4`
  stating the age of the data, not a warning about the student's result.
