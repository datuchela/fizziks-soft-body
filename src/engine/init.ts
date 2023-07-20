import { EngineState } from "./EngineState";
import { Particle } from "./objects/Particle";
import { Spring } from "./objects/Spring";
import { SoftBodyObject } from "./objects/SoftBodyObject";
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

const TARGET_FPS = 60;

export const init = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const engineState = new EngineState(canvas.width, canvas.height);

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

    dt = Math.min(1 / TARGET_FPS, dt);
    dt = Math.max(1 / TARGET_FPS, dt);

    oldTimeStamp = timeStamp;

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
