import { TICK_RATE, TICK_SPIRAL_CAP } from "../constants/game.constants";

/**
 * Runs a fixed-timestep game loop at 60 ticks/s regardless of monitor refresh rate.
 * `update` is called one or more times per frame to catch up, then `render` once.
 * The spiral-of-death cap prevents runaway catch-up after tab switches or lag spikes.
 */
export function monitorTickRate(update: () => void, render: () => void): void {
  let lastTime = performance.now();
  let accumulator = 0;

  const loop = (now: number) => {
    accumulator += now - lastTime;
    lastTime = now;

    if (accumulator > TICK_RATE * TICK_SPIRAL_CAP) {
      accumulator = TICK_RATE * TICK_SPIRAL_CAP;
    }

    while (accumulator >= TICK_RATE) {
      update();
      accumulator -= TICK_RATE;
    }

    render();
    window.requestAnimationFrame(loop);
  };

  window.requestAnimationFrame(loop);
}
