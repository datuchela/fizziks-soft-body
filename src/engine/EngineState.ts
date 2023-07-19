import { bodyIntersect } from "./helpers/bodyIntersect";
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

  detectCollisions = (ctx: CanvasRenderingContext2D) => {
    let obj1: SoftBodyObject;
    let obj2: SoftBodyObject;
    for (let i = 0; i < this.objects.length; ++i) {
      obj1 = this.objects[i];
      for (let j = i + 1; j < this.objects.length; ++j) {
        obj2 = this.objects[j];
        // Check for collisions
        bodyIntersect(obj1, obj2, ctx);
      }
    }
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
