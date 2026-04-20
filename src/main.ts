import { SpriteController, GameController, EventsController } from "./controller";
import { setupCanvas, monitorTickRate } from "./utils";
import { SPRITE_SHEET_SRC } from "./constants";

async function main() {
  const { ctx, width, height, inputEvent } = setupCanvas();

  const sprites = await new SpriteController().load(SPRITE_SHEET_SRC);

  const game = new GameController(sprites, ctx, width, height);
  const events = new EventsController(game);

  events.attach(inputEvent);

  monitorTickRate(
    () => game.update(),
    () => game.render()
  );
}

main();
