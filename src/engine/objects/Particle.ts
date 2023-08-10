import { Vector } from "../Vector";

const COLLIDING_COLOR = "red";
const NOT_COLLIDING_COLOR = "yellow";

export interface Particle {
  name: string | undefined;
  p: Vector;
  v: Vector;
  f: Vector;
  mass: number;
  radius: number;
  isColliding: boolean;
  friction: number | undefined;
  maxVelocity: number | undefined;
}

export interface ParticleConstructorProps {
  name?: string;
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
    this.radius = radius ?? 4;
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
    if (this.name !== undefined) {
      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      ctx.fillText(this.name, this.x, this.y - 10);
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.isColliding ? COLLIDING_COLOR : NOT_COLLIDING_COLOR;
    ctx.fill();
  };

  updateWithMouse = (mousePosition: Vector) => {
    this.v = new Vector(0, 0);
    this.p = mousePosition;
  };

  update = (dt: number) => {
    this.v = Vector.add(this.v, Vector.scale(this.f, dt / this.mass));

    // Velocity Constraint
    if (this.maxVelocity) {
      const constrainedVelocity = Math.min(this.v.length, this.maxVelocity);
      this.v = Vector.scale(this.v.unit, constrainedVelocity);
    }

    if (this.friction) {
      this.v = Vector.scale(this.v, 1 - this.friction);
    }

    this.p = Vector.add(this.p, Vector.scale(this.v, dt));
  };
}
