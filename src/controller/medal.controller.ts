import type { TSprite } from "../types/sprite.types";
import type { GameSprites } from "../types/sprite.types";
import {
  MEDAL_BRONZE_SCORE,
  MEDAL_GOLD_SCORE,
  MEDAL_PLATINUM_SCORE,
  MEDAL_SILVER_SCORE,
} from "../constants/medal.constants";

export function getMedalForScore(
  score: number,
  sprites: GameSprites
): TSprite | null {
  if (score >= MEDAL_PLATINUM_SCORE) return sprites.s_medals.Platinum;
  if (score >= MEDAL_GOLD_SCORE) return sprites.s_medals.Gold;
  if (score >= MEDAL_SILVER_SCORE) return sprites.s_medals.Silver;
  if (score >= MEDAL_BRONZE_SCORE) return sprites.s_medals.Bronze;
  return null;
}
