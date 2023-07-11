import { Vector } from "./Vector";
import {
  MouseState,
  attachMouseDownListener,
  attachMouseMoveListener,
  attachMouseUpListener,
} from "./controllers";
import { Particle } from "./objects/Particle";
import { Spring } from "./objects/Spring";

export const init = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const particles = [
    new Particle({ name: "p1", x: 100, y: 200, mass: 20 }),
    new Particle({ name: "p2", x: 250, y: 200, mass: 20 }),
    new Particle({ name: "p3", x: 100, y: 250, mass: 20 }),
    new Particle({ name: "p4", x: 250, y: 250, mass: 20 }),
  ];

  const springs = [
    new Spring({ particles: [particles[0], particles[1]], stiffness: 1 }),
    new Spring({ particles: [particles[2], particles[3]], stiffness: 1 }),
    new Spring({ particles: [particles[0], particles[2]], stiffness: 1 }),
    new Spring({ particles: [particles[1], particles[3]], stiffness: 1 }),
    new Spring({ particles: [particles[0], particles[3]], stiffness: 1 }),
    new Spring({ particles: [particles[1], particles[2]], stiffness: 1 }),
  ];

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
    dt = (timeStamp - oldTimeStamp) / 100;
    oldTimeStamp = timeStamp;

    // FPS
    fps = Math.round(1 / dt);
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    //

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillText("FPS: " + fps, 10, 30);

    // Reset Forces
    particles.forEach((particle) => {
      particle.f = new Vector(0, 0);
    });

    // Update
    springs.forEach((spring) => {
      spring.update();
    });
    particles.forEach((particle) => {
      particle.update(dt);
    });

    // Draw
    springs.forEach((spring) => {
      spring.draw(ctx);
    });
    particles.forEach((particle) => {
      particle.draw(ctx);
    });

    requestAnimationFrame(mainLoop);
  };

  requestAnimationFrame(mainLoop);
};
