import type { Sprite } from "../model/sprite.model";

export type TSprite = Sprite;
export type TSpriteCollection = Record<string, Sprite>;

export type GameSprites = {
  s_bird: Sprite[];
  s_bg: Sprite;
  s_fg: Sprite;
  s_pipeNorth: Sprite;
  s_pipeSouth: Sprite;
  s_text: TSpriteCollection;
  s_score: Sprite;
  s_splash: Sprite;
  s_medals: TSpriteCollection;
  s_buttons: TSpriteCollection;
  s_numberS: Sprite;
  s_numberB: Sprite;
};
