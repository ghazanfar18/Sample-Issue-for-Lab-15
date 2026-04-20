import type { GameSnapshot } from "../types/game.types";
import { GameState } from "../types/game.types";
import type { GameSprites } from "../types/sprite.types";
import type { Bird } from "../model/bird.model";
import type { Pipes } from "../model/pipe.model";
import { getMedalForScore } from "../controller/medal.controller";
import {
  HUD_SCORE_Y,
  SCORE_BEST_Y_OFFSET,
  SCORE_CURRENT_Y_OFFSET,
  SCORE_GAME_OVER_Y_OFFSET,
  SCORE_MEDAL_PANEL_X_OFFSET,
  SCORE_MEDAL_PANEL_Y_OFFSET,
  SCORE_MEDAL_SCALE,
  SCORE_NUMBER_X_OFFSET,
  SCORE_PANEL_Y_OFFSET,
  SPLASH_BANNER_Y_OFFSET,
  SPLASH_READY_Y_OFFSET,
} from "../constants/screen.constants";

export class MainView {
  render(
    ctx: CanvasRenderingContext2D,
    snapshot: GameSnapshot,
    bird: Bird,
    pipes: Pipes,
    sprites: GameSprites
  ): void {
    const { state, width, height, bgpos, score, best, fgpos, okButton } = snapshot;
    const centerX = width / 2;

    ctx.fillRect(0, 0, width, height);

    sprites.s_bg.draw(ctx, bgpos, height - sprites.s_bg.height);
    sprites.s_bg.draw(ctx, bgpos + sprites.s_bg.width, height - sprites.s_bg.height);
    sprites.s_bg.draw(ctx, bgpos - sprites.s_bg.width, height - sprites.s_bg.height);

    pipes.draw(ctx, sprites.s_pipeNorth, sprites.s_pipeSouth);
    bird.draw(ctx, sprites.s_bird);

    sprites.s_fg.draw(ctx, fgpos, height - sprites.s_fg.height);
    sprites.s_fg.draw(ctx, fgpos + sprites.s_fg.width, height - sprites.s_fg.height);

    if (state === GameState.Splash) {
      this.renderSplash(ctx, sprites, centerX, height);
      return;
    }

    if (state === GameState.Score) {
      this.renderScoreScreen(ctx, sprites, snapshot, centerX);
      return;
    }

    sprites.s_numberB.draw(ctx, 0, HUD_SCORE_Y, score, centerX);
  }

  private renderSplash(
    ctx: CanvasRenderingContext2D,
    sprites: GameSprites,
    centerX: number,
    height: number
  ): void {
    sprites.s_splash.draw(
      ctx,
      centerX - sprites.s_splash.width / 2,
      height - SPLASH_BANNER_Y_OFFSET
    );
    sprites.s_text.GetReady.draw(
      ctx,
      centerX - sprites.s_text.GetReady.width / 2,
      height - SPLASH_READY_Y_OFFSET
    );
  }

  private renderScoreScreen(
    ctx: CanvasRenderingContext2D,
    sprites: GameSprites,
    snapshot: GameSnapshot,
    centerX: number
  ): void {
    const { height, score, best, okButton } = snapshot;

    sprites.s_text.GameOver.draw(
      ctx,
      centerX - sprites.s_text.GameOver.width / 2,
      height - SCORE_GAME_OVER_Y_OFFSET
    );

    const panelX = centerX - sprites.s_score.width / 2;
    const panelY = height - SCORE_PANEL_Y_OFFSET;
    sprites.s_score.draw(ctx, panelX, panelY);
    sprites.s_buttons.Ok.draw(ctx, okButton.x, okButton.y);

    const medal = getMedalForScore(score, sprites);
    if (medal) {
      const scaledWidth = medal.width * SCORE_MEDAL_SCALE;
      const scaledHeight = medal.height * SCORE_MEDAL_SCALE;
      const medalX =
        panelX + SCORE_MEDAL_PANEL_X_OFFSET - (scaledWidth - medal.width) / 2;
      const medalY =
        panelY + SCORE_MEDAL_PANEL_Y_OFFSET - (scaledHeight - medal.height) / 2;
      ctx.drawImage(
        medal.img,
        medal.x,
        medal.y,
        medal.width,
        medal.height,
        medalX,
        medalY,
        scaledWidth,
        scaledHeight
      );
    }

    sprites.s_numberS.draw(
      ctx,
      centerX - SCORE_NUMBER_X_OFFSET,
      height - SCORE_CURRENT_Y_OFFSET,
      score,
      0,
      10
    );
    sprites.s_numberS.draw(
      ctx,
      centerX - SCORE_NUMBER_X_OFFSET,
      height - SCORE_BEST_Y_OFFSET,
      best,
      0,
      10
    );
  }

}
