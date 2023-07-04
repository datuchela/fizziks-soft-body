import { BaseObject } from "./objects/BaseObject";

enum EngineStateValue {
  Paused,
  Running,
}

export interface EngineState {
  value: EngineStateValue;
  objects: BaseObject[];

  canvasWidth: number;
  canvasHeight: number;
}

export class EngineState {
  constructor(
    canvasWidth: number,
    canvasHeight: number,
    objects?: BaseObject[]
  ) {
    this.value = EngineStateValue.Running;
    this.objects = objects ?? [];
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  addObject = (object: BaseObject) => {
    this.objects.push(object);
  };

  updateObjects = (dt: number) => {
    this.objects.forEach((obj) => {
      obj.updateAcceleration();
      obj.updateVelocity(dt);
      obj.updateCoordinates(dt);
    });
  };

  drawObjects = (ctx: CanvasRenderingContext2D) => {
    this.objects.forEach((obj) => {
      obj.draw(ctx);
      obj.drawVectors(ctx);
    });
  };
}
