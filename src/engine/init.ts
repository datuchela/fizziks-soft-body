import { EngineState } from "./EngineState";
import { Spring } from "./objects/Spring";
import { Vector } from "./Vector";

import { generateSoftBody } from "./helpers/generateSoftBody";
import { square } from "./softBodyShapes";
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

const kernAddObject =
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
    particles: {
      maxVelocity:
        engineConfig.particles?.maxVelocity ??
        DEFAULT_ENGINE_CONFIG.particles.maxVelocity,
      friction:
        engineConfig.particles?.friction ??
        DEFAULT_ENGINE_CONFIG.particles.friction,
    },
  });

  const softBody = generateSoftBody(square);

  // add inside bonds
  softBody.springs.push(
    new Spring({ particles: [softBody.particles[0], softBody.particles[2]] })
  );
  softBody.springs.push(
    new Spring({ particles: [softBody.particles[1], softBody.particles[3]] })
  );

  engineState.addObject(softBody);

  const mouseState: MouseState = {
    isMouseDown: false,
    position: new Vector(0, 0),
    closestParticle: null,
  };

  attachMouseDownListener(canvas, mouseState, softBody);
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
    addObject: kernAddObject(engineState, onAddObject),
  };
};
