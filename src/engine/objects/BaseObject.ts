export interface BaseObject {
  x: number;
  y: number;
  mass: number;
}

export interface BaseObjectConstructorProps {
  x: number;
  y: number;
  mass: number;
}

export class BaseObject {
  constructor({ x, y, mass }: BaseObjectConstructorProps) {
    this.x = x;
    this.y = y;
    this.mass = mass;
  }
}
