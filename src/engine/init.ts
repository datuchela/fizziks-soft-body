import { EngineState } from "./EngineState";
import { Vector } from "./Vector";

import { generateSoftBody, parseRawJSONSoftBody } from "./helpers/generateSoftBody";
import { SoftBodyObject } from "./objects/SoftBodyObject";

import { DEFAULT_ENGINE_CONFIG } from "./init.constants";
import type { EngineConfig } from "./types";

import {
  MouseState,
  attachMouseDownListener,
  attachMouseMoveListener,
  attachMouseUpListener,
  handleMouseControls,
} from "./controllers";

const handleAddObject =
  (engineState: EngineState, onAddObject?: (object: SoftBodyObject) => void) =>
  (object: SoftBodyObject) => {
    engineState.addObject(object);
    onAddObject && onAddObject(object);
  };

export interface EngineInitProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  engineConfig: EngineConfig;
  onAddObject?: (object: SoftBodyObject) => void;
}

export const init = ({
  canvas,
  ctx,
  engineConfig,
  onAddObject,
}: EngineInitProps) => {
  const engineState = new EngineState({
    ...DEFAULT_ENGINE_CONFIG,
    ...engineConfig,
    canvasSize: {
      width: canvas.width,
      height: canvas.height,
    },
    particles: {
      maxVelocity:
        engineConfig.particles?.maxVelocity ??
        DEFAULT_ENGINE_CONFIG.particles.maxVelocity,
      friction:
        engineConfig.particles?.friction ??
        DEFAULT_ENGINE_CONFIG.particles.friction,
    },
  });

  const rawShape = `{"particles":[{"id":"11","x":475,"y":285},{"id":"12","x":519,"y":263},{"id":"13","x":552,"y":289},{"id":"14","x":552,"y":325},{"id":"15","x":514,"y":344},{"id":"16","x":476,"y":330}],"springs":[{"p1":"12","p2":"13"},{"p1":"13","p2":"14"},{"p1":"14","p2":"15"},{"p1":"15","p2":"16"},{"p1":"16","p2":"11"},{"p1":"11","p2":"12"},{"p1":"15","p2":"12"},{"p1":"15","p2":"13"},{"p1":"15","p2":"11"},{"p1":"16","p2":"14"},{"p1":"16","p2":"13"},{"p1":"16","p2":"12"},{"p1":"11","p2":"13"},{"p1":"11","p2":"14"},{"p1":"12","p2":"14"}]}`

  const shape = parseRawJSONSoftBody(rawShape);
  const softBody = generateSoftBody(shape);

  engineState.addObject(softBody);

  const mouseState: MouseState = {
    isMouseDown: false,
    position: new Vector(0, 0),
    closestParticle: null,
  };

  attachMouseDownListener(canvas, mouseState, engineState.objects);
  attachMouseUpListener(mouseState);
  attachMouseMoveListener(canvas, mouseState);

  let oldTimeStamp = 0;
  let dt: number;
  let fps;

  const mainLoop = (timeStamp: number) => {
    dt = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    const reciprocalFps = 1 / engineConfig.fps;
    dt = Math.min(reciprocalFps, dt);
    dt = Math.max(reciprocalFps, dt);

    // FPS
    fps = Math.round(1 / dt);
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    //

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillText("FPS: " + fps, 10, 30);

    handleMouseControls(mouseState);

    engineState.resetForces();

    engineState.resetCollisions();
    engineState.detectCollisions();

    engineState.updateObjects(dt);

    engineState.drawObjects(ctx);

    requestAnimationFrame(mainLoop);
  };

  requestAnimationFrame(mainLoop);

  return {
    addObject: handleAddObject(engineState, onAddObject),
  };
};
