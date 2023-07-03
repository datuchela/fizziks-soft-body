import { EngineState } from "./EngineState";
import {
  arrowKeys,
  attachController,
  attachControllerKeysDownListener,
  attachControllerKeysUpListener,
  wasdKeys,
} from "./controllers";
import { Circle } from "./objects/Circle";

export const init = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const engineState = new EngineState(canvas.width, canvas.height);

  const circle1 = new Circle({ radius: 25, mass: 10, x: 30, y: 30 });
  const circle2 = new Circle({ radius: 40, mass: 10, x: 500, y: 170 });

  engineState.addObject(circle1);
  engineState.addObject(circle2);

  attachControllerKeysDownListener(arrowKeys);
  attachControllerKeysUpListener(arrowKeys);

  attachControllerKeysDownListener(wasdKeys);
  attachControllerKeysUpListener(wasdKeys);

  let oldTimeStamp = 0;
  let elapsedSeconds;
  let fps;

  const mainLoop = (timeStamp: number) => {
    elapsedSeconds = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // FPS
    fps = Math.round(1 / elapsedSeconds);
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    //

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillText("FPS: " + fps, 10, 30);

    attachController(arrowKeys, circle1);
    attachController(wasdKeys, circle2);

    engineState.updateObjects(elapsedSeconds);
    engineState.drawObjects(ctx);

    requestAnimationFrame(mainLoop);
  };

  requestAnimationFrame(mainLoop);
};
