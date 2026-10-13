# Modelling the room props in Blender

A guide for **these four objects**, not a general Blender course. Everything here
is box modelling. If a tutorial starts talking about sculpting, retopology or
rigging, you are in the wrong tutorial.

---

## What you actually need to learn

Five things, and that is the whole list:

| | What | Why |
| --- | --- | --- |
| 1 | **Box modelling** — `E` extrude, `I` inset, `Ctrl+R` loop cut | Every prop is a box |
| 2 | **Bevel modifier** | The big one — see below |
| 3 | **Array modifier** | Shelves and books: model one, repeat it |
| 4 | **Base colour + roughness** | Stylized low-poly needs no textures |
| 5 | **glTF 2.0 export** | Built into Blender, no add-on |

### What you do NOT need

Sculpting · retopology · UV unwrapping · rigging · shader nodes · scene lighting ·
HDRIs · compositing. The site does the lighting. Skip every tutorial that opens
with a donut.

### The bevel is most of the job

Nothing in the real world has a perfectly sharp 90° edge, so a sharp edge reads as
fake no matter how good everything else is. A 2–3 mm bevel catches a highlight
along every corner and the object immediately looks made rather than generated.

Add a **Bevel modifier**, set Amount to about `0.003` (3 mm), Segments to `2`.
That one step is the largest visual difference between the code props currently on
the site and a modelled one.

---

## The contract

The room binds hotspots to **mesh names**. Get these exactly right and your file
drops in with no code change. Get them wrong and nothing appears.

| Prop | Object name | Size (m) | Notes |
| --- | --- | --- | --- |
| Monitor | `monitor` | 1.2 × 0.72 × 0.06 | Origin at the **screen centre**; the stand hangs below |
| Framed map | `map` | 1.4 × 0.95 × 0.04 | Faces **+Z**. Photo on the front face |
| Bookshelf | `bookshelf` | 0.45 × 2.0 × 1.6 | Depth × height × width. Opening faces **+X** |
| Football | `football` | ⌀ 0.52 | Sits on the floor; origin at the centre |

Rules that matter:

- **Model at the world origin.** The site positions the prop. If you model it
  where it sits in the room, it will be offset twice.
- **Apply all transforms before export** — `Ctrl+A` → All Transforms. Skipping
  this is the single most common reason a model shows up at the wrong size or
  in the wrong place.
- **Blender units are metres and match the site 1:1.** Model at real-world scale.
  A monitor really is about 1.2 m wide in this room's slightly oversized scale.
- **The object name becomes the glTF node name.** Rename in the Outliner, not the
  mesh data. `monitor`, lowercase, no suffix — Blender's `monitor.001` will not
  match.

---

## Export settings

`File → Export → glTF 2.0 (.glb/.gltf)`

| Setting | Value |
| --- | --- |
| Format | **glTF Binary (.glb)** |
| Include | **Selected Objects** (select your prop first) |
| Transform | **+Y Up** — this is the default and is correct for three.js |
| Data → Mesh | Apply Modifiers **on**, Normals **on**, UVs on if you used any |
| Compression | **Off** |

Leave compression off. The asset pipeline runs Meshopt afterwards, which is both
smaller after gzip and far cheaper to decode on a phone than Draco.

Save as `public/models/<name>.glb` — so `public/models/monitor.glb`.

---

## Dropping it in

```bash
# 1. put the file in place
cp ~/Desktop/monitor.glb public/models/

# 2. that's it. the manifest regenerates on the next dev/build run
npm run dev
```

`scripts/gen-prop-manifest.mjs` reads `public/models/` and writes
`data/props.generated.ts`. `components/room/Prop.tsx` renders your model if one
exists and the code-authored version if it does not — so you can replace props
one at a time and the room looks finished the whole way through.

To go back to the code version, delete the `.glb` and rebuild.

---

## Suggested order

Easiest first, so you learn on the forgiving one:

1. **`map`** — a frame is two nested boxes. An hour, including the fiddling.
2. **`monitor`** — bezel, screen inset, neck, base. Four boxes and a bevel.
3. **`bookshelf`** — carcass, then one shelf and one book arrayed. The Array
   modifier does the repetitive part.
4. **`football`** — the only one that is not a box. A UV sphere with the panel
   pattern is genuinely fiddly; the faceted code version may well be good enough,
   so leave this one until last or skip it.

---

## Checking your work

```bash
npm run dev                 # see it in place at /room
npm run build               # confirms the manifest picked it up
```

Watch for:

- **Nothing appears** → object name does not match the table above
- **Wrong size or position** → transforms were not applied (`Ctrl+A`)
- **Lying on its side** → exported with the wrong up-axis; use **+Y Up**
- **Black or flat** → normals inverted. In Edit Mode, `A` then `Shift+N`
- **File over ~500 KB for one prop** → too many polygons, or a texture crept in.
  These are low-poly props; each should be tens of KB.
