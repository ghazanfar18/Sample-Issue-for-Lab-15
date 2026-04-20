export class Sprite {
  readonly img: HTMLImageElement;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;

  constructor(
    img: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.img = img;
    this.x = x * 2;
    this.y = y * 2;
    this.width = width * 2;
    this.height = height * 2;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    num?: number | string,
    center?: number,
    offset?: number
  ): void {
    if (num !== undefined) {
      this.drawNumber(ctx, x, y, num, center, offset);
      return;
    }

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height,
      x,
      y,
      this.width,
      this.height
    );
  }

  private drawNumber(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    num: number | string,
    center?: number,
    offset?: number
  ): void {
    const digits = num.toString();
    const step = this.width + 2;

    if (center) {
      x = center - (digits.length * step - 2) / 2;
    }
    if (offset) {
      x += step * (offset - digits.length);
    }

    for (let i = 0; i < digits.length; i++) {
      const digit = parseInt(digits[i], 10);
      ctx.drawImage(
        this.img,
        step * digit,
        this.y,
        this.width,
        this.height,
        x,
        y,
        this.width,
        this.height
      );
      x += step;
    }
  }
}
