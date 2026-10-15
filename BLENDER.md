# Modelling the room props in Blender

A guide for **the ten objects in this room**, not a general Blender course.
Everything here is box modelling. If a tutorial starts talking about sculpting,
retopology or rigging, you are in the wrong tutorial.

Each prop already exists as a code-authored version in
`components/room/props/`. You are not starting from nothing — you are replacing
a stand-in whose exact dimensions are written down below. Beat it, and drop it in.

---

## Contents

- [Connecting Blender to the repo](#connecting-blender-to-the-repo) — **set this up first**
- [Before you start](#before-you-start)
- [The five things you need to learn](#the-five-things-you-need-to-learn)
- [Rules that apply to every prop](#rules-that-apply-to-every-prop)
- [The contract](#the-contract)
- **Per-prop walkthroughs:** [photo](#1-photo) · [whiteboard](#2-whiteboard) ·
  [monitor](#3-monitor) · [resume](#4-resume) · [window](#5-window) ·
  [bookcase](#6-bookcase) · [football](#7-football) · [tower](#8-tower) ·
  [desk](#9-desk) · [room](#10-room)
- [Materials and colour](#materials-and-colour)
- [Export settings](#export-settings)
- [Troubleshooting](#troubleshooting)
- [Keeping it small](#keeping-it-small)

---

## Connecting Blender to the repo

Do this once. After it, modelling and seeing the result are the same action:
export from Blender, look at the browser.

### 1. Get the site running on your machine

You need [Node](https://nodejs.org) 18 or newer. Then, in a terminal:

```bash
git clone https://github.com/zarcop/personal-website.git
cd personal-website
npm install
npm run dev
```

Open <http://localhost:3000/room>. That is the room, running off your own
machine, reading the files in this folder.

### 2. Start the watcher

In a **second** terminal, in the same folder:

```bash
npm run props:watch
```

Leave both running. The watcher is what makes the loop instant: without it the
prop list is only read when `npm run dev` starts, so an export made while the
server is already up changes nothing until you restart it — which looks exactly
like a model that does not work.

### 3. Point Blender's exporter at the right folder

`File → Export → glTF 2.0`, and navigate once to:

```
<wherever you cloned it>/personal-website/public/models/
```

Name the file after the object — `monitor.glb`, `desk.glb` — and export. Blender
remembers the folder, so every export after the first is two clicks.

**That is the whole loop.** Export, and the browser reloads with your model in
place of the code one. If it looks wrong, fix it in Blender and export again
over the top.

### Where to keep the .blend files

Anywhere you like. A `blender/` folder inside the project is convenient and is
already gitignored, along with `*.blend` — those files run to tens of megabytes
and only the exported `.glb` needs to ship.

### Backing out

Delete the `.glb`. The watcher notices, and the code-authored prop comes back.
Nothing else to undo.

### Before you commit

```bash
npm run build     # confirms the manifest picked it up, and prints the page weight
npm run lint
```

Then commit the `.glb` and the regenerated `data/props.generated.ts` together.
They belong in the same commit — the manifest is what tells the site your model
exists.

---

## Before you start

Download Blender from blender.org. It is free. Any version from 4.0 onward is
fine; the glTF exporter has shipped built-in for years.

Set units once: **Scene Properties → Units → Unit System: Metric, Unit Scale 1.0,
Length: Metres.** Blender metres map 1:1 onto the site's units, so a 1.2 m monitor
in Blender is a 1.2 m monitor in the room. Never scale on export.

Two viewport habits worth forming immediately:

- `Numpad 1` = front view, `Numpad 3` = right, `Numpad 7` = top. You will model
  almost everything from front view.
- `N` opens the sidebar with exact dimensions. Type numbers in rather than
  dragging — every size in this guide is exact, and eyeballing them means the
  prop will not sit flush against the wall or the desk.

---

## The five things you need to learn

| | What | Where |
| --- | --- | --- |
| 1 | **Box modelling** — `E` extrude, `I` inset, `Ctrl+R` loop cut | Edit Mode (`Tab`) |
| 2 | **Bevel modifier** | Modifier Properties (wrench icon) |
| 3 | **Array modifier** | Same panel — shelves and books |
| 4 | **Base colour + roughness** | Material Properties |
| 5 | **glTF 2.0 export** | `File → Export` |

### What you do NOT need

Sculpting · retopology · UV unwrapping · rigging · shader nodes · scene lighting ·
HDRIs · compositing · texture baking. The site lights your props with its own
lights. Skip every tutorial that opens with a donut.

### The bevel is most of the job

Nothing in the real world has a perfectly sharp 90° edge, so a sharp edge reads
as fake no matter how good everything else is. Two to three millimetres of bevel
catches a highlight along every corner and the object immediately looks *made*.

Add a **Bevel modifier**, Amount `0.003`, Segments `2`. On larger flat objects
like the bookcase you can go to `0.005`. That one step is the single largest
visual difference between the code props currently on the site and a modelled one.

> **Watch out:** if the bevel looks like it has exploded into black shards, your
> object has a non-uniform scale. Fix with `Ctrl+A → Scale` and it will behave.

---

## Rules that apply to every prop

These are the ones that actually cause problems. Read them once, properly.

**1. Model at the world origin.** Put the object at `(0, 0, 0)` in Blender. The
site positions it — `PLACEMENT` in `components/room/Room.tsx` holds every
coordinate. If you model it where it sits in the room, it gets offset twice and
ends up floating in the middle of the floor. The one exception is the room shell
itself (§10), which *is* the world and so is modelled where it goes.

**2. Every prop faces `+Z`.** The wall is behind the props and the camera is in
front. In Blender's front view (`Numpad 1`), the direction pointing *at you* is
`+Y`, and the glTF exporter converts `+Y up` to the site's axes for you. In
practice: **build it facing you in front view** and it will face the camera in
the room.

**3. Apply all transforms before export.** `Ctrl+A → All Transforms`, with the
object selected in Object Mode. This is the most common reason a model arrives at
the wrong size, in the wrong place, or rotated 90°. Do it every time, right before
export, as a reflex.

**4. The object name is the contract.** The *object* name in the Outliner becomes
the glTF node name, and that is what `data/room.ts` binds a hotspot to. It must
match the table below exactly — lowercase, no suffix. Blender silently renames
duplicates to `monitor.001`, which will not match and your prop will not appear.

**5. Origins matter per-prop.** Most props put the origin at the centre of the
main body. The monitor is the exception. The table says which.

---

## The contract

| Prop | Object name | Size (m, W × H × D) | Origin |
| --- | --- | --- | --- |
| Photo | `photo` | 1.40 × 0.95 × 0.04 | Centre of the frame |
| Whiteboard | `whiteboard` | 1.40 × 1.10 × 0.045 | Centre of the board |
| Monitor | `monitor` | 1.62 × 1.00 × 0.06 | **Centre of the screen** — stand hangs below |
| Résumé | `resume` | 0.21 × 0.004 × 0.297 | Centre of the sheet |
| Window | `window` | 1.08 × 1.55 × 0.12 | Centre of the frame |
| Bookcase | `bookcase` | 1.60 × 2.00 × 0.45 | Centre of the carcass |
| Football | `football` | ⌀ 0.52 | Centre of the ball |
| Tower | `tower` | 0.21 × 0.48 × 0.45 | Centre of the case |
| Desk | `desk` | 2.60 × 0.805 × 1.00 | Centre of the footprint, **at floor level** |
| Room shell | `room` | ≥ 14 wide × 5 tall, wall at z = −4 | World origin — see §10 |

Overshoot the stated depth and the prop pokes through the wall. Undershoot the
monitor's stand length and it floats above the desk.

The desk and the room shell are not clickable — they are scenery — but they go
through the same drop-in slot as everything else, so a `desk.glb` replaces the
code desk exactly the way a `monitor.glb` replaces the code monitor.

---

## 1. `photo`

**The easiest one. Start here.** A frame is two nested boxes.

**Target:** 1.40 × 0.95 × 0.04 · the Toluca photograph on the front face.

1. `Shift+A → Mesh → Cube`. In the `N` sidebar set Dimensions to
   `1.4, 0.04, 0.95` (Blender's Y is depth in front view).
2. `Tab` into Edit Mode, `Numpad 1` for front view. Select the front face,
   `I` to inset by about `0.06` — that is your frame width.
3. With the inset face still selected, `E` extrude **inward** by `-0.015` to
   create the recess the photo sits in.
4. `Tab` out. Add a **Bevel** modifier, Amount `0.003`, Segments `2`.
5. Add a second object for the photo itself: a plane, 1.14 × 0.69, sitting
   `0.002` proud of the recessed face. Join it to the frame with `Ctrl+J`.
6. Rename the object to `photo`. `Ctrl+A → All Transforms`. Export.

**Getting the photo onto it:** select the photo plane's faces in Edit Mode,
`U → Project From View` in front view, then in Material Properties set Base Color
to an Image Texture pointing at `public/images/story/toluca.jpg`. That is the one
place in this guide where UV unwrapping shows up, and `Project From View` on a
flat plane is the trivial case.

> **Nice to have:** a 1–2° tilt on the whole frame. A picture hung very slightly
> off-level reads as a real room; dead-level reads as a render.

---

## 2. `whiteboard`

Same shape as the photo, different proportions and a tray.

**Target:** 1.40 × 1.10 × 0.045 · writing surface inset · marker tray below.

1. Cube, Dimensions `1.4, 0.045, 1.1`.
2. Inset the front face by `0.04`, extrude inward `-0.01`. That lip is the
   aluminium trim.
3. Tray: a second cube, `0.5 × 0.025 × 0.06`, positioned at the bottom edge about
   `0.5675` below centre and `0.04` proud of the board face. `Ctrl+J` to join.
4. Bevel `0.002`, Segments `2`. Keep it tight — trim is sharp in real life.
5. Rename `whiteboard`, apply transforms, export.

**Leave the surface blank.** Unlike the photo, this one is not decoration: the
code draws a timeline onto it — a rail, a dot and a logo tile per role, read
straight out of `data/experience.ts` — and mounts a live, readable version of
the same timeline on top when the board is focused. Anything you paint on the
writing surface will sit underneath that. Model the frame and the tray; the
board's contents are not yours to supply.

---

## 3. `monitor`

Four boxes. The origin rule matters here.

**Target:** screen body 1.62 × 1.00 × 0.06 · **origin at the screen centre** ·
stand reaching down `0.705` to meet the desk.

1. **Bezel:** cube, Dimensions `1.62, 0.06, 1.0`. Inset the front face by `0.05`,
   extrude inward `-0.008`.
2. **Screen:** plane 1.50 × 0.88, sitting `0.002` proud of the recess, centred
   `0.03` **above** the body centre — monitors have a chin.
3. **Neck:** cube `0.11 × 0.07 × 0.18`, centred `0.59` below the screen centre.
4. **Base:** cube `0.46 × 0.24 × 0.025`, centred `0.6925` below the screen centre.
5. Join all four (`Ctrl+J`). Bevel `0.004`, Segments `2` — monitors have
   noticeably rounded bezels.
6. **Set the origin to the screen centre, not the combined centre.** Select the
   screen face in Edit Mode, `Shift+S → Cursor to Selected`, then Object Mode →
   `Object → Set Origin → Origin to 3D Cursor`.
7. Rename `monitor`, apply transforms, export.

> **Why the origin is odd here:** the desk surface sits at y = 0.805 in the room
> and the code places the monitor by its screen centre, at the desk height plus
> whatever the stand reaches down. That number is `BASE_DROP` in
> `components/room/props/Monitor.tsx`, currently `0.705`. If your stand is
> shorter the monitor floats; if it is longer it sinks into the desk. Measure it,
> and if you change it, change `BASE_DROP` to match.

> **Leave the screen blank too.** Like the whiteboard, the screen is a mount
> point: the code paints a browser window and a dock onto it, and swaps in a
> live, clickable one when the desk is focused.

---

## 4. `resume`

**Target:** 0.21 × 0.004 × 0.297 — a sheet of A4, lying flat.

1. Plane, Dimensions `0.21 × 0.297`. Solidify modifier, Thickness `0.004`.
2. A tiny bevel, `0.0005`, so the paper edge catches light.
3. For the text: write your actual résumé layout as a PNG and apply it as the
   base colour texture. At the distance the camera gets, a real one-page layout
   reads convincingly and a fake one does not.
4. Rename `resume`, apply transforms, export.

> **Worth the extra ten minutes:** put a slight curl in one corner. Subdivide the
> plane a few times, grab one corner vertex, lift it 3–4 mm with proportional
> editing (`O`). Perfectly flat paper is the giveaway that something is CG.

---

## 5. `window`

The one with a real trick to it.

**Target:** outer 1.08 × 1.55 · frame bar 0.10 · opening 0.88 × 1.35 ·
depth 0.12 · sill 1.22 × 0.06 × 0.20.

1. Cube, Dimensions `1.08, 0.12, 1.55`.
2. Inset the front face by `0.10` — that is your frame width — then **delete the
   inset face entirely** (`X → Faces`). You now have a hole.
3. `Ctrl+R` a loop cut vertically and another horizontally across the opening,
   then extrude them into mullions about `0.04` thick.
4. **Sill:** cube `1.22 × 0.20 × 0.06`, sitting just below the frame, protruding
   forward. Join.
5. Bevel `0.003`, Segments `2`.
6. Rename `window`, apply transforms, export.

> **The trap:** do not model glass or a view. The wall behind the window is opaque
> and sits only a few centimetres back, so anything you put inside the opening
> gets hidden by it — this exact bug made the code version render as a blank grey
> panel until it was fixed. The site draws the sky and treeline in front of the
> wall. Leave the opening empty and it will fill itself.

---

## 6. `bookcase`

The most work, but the Array modifier does the repetitive part.

**Target:** 1.60 × 2.00 × 0.45 · opening faces `+Z` · 4 shelves.

1. **Carcass:** build from five boxes — back panel `1.6 × 0.04 × 2.0`, two sides
   `0.04 × 0.45 × 2.0`, top and bottom `1.6 × 0.45 × 0.04`. Panel thickness `0.04`
   throughout.
2. **Shelves:** model ONE shelf, `1.52 × 0.41 × 0.025`, at the height of the
   lowest one. Add an **Array modifier**, Count `3`, Relative Offset X `0`, and
   set **Constant Offset Z** to your shelf spacing (about `0.48`). One shelf
   becomes three.
3. **Books:** model one book — a box roughly `0.035 × 0.20 × 0.24`. Array it
   along X with Constant Offset `0.04`, Count 20 or so. Then duplicate that array
   per shelf.
4. To stop the books looking machine-stamped, go into Edit Mode on the array
   result (`Ctrl+A` to apply the modifier first) and vary a dozen of them: scale a
   few taller, tilt one or two by 8–10°, pull a couple forward, leave a gap.
   **This is what sells it.** A perfectly even row of books looks worse than no
   books.
5. Bevel `0.004` on the carcass. Books can skip the bevel — at this scale it
   costs geometry you will not see.
6. Rename the whole thing `bookcase`, join, apply transforms, export.

> **Watch the polygon count here.** Eighty books with bevels is where this file
> blows past its budget. Keep books as plain boxes.

---

## 7. `football`

**Do this one last, or not at all.**

**Target:** ⌀ 0.52 (radius 0.26).

The code version is a faceted icosahedron and it reads fine as a stylized ball.
A real panelled football is genuinely fiddly — the classic truncated icosahedron
means 12 pentagons and 20 hexagons, and getting them to meet cleanly is a modelling
exercise well beyond anything else in this guide.

If you want to try: add an Icosphere, Subdivisions 1, then `Ctrl+3` for a
Subdivision Surface — but honestly, the better route is to keep the sphere and
paint the panel pattern as a texture. Search for a free football UV texture, apply
it to a UV Sphere with a Smart UV Project, done in fifteen minutes instead of three
hours.

---

## 8. `tower`

The easiest prop in the guide. One box and some slots.

**Target:** 0.21 × 0.48 × 0.45 · origin at the centre of the case · feet reaching
down `0.255` from that centre to the floor.

1. Cube, Dimensions `0.21, 0.45, 0.48` (W, D, H). Bevel `0.008`, Segments `2`.
2. **Front face:** inset by `0.015`, extrude inward `-0.004`. That recess is the
   front panel.
3. **Grille:** in the recess, inset a strip across the upper half and use an
   Array modifier to repeat it six times downward, `0.025` apart. These are
   shallow — `0.003` deep is plenty.
4. **Top vents:** same trick on the top face, nine slots running front to back.
   The camera pose for this hotspot looks down at the case from in front of the
   desk, so the lid is on show; do not leave it flat.
5. **Feet:** four cubes `0.038 × 0.038 × 0.015` at the bottom corners, inset
   about `0.07` in X and `0.175` in Z. `Ctrl+J` to join.
6. Rename `tower`, apply transforms, export.

**Leave the lights to the code.** The power LED, the drive light that flickers,
the accent strip down the front edge and the glow it throws on the floor are all
driven at runtime — the drive light is tied to the clock and stops flickering for
visitors who ask for reduced motion. Model the case; it will light itself.

> **It lives in the desk's shadow,** which means a plain dark material renders as
> a black slab at night. Give it a mid-grey base colour, around `#3c424a`, and
> let the code's emissive do the rest.

---

## 9. `desk`

**Target:** 2.60 × 0.805 × 1.00 · origin at the centre of the footprint, **at
floor level** so the desk stands on y = 0.

1. **Top:** cube `2.6 × 1.0 × 0.05`, its underside at `0.755` so the top surface
   lands at `0.805`.
2. **Legs:** two cubes `0.07 × 0.9 × 0.755`, at x `±1.2`, running floor to
   underside. Or model a trestle, or a pedestal with drawers — the code version
   is a plain table only because it was quick.
3. Bevel `0.004`, Segments `2`. Join, rename `desk`, apply transforms, export.

> **0.805 is load-bearing.** The monitor and the résumé are both placed from
> `DESK_TOP` in `components/room/Room.tsx`, not from the desk mesh. A desk of a
> different height leaves them hanging in the air at the old one. If you want a
> taller desk, change `DESK_TOP` to match and the things on it will follow.

Keep a clear span between the legs: the tower stands on the floor underneath at
x `0.9`, and the camera looks under the desk at it.

---

## 10. `room`

The shell: floor, back wall, skirting, and the two side returns that stop the
wall reading as a floating panel at the edges of frame.

**Target:** wall face at `z = −4`, floor at `y = 0`, at least 14 m wide and 5 m
tall.

**This one breaks rule 1.** Every other prop is modelled at the origin and
positioned by the code; the shell *is* the world, so model it where it actually
goes — floor at y = 0, back wall at z = −4 — and the code places it at the
origin unchanged.

1. **Floor:** plane 16 × 9, centred about `(0.4, 0, −1)`.
2. **Back wall:** plane 16 × 5.6 at `z = −4`, facing `+Z`. It runs well past the
   top of frame on purpose; a visible ceiling line makes the room feel like a box.
3. **Skirting:** a long thin box along the base of the wall. Small, and it is
   most of what stops wall and floor reading as two flat planes meeting.
4. **Side returns:** two planes at about `x = −6.4` and `x = 7.2`, turned to face
   inward. They only exist to close the frame edges.
5. Join, rename `room`, apply transforms, export.

> **Do not model a ceiling or a fourth wall.** The camera never leaves the front
> of the room, so both are pure cost. Anything facing away from `+Z` is waste.

> **Watch the budget here.** The shell is the largest surface area in the scene
> and the easiest place to accidentally spend a megabyte. Flat planes with one
> material each; if you want texture, a single tiling image beats geometry.

---

## Materials and colour

**Do not bake lighting into your props.** The scene lights them with its own
lights, and a baked prop will look flat and wrong against everything else. Plain
material, nothing clever:

- **Base Color** — flat colour
- **Roughness** — 0.6–0.9 for wood, fabric and paper; 0.3–0.5 for screens and
  metal trim
- **Metallic** — leave at 0 unless it is actually metal

Leave everything else at default. No nodes, no procedural textures, no emission.

The scene is lit by an ambient light at 0.75, a key directional from the
upper-front-right at 1.5, and a cool fill from behind-left at 0.4, against a warm
off-white background. Your props will pick that up automatically.

Colours that sit well with the room's palette, if you want to match the existing
props:

| | Hex |
| --- | --- |
| Warm wood | `#8a7d6b` |
| Dark trim / monitor bezel | `#2b2b30` |
| Paper white | `#f6f3ee` |
| Frame brown | `#6b5540` |
| Accent (hover state, applied by the site) | `#c2703c` |

**One material per object is plenty.** Multiple materials mean multiple draw
calls, and this is a scene where that matters.

---

## Export settings

`File → Export → glTF 2.0 (.glb/.gltf)`

| Setting | Value |
| --- | --- |
| Format | **glTF Binary (.glb)** |
| Include → Limit to | **Selected Objects** (select your prop first) |
| Transform | **+Y Up** — the default, and correct |
| Data → Mesh | Apply Modifiers **on**, Normals **on**, UVs on if you used any |
| Data → Material | Export, Images: Automatic |
| Compression | **Off** |

Leave compression off. The asset pipeline runs Meshopt afterwards, which is both
smaller after gzip and far cheaper to decode on a phone than Draco.

Save as `public/models/<name>.glb`, so `public/models/monitor.glb`.

---

## How the drop-in actually works

Worth knowing, in case it misbehaves. `scripts/gen-prop-manifest.mjs` reads
`public/models/` and writes `data/props.generated.ts`, a list of
`name -> /models/name.glb`. `components/room/Prop.tsx` looks each prop up in that
list and renders your model if it finds one, the code-authored version if it does
not — and sets shadows on everything it imports, since glTF does not carry them.

So the object name in Blender is the whole contract. Nothing else needs editing,
and you can replace props one at a time, in any order, with the room looking
finished the entire way through.

The manifest is regenerated before every `npm run dev` and `npm run build`, and
continuously by `npm run props:watch`.

---

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| Nothing appears at all | Object name does not match the contract table. Check for `.001` |
| Wrong size, or offset into the floor | Transforms not applied — `Ctrl+A → All Transforms` |
| Lying on its side | Exported with the wrong up-axis. Use **+Y Up** |
| Black, or lit from inside | Normals inverted. Edit Mode → `A` → `Shift+N` |
| Bevel looks like black shards | Non-uniform object scale. `Ctrl+A → Scale` |
| Pokes through the wall | Depth exceeds the contract. Check the `D` column |
| Monitor floats above / sinks into the desk | Stand length ≠ `BASE_DROP` (0.705) below the screen centre |
| Window is a blank panel | You modelled glass or a backdrop inside the opening. Remove it |
| Hotspot still highlights the old shape | Hard-refresh; the manifest is cached until the next build |
| Export landed but nothing changed | `npm run props:watch` is not running. Start it, or restart `npm run dev` |
| Things on the desk now float | Your desk is not 0.805 tall. Match it, or change `DESK_TOP` |
| File is over 500 KB | Too many polygons, or a texture crept in. See below |

---

## Keeping it small

The whole room has a **2 MB budget** for models. Per prop, aim for:

| | Triangles | File size |
| --- | --- | --- |
| photo, whiteboard, resume | < 500 | < 30 KB |
| monitor, window, tower | < 2,000 | < 60 KB |
| desk | < 2,000 | < 60 KB |
| bookcase | < 8,000 | < 200 KB |
| football | < 1,000 | < 40 KB |
| room shell | < 1,000 | < 40 KB |

Check in Blender with the Statistics overlay (viewport overlays dropdown →
Statistics).

If a file comes out too big, in order of effectiveness:

1. **Apply and remove Subdivision Surface modifiers.** One accidental subdiv on a
   box turns 12 triangles into thousands.
2. **Lower Bevel segments to 1.** You will not see the difference.
3. **Shrink textures.** 1024 × 1024 maximum; 512 is usually enough. Neither
   Meshopt nor Draco compresses textures at all.
4. **Delete faces nobody can see** — the back of the bookcase, the underside of
   the desk. The camera never orbits behind the wall, so anything facing away is
   pure waste.

Once a prop is in, re-measure the route:

```bash
npm run build
```

and compare `/room` against its current 692 KB over the wire — that is the
figure with no models in play at all. If one prop adds more than a couple of
hundred KB, open it in Blender and find out why before adding the next.
