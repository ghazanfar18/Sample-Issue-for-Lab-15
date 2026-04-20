import {
  MAX_UPDATES_PER_FRAME,
  TICK_RATE,
  TICK_SPIRAL_CAP,
} from "../constants/game.constants";

/**
 * Runs a fixed-timestep game loop at 60 ticks/s regardless of monitor refresh rate.
 * `update` is called one or more times per frame to catch up, then `render` once.
 * The spiral-of-death cap prevents runaway catch-up after tab switches or lag spikes.
 * We also cap updates/frame so entities don't "jump" after brief jank.
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

    let updatesThisFrame = 0;
    while (
      accumulator >= TICK_RATE &&
      updatesThisFrame < MAX_UPDATES_PER_FRAME
    ) {
      update();
      accumulator -= TICK_RATE;
      updatesThisFrame++;
    }

    // If we are still behind after the per-frame budget, drop extra backlog.
    // This favors smooth visuals over perfect simulation catch-up.
    if (updatesThisFrame === MAX_UPDATES_PER_FRAME && accumulator >= TICK_RATE) {
      accumulator = TICK_RATE;
    }

    render();
    window.requestAnimationFrame(loop);
  };

  window.requestAnimationFrame(loop);
}
