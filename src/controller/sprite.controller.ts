import { Sprite } from "../model/sprite.model";
import type { GameSprites } from "../types/sprite.types";

export class SpriteController {
  load(src: string): Promise<GameSprites> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(this.initSprites(img));
      img.onerror = () => reject(new Error(`Failed to load sprite sheet: ${src}`));
      img.src = src;
    });
  }

  private initSprites(img: HTMLImageElement): GameSprites {
    return {
      s_bird: [
        new Sprite(img, 156, 115, 17, 12),
        new Sprite(img, 156, 128, 17, 12),
        new Sprite(img, 156, 141, 17, 12),
      ],
      s_bg: new Sprite(img, 0, 0, 138, 114),
      s_fg: new Sprite(img, 138, 0, 112, 56),
      s_pipeNorth: new Sprite(img, 251, 0, 26, 200),
      s_pipeSouth: new Sprite(img, 277, 0, 26, 200),
      s_text: {
        FlappyBird: new Sprite(img, 59, 114, 96, 22),
        GameOver: new Sprite(img, 59, 136, 94, 19),
        GetReady: new Sprite(img, 59, 155, 87, 22),
      },
      s_buttons: {
        Rate: new Sprite(img, 79, 177, 40, 14),
        Menu: new Sprite(img, 119, 177, 40, 14),
        Share: new Sprite(img, 159, 177, 40, 14),
        Score: new Sprite(img, 79, 191, 40, 14),
        Ok: new Sprite(img, 119, 191, 40, 14),
        Start: new Sprite(img, 159, 191, 40, 14),
      },
      s_score: new Sprite(img, 138, 56, 113, 58),
      s_splash: new Sprite(img, 0, 114, 59, 49),
      s_medals: {
        Platinum: new Sprite(img, 175, 114, 22, 22),
        Silver: new Sprite(img, 197, 114, 22, 22),
        Gold: new Sprite(img, 175, 136, 22, 22),
        Bronze: new Sprite(img, 197, 136, 22, 22),
      },
      s_numberS: new Sprite(img, 0, 177, 6, 7),
      s_numberB: new Sprite(img, 0, 188, 7, 10),
    };
  }
}
