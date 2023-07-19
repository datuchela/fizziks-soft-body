import { EngineState } from "./EngineState";
import { Vector } from "./Vector";
import { SoftBodyObject } from "./objects/SoftBodyObject";
import {
  MouseState,
  attachMouseDownListener,
  attachMouseMoveListener,
  attachMouseUpListener,
  handleMouseControls,
} from "./controllers";
import { Particle } from "./objects/Particle";
import { Spring } from "./objects/Spring";

type Shape = {
  x: number;
  y: number;
  mass: number;
  additionalBonds?: number[];
}[];

const TARGET_FPS = 60;

export const init = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const engineState = new EngineState(canvas.width, canvas.height);

  const softBodyShape: Shape = [
    { x: 100, y: 100, mass: 10 },
    { x: 150, y: 100, mass: 10 },
    { x: 150, y: 150, mass: 10 },
    { x: 100, y: 150, mass: 10 },
  ];

  const softBodyShape2: Shape = [
    { x: 400, y: 300, mass: 10 },
    { x: 500, y: 400, mass: 10 },
    { x: 400, y: 400, mass: 10 },
  ];

  const generateSoftBody = (shape: Shape) => {
    const particles: Particle[] = [];
    for (let i = 0; i < shape.length; ++i) {
      particles.push(new Particle({ ...shape[i], mass: 20 }));
    }

    return new SoftBodyObject({ particles });
  };

  const softBody = generateSoftBody(softBodyShape);

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

    engineState.detectCollisions(ctx);

    engineState.updateObjects(dt);

    engineState.drawObjects(ctx);

    requestAnimationFrame(mainLoop);
  };

  requestAnimationFrame(mainLoop);
};
