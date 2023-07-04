import { Vector } from "../Vector";

export interface BaseObject {
  x: number;
  y: number;
  v: Vector;
  a: Vector;
  mass: number;
  forcesX: number[];
  forcesY: number[];
  friction: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface BaseObjectConstructorProps {
  x: number;
  y: number;
  v?: Vector;
  a?: Vector;
  mass: number;
  forcesX?: number[];
  forcesY?: number[];
}

export class BaseObject {
  constructor({
    x,
    y,
    v,
    a,
    mass,
    forcesX,
    forcesY,
  }: BaseObjectConstructorProps) {
    this.x = x;
    this.y = y;
    this.v = v ?? new Vector(0, 0);
    this.a = a ?? new Vector(0, 0);
    this.mass = mass;
    this.forcesX = forcesX ?? [];
    this.forcesY = forcesY ?? [];
    this.friction = 0.01;
  }

  drawVectors = (ctx: CanvasRenderingContext2D) => {
    // Acceleration
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.a.x, this.y + this.a.y);
    ctx.stroke();

    // Velocity
    ctx.strokeStyle = "cyan";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.v.x, this.y + this.v.y);
    ctx.stroke();
  };

  addForce = (force: Vector) => {
    this.forcesX.push(force.x);
    this.forcesY.push(force.y);
  };

  addForceX = (forceX: number) => {
    this.forcesX.push(forceX);
  };

  addForceY = (forceY: number) => {
    this.forcesY.push(forceY);
  };

  resetAllForcesX = () => {
    this.forcesX = [];
  };

  resetAllForcesY = () => {
    this.forcesY = [];
  };

  resetAllForces = () => {
    this.resetAllForcesX();
    this.resetAllForcesY();
  };

  calculateNetForceX = (): number | undefined => {
    if (this.forcesX.length < 1) return;
    const netForceX = this.forcesX.reduce((acc, curr) => acc + curr);
    this.forcesX = [netForceX];
    return netForceX;
  };

  calculateNetForceY = (): number | undefined => {
    if (this.forcesY.length < 1) return;
    const netForceY = this.forcesY.reduce((acc, curr) => acc + curr);
    this.forcesY = [netForceY];
    return netForceY;
  };

  updateAcceleration = () => {
    const netForceX = this.calculateNetForceX();
    const netForceY = this.calculateNetForceY();

    if (netForceX) {
      this.a.x = netForceX / this.mass;
    }
    if (netForceY) {
      this.a.y = netForceY / this.mass;
    }
  };

  resetAccelerationX = () => {
    this.a.x = 0;
  };

  resetAccelerationY = () => {
    this.a.y = 0;
  };

  updateVelocity = (dt: number) => {
    this.v = this.v.add(this.a.scale(dt)); // Accelerate
    this.v = this.v.scale(1 - this.friction); // Friction

    // Add velocity constraints
    const vUnit = this.v.unit;
    this.v.x = vUnit.x * Math.min(Math.abs(this.v.x), 150);
    this.v.y = vUnit.y * Math.min(Math.abs(this.v.y), 150);
  };

  updateCoordinates = (dt: number) => {
    this.updateAcceleration();
    this.updateVelocity(dt);
    this.x += this.v.x * dt;
    this.y += this.v.y * dt;
  };
}
