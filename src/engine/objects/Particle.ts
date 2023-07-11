import { Vector } from "../Vector";

export interface Particle {
  name: string;
  p: Vector;
  v: Vector;
  f: Vector;
  mass: number;
  radius: number;
}

export interface ParticleConstructorProps {
  name: string;
  mass: number;
  radius?: number;
  x: number;
  y: number;
  v?: Vector;
  f?: Vector;
}

export class Particle {
  constructor({ name, x, y, v, f, mass, radius }: ParticleConstructorProps) {
    this.name = name;
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
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.fillText(this.name, this.x, this.y - 20);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
  };

  update = (dt: number) => {
    this.v = Vector.add(this.v, Vector.scale(this.f, dt / this.mass));
    this.p = Vector.add(this.p, Vector.scale(this.v, dt));
  };
}
