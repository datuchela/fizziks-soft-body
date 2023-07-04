import { Vector } from "../Vector";

export interface BaseObject {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  mass: number;
  forcesX: number[];
  forcesY: number[];
  friction: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface BaseObjectConstructorProps {
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  ax?: number;
  ay?: number;
  mass: number;
  forcesX?: number[];
  forcesY?: number[];
}

export class BaseObject {
  constructor({
    x,
    y,
    vx,
    vy,
    ax,
    ay,
    mass,
    forcesX,
    forcesY,
  }: BaseObjectConstructorProps) {
    this.x = x;
    this.y = y;
    this.vx = vx ?? 0;
    this.vy = vy ?? 0;
    this.ax = ax ?? 0;
    this.ay = ay ?? 0;
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
    ctx.lineTo(this.x + this.ax, this.y + this.ay);
    ctx.stroke();

    // Velocity
    ctx.strokeStyle = "cyan";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.vx, this.y + this.vy);
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
      this.ax = netForceX / this.mass;
    }
    if (netForceY) {
      this.ay = netForceY / this.mass;
    }
  };

  resetAccelerationX = () => {
    this.ax = 0;
  };

  resetAccelerationY = () => {
    this.ay = 0;
  };

  updateVelocity = (dt: number) => {
    this.vx += this.ax * dt;
    this.vy += this.ay * dt;
    this.vx *= 1 - this.friction;
    this.vy *= 1 - this.friction;

    const absVx = Math.abs(this.vx);
    const absVy = Math.abs(this.vy);
    const normVx = this.vx / absVx;
    const normVy = this.vy / absVy;

    if (absVx !== 0) {
      this.vx = normVx * Math.min(absVx, 200);
    }
    if (absVy !== 0) {
      this.vy = normVy * Math.min(absVy, 200);
    }
  };

  updateCoordinates = (dt: number) => {
    this.updateAcceleration();
    this.updateVelocity(dt);
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  };
}
