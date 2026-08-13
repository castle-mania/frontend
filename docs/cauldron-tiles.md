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
