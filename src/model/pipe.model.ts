import type { Pipe, PipeUpdateResult } from "../types/pipe.types";
import type { TSprite } from "../types/sprite.types";
import {
  PIPE_GAP,
  PIPE_MIN_MARGIN,
  PIPE_RANDOM_RANGE,
  PIPE_SPAWN_RATE,
  PIPE_SPEED,
  PIPE_START_X,
} from "../constants/pipe.constants";
import type { Bird } from "./bird.model";

export class Pipes {
  private items: Pipe[] = [];

  reset(): void {
    this.items = [];
  }

  update(
    frameCount: number,
    sceneHeight: number,
    groundHeight: number,
    pipeWidth: number,
    pipeHeight: number,
    bird: Bird
  ): PipeUpdateResult {
    if (frameCount % PIPE_SPAWN_RATE === 0) {
      this.items.push({
        x: PIPE_START_X,
        y: sceneHeight - (pipeHeight + groundHeight + PIPE_MIN_MARGIN + PIPE_RANDOM_RANGE * Math.random()),
        width: pipeWidth,
        height: pipeHeight,
      });
    }

    let scoreDelta = 0;
    let hit = false;

    for (let i = 0; i < this.items.length; i++) {
      const pipe = this.items[i];

      if (i === 0) {
        if (pipe.x === bird.x) {
          scoreDelta += 1;
        }
        if (this.collidesWithBird(pipe, bird)) {
          hit = true;
        }
      }

      pipe.x -= PIPE_SPEED;
      if (pipe.x < -pipe.width) {
        this.items.splice(i, 1);
        i--;
      }
    }

    return { scoreDelta, hit };
  }

  draw(ctx: CanvasRenderingContext2D, northSprite: TSprite, southSprite: TSprite): void {
    for (const pipe of this.items) {
      southSprite.draw(ctx, pipe.x, pipe.y);
      northSprite.draw(ctx, pipe.x, pipe.y + PIPE_GAP + pipe.height);
    }
  }

  private collidesWithBird(pipe: Pipe, bird: Bird): boolean {
    const cx = Math.min(Math.max(bird.x, pipe.x), pipe.x + pipe.width);
    const cyTop = Math.min(Math.max(bird.y, pipe.y), pipe.y + pipe.height);
    const cyBottom = Math.min(
      Math.max(bird.y, pipe.y + pipe.height + PIPE_GAP),
      pipe.y + 2 * pipe.height + PIPE_GAP
    );

    const dx = bird.x - cx;
    const dyTop = bird.y - cyTop;
    const dyBottom = bird.y - cyBottom;
    const dTop = dx * dx + dyTop * dyTop;
    const dBottom = dx * dx + dyBottom * dyBottom;
    const r = bird.radius * bird.radius;

    return r > dTop || r > dBottom;
  }
}
