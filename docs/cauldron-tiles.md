# Cauldron brewing tiles

The brewing surface ("inside of the cauldron") is a 3×3 grid of animated liquid
tiles. Generators are placed on individual tiles to brew them into elite
versions. This doc covers exact placement geometry so the grid, the generator
sprites, and the animations all line up.

## Assets

`public/imgs/cauldron/cauldron-r{row}-c{col}.gif` — nine tiles, `row`/`col` ∈ 0..2.

- 624×336 px, transparent background, 14 frames @ 100 ms, seamless loop.
- The nine tiles form **one** whirlpool centered on `r1-c1`. Each tile is
  position-specific — always render all nine in their fixed grid positions;
  they are not interchangeable and cannot be reused as generic liquid.
- Art scale matches the generator gifs (1 art pixel = 6 px), so no relative
  scaling between tiles and generators is needed.

## Grid layout (asset pixel space, before display scaling)

Within each tile canvas the 2:1 diamond surface spans x 12..612, y 18..318;
its center is at **(312, 168)**.

Neighbor offsets: `col+1` → `(+300, +150)`, `row+1` → `(−300, +150)`:

```
tile_x(row, col) = X0 + 300 * (col - row)
tile_y(row, col) = Y0 + 150 * (col + row)
```

The composed grid is 1824×936. Draw tiles in ascending `(row + col)` order —
canvases overlap by a couple of pixels at the widened diamond corners.

## Scaling to the board

The diamond surface is 600 px wide at asset scale. If board plots display at
`W` px wide, scale the whole composition by `W / 600` (nearest-neighbor to
keep pixels crisp).

## Placing a generator on a tile

Generator iso gifs are 420×528 with the machine's ground-diamond center at
(210, 408). To sit a generator on a tile:

```
paste_x = tile_x + 102     // = tile center 312 − 210
paste_y = tile_y - 240     // = tile center 168 − 408
```

Draw order: all nine tiles first (ground layer), then generators sorted by
ascending `(row + col)`.

## Animation sync

Tiles are 14 frames @ 100 ms (1.4 s loop); generator gifs are 7 or 14 frames
@ 100 ms. Both divide the tile loop, so if all gifs start on a shared clock
everything stays in phase (machines loop exactly twice per liquid loop).
Avoid restarting gifs on re-render.

## Grass plot tiles (same anchor math)

`public/imgs/grass-plot.png` (worn dirt patch + baked contact shadow — use
under a placed generator) and `public/imgs/grass-plot-plain.png` (empty plot).

- 624×420; the diamond surface spans y 18..318 with center (312, 168), same
  as the cauldron tiles, so the generator paste offset is identical:
  `(tile_x + 102, tile_y − 240)`.
- The bottom ~102 px are the floating-island soil slab; the two variants have
  pixel-identical silhouettes and can be swapped in place without popping.
