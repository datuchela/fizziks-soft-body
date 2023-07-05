import { Vector } from "../Vector";

export interface BaseObject {
  position: Vector;
  v: Vector;
  a: Vector;
  mass: number;
  forces: Vector[];
  friction: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface BaseObjectConstructorProps {
  x: number;
  y: number;
  v?: Vector;
  a?: Vector;
  mass: number;
  forces?: Vector[];
  friction?: number;
}

export class BaseObject {
  constructor({
    x,
    y,
    v,
    a,
    mass,
    forces,
    friction,
  }: BaseObjectConstructorProps) {
    this.position = new Vector(x, y);
    this.v = v ?? new Vector(0, 0);
    this.a = a ?? new Vector(0, 0);
    this.mass = mass;
    this.forces = forces ?? [];
    this.friction = friction ?? 0;
  }

  drawVectors = (ctx: CanvasRenderingContext2D) => {
    this.a.draw(ctx, this.position.x, this.position.y, { color: "yellow" });
    this.v.draw(ctx, this.position.x, this.position.y, { color: "cyan" });
  };

  addForce = (force: Vector) => {
    this.forces.push(force);
  };

  resetAllForcesX = () => {
    this.forces.forEach((force) => {
      force.x = 0;
    });
  };

  resetAllForcesY = () => {
    this.forces.forEach((force) => {
      force.y = 0;
    });
  };

  resetAllForces = () => {
    this.forces = [];
  };

  calculateNetForce = () => {
    if (this.forces.length < 1) return;
    return this.forces.reduce((acc, curr) => Vector.add(acc, curr));
  };

  updateAcceleration = () => {
    const netForce = this.calculateNetForce();
    if (!netForce) return;

    this.a.x = netForce.x / this.mass;
    this.a.y = netForce.y / this.mass;
  };

  updateVelocity = (dt: number) => {
    const dv = Vector.scale(this.a, dt);
    this.v = Vector.add(this.v, dv); // Accelerate
    this.v = Vector.scale(this.v, 1 - this.friction); // Friction

    // Add velocity constraints
    const vUnit = this.v.unit;
    this.v = Vector.scale(vUnit, Math.min(this.v.length, 250));
  };

  updateCoordinates = (dt: number) => {
    const dp = Vector.scale(this.v, dt);
    this.position = Vector.add(this.position, dp);
  };
}
