import {
  CANVAS_DESKTOP_HEIGHT,
  CANVAS_DESKTOP_MIN_WIDTH,
  CANVAS_DESKTOP_WIDTH,
  CANVAS_FILL_COLOR,
} from "../constants/screen.constants";

export type CanvasSetup = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  inputEvent: "mousedown" | "touchstart";
};

export function setupCanvas(): CanvasSetup {
  const canvas = document.createElement("canvas");
  const viewportWidth = Math.round(window.visualViewport?.width ?? window.innerWidth);
  const viewportHeight = Math.round(
    window.visualViewport?.height ?? window.innerHeight
  );
  const hasTouchSupport =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const desktopLikePointer = window.matchMedia("(pointer: fine)").matches;
  const isDesktopLayout =
    desktopLikePointer && !hasTouchSupport && viewportWidth >= CANVAS_DESKTOP_MIN_WIDTH;

  let width = viewportWidth;
  let height = viewportHeight;
  let inputEvent: "mousedown" | "touchstart" = "touchstart";

  if (isDesktopLayout) {
    width = CANVAS_DESKTOP_WIDTH;
    height = CANVAS_DESKTOP_HEIGHT;
    canvas.style.border = "1px solid #000";
    inputEvent = "mousedown";
  } else {
    // Keep original 400x600 game world and scale it to fit.
    width = CANVAS_DESKTOP_WIDTH;
    height = CANVAS_DESKTOP_HEIGHT;
    const scale = Math.min(viewportWidth / width, viewportHeight / height);
    canvas.style.width = `${Math.round(width * scale)}px`;
    canvas.style.height = `${Math.round(height * scale)}px`;
  }

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = CANVAS_FILL_COLOR;

  document.body.appendChild(canvas);

  return { canvas, ctx, width, height, inputEvent };
}
