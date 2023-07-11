import { EngineState } from "./EngineState";
import {
  MouseState,
  attachMouseDownListener,
  attachMouseMoveListener,
  attachMouseUpListener,
} from "./controllers";
import { Particle } from "./objects/Particle";
import { SoftBodyObject } from "./objects/SoftBodyObject";
import { Spring } from "./objects/Spring";

export const init = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const engineState = new EngineState(canvas.width, canvas.height);

  const particles = [
    new Particle({ x: 100, y: 200, mass: 20 }),
    new Particle({ x: 120, y: 200, mass: 20 }),
    new Particle({ x: 100, y: 220, mass: 20 }),
    new Particle({ x: 120, y: 220, mass: 20 }),
  ];

  const springs = [
    new Spring({ particles: [particles[0], particles[1]], stiffness: 1 }),
    new Spring({ particles: [particles[2], particles[3]], stiffness: 1 }),
    new Spring({ particles: [particles[0], particles[2]], stiffness: 1 }),
    new Spring({ particles: [particles[1], particles[3]], stiffness: 1 }),
    new Spring({ particles: [particles[0], particles[3]], stiffness: 1 }),
    new Spring({ particles: [particles[1], particles[2]], stiffness: 1 }),
  ];

  engineState.addObject(new SoftBodyObject({ springs }));

  const mouseState: MouseState = {
    isMouseDown: false,
  };

  attachMouseDownListener(canvas, mouseState);
  attachMouseUpListener(mouseState);
  attachMouseMoveListener(canvas, mouseState, particles);

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

    engineState.resetForces();

    engineState.updateObjects(dt);

    engineState.drawObjects(ctx);

    requestAnimationFrame(mainLoop);
  };

  requestAnimationFrame(mainLoop);
};
