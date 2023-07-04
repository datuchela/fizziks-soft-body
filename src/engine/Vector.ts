export interface Vector {
  x: number;
  y: number;
}

export class Vector {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  set length(len) {
    throw new Error(
      `Tried to set ${len} as vector length, you cannot set vector length explicitly.`
    );
  }

  get unit() {
    if (this.length === 0) return new Vector(0, 0);
    return new Vector(this.x / this.length, this.y / this.length);
  }

  set unit(vector: Vector) {
    throw new Error(
      `Tried to set ${vector} as a unit vector, you cannot set unit vector explicitly.`
    );
  }

  static dotProduct = (v1: Vector, v2: Vector): number => {
    return v1.x * v2.x + v1.y * v2.y;
  };

  add = (vector: Vector) => {
    return new Vector(this.x + vector.x, this.y + vector.y);
  };

  subtract = (vector: Vector) => {
    return new Vector(this.x - vector.x, this.y - vector.y);
  };

  scale = (scalar: number) => {
    return new Vector(this.x * scalar, this.y * scalar);
  };

  draw = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    options?: { color: string }
  ) => {
    ctx.strokeStyle = options?.color ?? "red";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + this.x, startY + this.y);
    ctx.stroke();
  };
}
