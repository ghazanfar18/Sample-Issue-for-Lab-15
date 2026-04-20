import type { TSprite } from "../types/sprite.types";
import { GameState } from "../types/game.types";
import {
  BIRD_ANIM_SPEED_GAME,
  BIRD_ANIM_SPEED_SPLASH,
  BIRD_BOB_AMPLITUDE,
  BIRD_BOB_OFFSET,
  BIRD_BOB_PERIOD,
  BIRD_GRAVITY,
  BIRD_GROUND_MARGIN,
  BIRD_JUMP_FORCE,
  BIRD_RADIUS,
  BIRD_ROTATION_MAX,
  BIRD_ROTATION_STEP,
  BIRD_ROTATION_TILT,
  BIRD_START_X,
} from "../constants/physics.constants";

export class Bird {
  readonly x = BIRD_START_X;
  readonly radius = BIRD_RADIUS;

  y = 0;
  velocity = 0;
  rotation = 0;
  private frame = 0;
  private readonly animation = [0, 1, 2, 1];

  jump(): void {
    this.velocity = -BIRD_JUMP_FORCE;
  }

  /**
   * Advances physics/animation by one tick.
   * Returns true when the bird first contacts the ground this tick,
   * so the caller can trigger a state transition.
   */
  update(
    state: GameState,
    frameCount: number,
    sceneHeight: number,
    groundHeight: number
  ): boolean {
    const animSpeed =
      state === GameState.Splash ? BIRD_ANIM_SPEED_SPLASH : BIRD_ANIM_SPEED_GAME;
    this.frame += frameCount % animSpeed === 0 ? 1 : 0;
    this.frame %= this.animation.length;

    if (state === GameState.Splash) {
      this.y =
        sceneHeight -
        BIRD_BOB_OFFSET +
        BIRD_BOB_AMPLITUDE * Math.cos(frameCount / BIRD_BOB_PERIOD);
      this.rotation = 0;
      return false;
    }

    this.velocity += BIRD_GRAVITY;
    this.y += this.velocity;

    const groundY = sceneHeight - groundHeight - BIRD_GROUND_MARGIN;
    const hitGround = this.y >= groundY;

    if (hitGround) {
      this.y = groundY;
      this.velocity = BIRD_JUMP_FORCE;
    }

    if (this.velocity >= BIRD_JUMP_FORCE) {
      this.frame = 1;
      this.rotation = Math.min(BIRD_ROTATION_MAX, this.rotation + BIRD_ROTATION_STEP);
    } else {
      this.rotation = BIRD_ROTATION_TILT;
    }

    return hitGround;
  }

  draw(ctx: CanvasRenderingContext2D, birdSprites: TSprite[]): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    const sprite = birdSprites[this.animation[this.frame]];
    sprite.draw(ctx, -sprite.width / 2, -sprite.height / 2);
    ctx.restore();
  }
}
