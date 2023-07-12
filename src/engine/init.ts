import { EngineState } from "./EngineState";
import { Vector } from "./Vector";
import {
  MouseState,
  attachMouseDownListener,
  attachMouseMoveListener,
  attachMouseUpListener,
  handleMouseControls,
} from "./controllers";
import { Particle } from "./objects/Particle";
import { SoftBodyObject } from "./objects/SoftBodyObject";

export const init = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const engineState = new EngineState(canvas.width, canvas.height);

  const particles = [
    new Particle({ x: 100, y: 200, mass: 20 }),
    new Particle({ x: 140, y: 200, mass: 20 }),
    new Particle({ x: 100, y: 240, mass: 20 }),
    new Particle({ x: 140, y: 240, mass: 20 }),
    new Particle({ x: 100, y: 280, mass: 20 }),
    new Particle({ x: 140, y: 280, mass: 20 }),
    new Particle({ x: 180, y: 200, mass: 20 }),
    new Particle({ x: 180, y: 240, mass: 20 }),
    new Particle({ x: 180, y: 280, mass: 20 }),
  ];

  const body = [
    [particles[0], particles[1], particles[6]],
    [particles[2], particles[3], particles[7]],
    [particles[4], particles[5], particles[8]],
  ];

  engineState.addObject(new SoftBodyObject({ particles: body }));

  const mouseState: MouseState = {
    isMouseDown: false,
    position: new Vector(0, 0),
    closestParticle: null,
    closestParticleDistance: null,
  };

  attachMouseDownListener(canvas, mouseState, particles);
  attachMouseUpListener(mouseState);
  attachMouseMoveListener(canvas, mouseState);

  let oldTimeStamp = 0;
  let dt: number;
  let fps;

  const mainLoop = (timeStamp: number) => {
    dt = (timeStamp - oldTimeStamp) / 200;
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

    engineState.updateObjects(dt);

    engineState.drawObjects(ctx);

    requestAnimationFrame(mainLoop);
  };

  requestAnimationFrame(mainLoop);
};
