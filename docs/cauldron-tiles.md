# Cauldron brewing surface

The brewing surface ("inside of the cauldron") is one animated liquid sheet —
a 3×3 grid of plot positions sharing a single green whirlpool — surrounded by
a two-part cauldron rim. Generators are placed on individual plot positions to
brew them into elite versions. This doc covers exact placement geometry so the
liquid, the rim, the generator sprites, and the animations all line up.

## Assets (public/imgs/cauldron/)

- `cauldron-liquid.gif` — the whole 3×3 liquid surface as ONE gif: 1824×936,
  transparent background, 14 frames @ 100 ms, seamless loop. Rendered as a
  single animation so the grid can never drift out of sync.
- `cauldron-rim-back.png` / `cauldron-rim-front.png` — one static rim split
  into two layers so generators render inside the pot (back = far wall,
  front = near lip). Shadows on the liquid and walls are baked in — do not
  add your own.
- Art scale matches the generator gifs (1 art pixel = 6 px); no relative
  scaling between liquid, rim, and generators.

## Layout (asset pixels, before display scaling)

Let `(X0, Y0)` be where you paste `cauldron-liquid.gif` (its top-left corner).

- The nine plot positions inside it, `row`/`col` ∈ 0..2 (r1-c1 is the
  whirlpool eye at the center):

```
plot_x(row, col) = X0 + 300 * (col - row) + 100
plot_y(row, col) = Y0 + 150 * (col + row) + 50
```

  Each plot's diamond surface center is at `(plot_x + 312, plot_y + 168)`.

- Rim: paste BOTH rim layers at `(X0 - 156, Y0 - 132)`. Never offset them
  relative to each other. The rim's inner edge intentionally overlaps the
  liquid's outline to hide the seam.

## Placing a generator on a plot

Generator iso gifs are 420×528 with the machine's ground-diamond center at
(210, 408). To sit a generator on plot (row, col):

```
paste_x = plot_x(row, col) + 102
paste_y = plot_y(row, col) - 240
```

## Draw order (back to front)

1. `cauldron-liquid.gif`
2. `cauldron-rim-back.png`
3. generator sprites, ascending `(row + col)`
4. `cauldron-rim-front.png`

## Scaling & animation

- The liquid's full diamond is 1800 px wide (each plot diamond 600 px). If
  board plots display `W` px wide, scale the whole composition by `W / 600`,
  nearest-neighbor so pixels stay crisp.
- The liquid gif is 14 frames @ 100 ms; generator gifs are 7 or 14 frames
  @ 100 ms. Start all gifs on a shared clock and machines stay in phase with
  the liquid (looping exactly twice per liquid loop). Avoid restarting gifs
  on re-render.

## Grass plot tiles (same anchor math)

`public/imgs/grass-plot.png` (worn dirt patch + baked contact shadow — use
under a placed generator) and `public/imgs/grass-plot-plain.png` (empty plot).

- 624×420; the diamond surface spans y 18..318 with center (312, 168), same
  as a cauldron plot, so the generator paste offset is identical:
  `(tile_x + 102, tile_y − 240)`.
- The bottom ~102 px are the floating-island soil slab; the two variants have
  pixel-identical silhouettes and can be swapped in place without popping.

## Wooden floor tiles (public/imgs/floor/)

Broken wooden plank flooring for the area around the cauldron. Eleven pieces,
ALL on the same 624×336 canvas as a full plot tile — every piece pastes at
exactly the position a full tile would occupy on the lattice; the cut sides
are baked into the art as transparency.

- `wood-floor-a.png` / `wood-floor-b.png` — full diamonds (same base plank
  pattern, different damage), mix freely.
- `wood-floor-half-{bottom-a,bottom-b,top,left,right}.png` — edge pieces named
  for which side of the floor REGION they sit on; each keeps the half of the
  diamond facing into the region, producing a straight cut on that side
  (horizontal for top/bottom, vertical for left/right).
- `wood-floor-corner-{tl,tr,bl,br}.png` — quarter pieces for the region's
  corners where two straight edges meet.

Layout recipe for a rectangular floor (asset px; lattice pitch 600 wide /
150 tall per row, odd rows offset +300):

```
row 0 (top):    corner-tl,  half-top ... ,  corner-tr
row 1 (odd):      full,  full ...          (offset +300)
row 2 (even):   half-left,  full ...,  half-right
...alternate rows 1/2 pattern...
row N (bottom): corner-bl,  half-bottom ...,  corner-br
```

Piece (row s, slot t) pastes at `(FX0 + 600*t + (300 if s odd else 0),
FY0 + 150*s)`. The plank pattern is period-locked to the lattice, so seams
and board joints continue across every piece in any arrangement.

Notes: the missing-plank holes are fully transparent (the room background
shows through). Pieces are static PNGs; draw them under everything else
(they are ground). Scale with the same `W / 600` factor as the rest.

## Table desk (public/imgs/props/table-desk.png)

Wooden work table occupying one plot tile. Static PNG, 420x528, on the SAME
anchor system as the generator gifs: its ground-diamond center is at
(210, 408), so to place it on any plot/tile paste at:

```
paste_x = plot_x + 102
paste_y = plot_y - 240
```

- Draw it with the other entities (generators), sorted together by ascending
  (row + col); it occludes and is occluded exactly like a machine.
- A dithered contact shadow is baked in around/under the legs — it lands on
  whatever ground is beneath (wood floor, grass). Do not add another shadow.
- Scale with the same plot_width / 600 factor as everything else.

## Craft splash (public/imgs/cauldron/splash-back.gif, splash-front.gif)

Play-once plop effect for when a generator is crafted: the machine hops,
plunges into the brew, and a splash erupts while it sinks. Two layers of ONE
burst (rear-arc elements vs near-arc) so it wraps the sinking machine.

- Both gifs: 768x564, 12 frames @ 100ms (last 140ms), transparent, play ONCE
  (no loop). Paste BOTH at `(plot_x - 72, plot_y - 228)`.
- Draw order during the effect: liquid -> rim-back -> splash-back -> machine
  (masked, see below) -> splash-front -> rim-front.

### Machine motion (asset px, 100ms per step)

Vertical offset of the machine sprite from its resting paste position:

```
step:   0     1     2      3      4      5+
dy:     0   -84   +60   +156   +264   remove machine
```

Start the splash gifs at step 2 (impact). Rise is one step (ease-out pop),
fall is one step (gravity snap). After step 4 stop drawing the machine.

### Waterline mask while sinking (dy > 0)

Hide every machine pixel at or below the curve (mx = sprite column 0..419):

```
ylim(mx) = surface_y - 30 + floor(105 * sqrt(1 - ((mx-210)/240)^2) / 6) * 6
```

where `surface_y = plot_y + 168` (the plot diamond center scanline).
Then add foam so no cut edge ever shows:

1. Foam strip: for each 6px column where the machine has visible pixels
   within 12px above ylim, draw two 6px blocks of #d6eda4 at ylim-6 and ylim.
2. Foam ring: 6px blocks where
   `0.80 <= ((bx-cx)/252)^2 + ((by-surface_y)/110)^2 <= 1.22`
   (cx = plot_x + 312); blocks above surface_y draw BEFORE the machine,
   blocks below AFTER it.

### Staggering

When several generators are crafted together, stagger each plot's sequence
start by ~160ms (order by ascending row + col). Simultaneous identical plops
read as one mechanical event; staggered ones read as a real pour.
