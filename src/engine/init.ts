import { EngineState } from "./EngineState";
import type { EngineConfig } from "./types";
import type { SoftBodyObject } from "./objects/SoftBodyObject";

const kernAddObject =
  (engineState: EngineState, onAddObject?: (object: SoftBodyObject) => void) =>
  (object: SoftBodyObject) => {
    engineState.addObject(object);
    onAddObject && onAddObject(object);
  };

const kernObjects = (engineState: EngineState) => engineState.objects;

export interface EngineInitProps {
  ctx: CanvasRenderingContext2D;
  engineConfig: EngineConfig;
  onAddObject?: (object: SoftBodyObject) => void;
}

export const init = ({ ctx, engineConfig, onAddObject }: EngineInitProps) => {
  const engineState = new EngineState(engineConfig);

  let oldTimeStamp = 0;
  let dt: number;
  let fps;

  const mainLoop = (timeStamp: number) => {
    dt = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    const reciprocalFps = 1 / engineConfig.fps;
    dt = Math.min(reciprocalFps, dt);
    dt = Math.max(reciprocalFps, dt);

    fps = Math.round(1 / dt);
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";

    ctx.clearRect(0, 0, engineConfig.canvas.width, engineConfig.canvas.height);

    ctx.fillText("FPS: " + fps, 10, 30);

    engineState.resetForces();
    engineState.resetCollisions();
    engineState.detectCollisions();
    engineState.updateObjects(dt);
    engineState.drawObjects(ctx);

    requestAnimationFrame(mainLoop);
  };

  requestAnimationFrame(mainLoop);

  return {
    addObject: kernAddObject(engineState, onAddObject),
    objects: kernObjects(engineState),
  };
};
