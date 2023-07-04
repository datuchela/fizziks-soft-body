import { Vector } from "../Vector";

export interface BaseObject {
  x: number;
  y: number;
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
}

export class BaseObject {
  constructor({ x, y, v, a, mass, forces }: BaseObjectConstructorProps) {
    this.x = x;
    this.y = y;
    this.v = v ?? new Vector(0, 0);
    this.a = a ?? new Vector(0, 0);
    this.mass = mass;
    this.forces = forces ?? [];
    this.friction = 0.01;
  }

  drawVectors = (ctx: CanvasRenderingContext2D) => {
    this.a.draw(ctx, this.x, this.y, { color: "yellow" });
    this.v.draw(ctx, this.x, this.y, { color: "cyan" });
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
    return this.forces.reduce((acc, curr) => acc.add(curr));
  };

  updateAcceleration = () => {
    const netForce = this.calculateNetForce();
    if (!netForce) return;

    this.a.x = netForce.x / this.mass;
    this.a.y = netForce.y / this.mass;
  };

  updateVelocity = (dt: number) => {
    this.v = this.v.add(this.a.scale(dt)); // Accelerate
    this.v = this.v.scale(1 - this.friction); // Friction

    // Add velocity constraints
    const vUnit = this.v.unit;
    this.v = vUnit.scale(Math.min(this.v.length, 150));
  };

  updateCoordinates = (dt: number) => {
    this.updateAcceleration();
    this.updateVelocity(dt);
    this.x += this.v.x * dt;
    this.y += this.v.y * dt;
  };
}
