import type { Rect } from "./ui.types";

export enum GameState {
  Splash = 0,
  Game = 1,
  Score = 2,
}

export type GameSnapshot = {
  state: GameState;
  width: number;
  height: number;
  bgpos: number;
  score: number;
  best: number;
  fgpos: number;
  okButton: Rect;
};
