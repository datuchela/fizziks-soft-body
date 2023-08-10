import { EngineState } from "./EngineState";
import { Spring } from "./objects/Spring";
import { Vector } from "./Vector";

import {
  MouseState,
  attachMouseDownListener,
  attachMouseMoveListener,
  attachMouseUpListener,
  handleMouseControls,
} from "./controllers";

import { generateSoftBody } from "./helpers/generateSoftBody";
import { softBodyShape2, square } from "./softBodyShapes";
import { EngineConfig } from "./types";
import { SoftBodyObject } from "./objects/SoftBodyObject";

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
  const engineState = new EngineState(engineConfig);

  const softBody = generateSoftBody(square);

  // add inside bonds
  softBody.springs.push(
    new Spring({ particles: [softBody.particles[0], softBody.particles[2]] })
  );
  softBody.springs.push(
    new Spring({ particles: [softBody.particles[1], softBody.particles[3]] })
  );

  const softBody2 = generateSoftBody(softBodyShape2);

  engineState.addObject(softBody);
  engineState.addObject(softBody2);

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
};
