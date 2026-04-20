import { GameState } from "../types/game.types";
import type { GameSprites } from "../types/sprite.types";
import { Bird } from "../model/bird.model";
import { Pipes } from "../model/pipe.model";
import { Button } from "../model/button.model";
import { MainView } from "../views/main.view";
import {
  BEST_SCORE_KEY,
  FG_SCROLL_SPEED,
  FG_WRAP_WIDTH,
  SCORE_OK_BUTTON_Y_OFFSET,
} from "../constants";

export class GameController {
  private state = GameState.Splash;
  private score = 0;
  private best: number;
  private frameCount = 0;
  private fgpos = 0;

  private readonly bird: Bird;
  private readonly pipes: Pipes;
  private readonly okButton: Button;
  private readonly view: MainView;

  constructor(
    private readonly sprites: GameSprites,
    private readonly ctx: CanvasRenderingContext2D,
    private readonly canvasWidth: number,
    private readonly canvasHeight: number
  ) {
    this.best = Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;
    this.bird = new Bird();
    this.pipes = new Pipes();
    this.view = new MainView();
    this.okButton = new Button(
      (canvasWidth - sprites.s_buttons.Ok.width) / 2,
      canvasHeight - SCORE_OK_BUTTON_Y_OFFSET,
      sprites.s_buttons.Ok.width,
      sprites.s_buttons.Ok.height
    );
  }

  getState(): GameState {
    return this.state;
  }

  startGame(): void {
    this.state = GameState.Game;
    this.bird.jump();
  }

  jump(): void {
    this.bird.jump();
  }

  tryRestartAt(x: number, y: number): void {
    if (this.okButton.contains(x, y)) {
      this.reset();
    }
  }

  update(): void {
    this.frameCount++;

    if (this.state !== GameState.Score) {
      this.fgpos = (this.fgpos - FG_SCROLL_SPEED) % FG_WRAP_WIDTH;
    } else {
      this.best = Math.max(this.best, this.score);
      localStorage.setItem(BEST_SCORE_KEY, this.best.toString());
    }

    if (this.state === GameState.Game) {
      const { scoreDelta, hit } = this.pipes.update(
        this.frameCount,
        this.canvasHeight,
        this.sprites.s_fg.height,
        this.sprites.s_pipeSouth.width,
        this.sprites.s_pipeSouth.height,
        this.bird
      );
      this.score += scoreDelta;
      if (hit) {
        this.state = GameState.Score;
      }
    }

    const hitGround = this.bird.update(
      this.state,
      this.frameCount,
      this.canvasHeight,
      this.sprites.s_fg.height
    );

    if (hitGround && this.state === GameState.Game) {
      this.state = GameState.Score;
    }
  }

  render(): void {
    this.view.render(
      this.ctx,
      {
        state: this.state,
        width: this.canvasWidth,
        height: this.canvasHeight,
        score: this.score,
        best: this.best,
        fgpos: this.fgpos,
        okButton: this.okButton,
      },
      this.bird,
      this.pipes,
      this.sprites
    );
  }

  private reset(): void {
    this.pipes.reset();
    this.state = GameState.Splash;
    this.score = 0;
    this.frameCount = 0;
  }
}
