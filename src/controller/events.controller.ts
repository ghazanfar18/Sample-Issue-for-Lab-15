import { GameState } from "../types/game.types";
import type { InputCoords } from "../types/ui.types";
import type { GameController } from "./game.controller";

export class EventsController {
  constructor(private readonly game: GameController) {}

  attach(inputEvent: "mousedown" | "touchstart"): void {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener(inputEvent, this.onPress);
  }

  detach(inputEvent: "mousedown" | "touchstart"): void {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener(inputEvent, this.onPress);
  }

  private onKeyDown = (evt: KeyboardEvent): void => {
    if (evt.code !== "Space") return;

    switch (this.game.getState()) {
      case GameState.Splash:
        this.game.startGame();
        break;
      case GameState.Game:
        this.game.jump();
        break;
    }
  };

  private onPress = (evt: MouseEvent | TouchEvent): void => {
    switch (this.game.getState()) {
      case GameState.Splash:
        this.game.startGame();
        break;
      case GameState.Game:
        this.game.jump();
        break;
      case GameState.Score: {
        const { x, y } = this.extractCoords(evt);
        this.game.tryRestartAt(x, y);
        break;
      }
    }
  };

  private extractCoords(evt: MouseEvent | TouchEvent): InputCoords {
    if (evt instanceof MouseEvent) {
      return { x: evt.offsetX, y: evt.offsetY };
    }
    return { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
  }
}
