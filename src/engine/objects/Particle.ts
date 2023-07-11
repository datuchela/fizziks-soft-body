import { Vector } from "../Vector";

export interface Particle {
  p: Vector;
  v: Vector;
  f: Vector;
  mass: number;
  radius: number;
}

export interface ParticleConstructorProps {
  mass: number;
  radius?: number;
  x: number;
  y: number;
  v?: Vector;
  f?: Vector;
}

export class Particle {
  constructor({ x, y, v, f, mass, radius }: ParticleConstructorProps) {
    this.radius = radius ?? 8;
    this.mass = mass;
    this.p = new Vector(x, y);
    this.v = v ?? new Vector(0, 0);
    this.f = f ?? new Vector(0, 0);
  }

  get x() {
    return this.p.x;
  }

  get y() {
    return this.p.y;
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
  };
}
