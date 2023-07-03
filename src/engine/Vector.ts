export interface Vector {
  x: number;
  y: number;
}

export class Vector {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add = (vector: Vector) => {
    this.x += vector.x;
    this.y += vector.y;
  };

  subtract = (vector: Vector) => {
    this.x -= vector.x;
    this.y -= vector.y;
  };

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  set length(len) {
    throw new Error(
      `Tried to set ${len} as vector length, you cannot set vector length explicitly.`
    );
  }
}
