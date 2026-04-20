import {
  CANVAS_DESKTOP_HEIGHT,
  CANVAS_DESKTOP_MIN_WIDTH,
  CANVAS_DESKTOP_WIDTH,
  CANVAS_FILL_COLOR,
  CANVAS_MAX_HEIGHT,
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
  let width = window.innerWidth;
  let height = Math.min(window.innerHeight, CANVAS_MAX_HEIGHT);
  let inputEvent: "mousedown" | "touchstart" = "touchstart";

  if (width >= CANVAS_DESKTOP_MIN_WIDTH) {
    width = CANVAS_DESKTOP_WIDTH;
    height = CANVAS_DESKTOP_HEIGHT;
    canvas.style.border = "1px solid #000";
    inputEvent = "mousedown";
  }

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = CANVAS_FILL_COLOR;

  document.body.appendChild(canvas);

  return { canvas, ctx, width, height, inputEvent };
}
