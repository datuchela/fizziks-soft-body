import { getBodyToBodyIntersections } from "./helpers/getBodyToBodyIntersections.ts";
import { SoftBodyObject } from "./objects/SoftBodyObject";

enum EngineStateValue {
  Paused,
  Running,
}

export interface EngineState {
  value: EngineStateValue;
  objects: SoftBodyObject[];

  canvasWidth: number;
  canvasHeight: number;
}

export class EngineState {
  constructor(
    canvasWidth: number,
    canvasHeight: number,
    objects?: SoftBodyObject[]
  ) {
    this.value = EngineStateValue.Running;
    this.objects = objects ?? [];
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  addObject = (object: SoftBodyObject) => {
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
