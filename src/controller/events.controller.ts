import { GameState } from "../types/game.types";
import type { InputCoords } from "../types/ui.types";
import type { GameController } from "./game.controller";

export class EventsController {
  constructor(
    private readonly game: GameController,
    private readonly canvas: HTMLCanvasElement
  ) {}

  attach(inputEvent: "mousedown" | "touchstart"): void {
    document.addEventListener("keydown", this.onKeyDown);
    this.canvas.addEventListener(inputEvent, this.onPress, { passive: false });
  }

  detach(inputEvent: "mousedown" | "touchstart"): void {
    document.removeEventListener("keydown", this.onKeyDown);
    this.canvas.removeEventListener(inputEvent, this.onPress);
  }

  private onKeyDown = (evt: KeyboardEvent): void => {
    if (evt.code !== "Space") return;
    if (!this.game.canAcceptInput()) return;

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
    evt.preventDefault();
    if (!this.game.canAcceptInput()) return;
    const { x, y } = this.extractCoords(evt);

    switch (this.game.getState()) {
      case GameState.Splash:
        this.game.startGame();
        break;
      case GameState.Game:
        this.game.jump();
        break;
      case GameState.Score: {
        this.game.tryRestartAt(x, y);
        break;
      }
    }
  };

  private extractCoords(evt: MouseEvent | TouchEvent): InputCoords {
    const rect = this.canvas.getBoundingClientRect();
    const clientX = evt instanceof MouseEvent ? evt.clientX : evt.touches[0].clientX;
    const clientY = evt instanceof MouseEvent ? evt.clientY : evt.touches[0].clientY;

    const mappedX = ((clientX - rect.left) * this.canvas.width) / rect.width;
    const mappedY = ((clientY - rect.top) * this.canvas.height) / rect.height;

    return {
      x: Math.max(0, Math.min(this.canvas.width, mappedX)),
      y: Math.max(0, Math.min(this.canvas.height, mappedY)),
    };
  }
}
