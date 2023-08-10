import { EngineConfig, RequiredEngineConfig } from "./types.ts";
import { getBodyToBodyIntersections } from "./helpers/getBodyToBodyIntersections.ts";
import { SoftBodyObject } from "./objects/SoftBodyObject";

export enum EngineStateValue {
  Paused,
  Running,
}

export interface EngineState {
  value: EngineStateValue;
  objects: SoftBodyObject[];
  config: EngineConfig;
  maxVelocity: number;
  friction: number;
}

export class EngineState {
  maxVelocity = Number.MAX_SAFE_INTEGER;
  friction = 0;

  constructor({ particles }: RequiredEngineConfig) {
    this.value = EngineStateValue.Running;
    this.objects = [];

    this.maxVelocity = particles.maxVelocity;
    this.friction = particles.friction;
  }

  addObject = (object: SoftBodyObject) => {
    // add config values
    object.particles.forEach((particle) => {
      particle.friction = this.friction;
      particle.maxVelocity = this.maxVelocity;
    });
    this.objects.push(object);
  };

  resetForces = () => {
    this.objects.forEach((obj) => {
      obj.resetForces();
    });
  };

  resetCollisions = () => {
    this.objects.forEach((obj) => {
      obj.particles.forEach((particle) => {
        particle.isColliding = false;
      });
    });
  };

  detectCollisions = () => {
    this.objects.forEach((obj1, i) => {
      this.objects.slice(i + 1).forEach((obj2) => {
        getBodyToBodyIntersections(obj1, obj2);
        getBodyToBodyIntersections(obj2, obj1);
      });
    });
  };

  updateObjects = (dt: number) => {
    this.objects.forEach((obj) => {
      obj.update(dt);
    });
  };

  drawObjects = (ctx: CanvasRenderingContext2D) => {
    this.objects.forEach((obj) => {
      obj.draw(ctx);
    });
  };
}
