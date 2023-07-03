import { Circle } from "./objects/Circle";

const TOP_KEY_CODE = 38;
const RIGHT_KEY_CODE = 39;
const DOWN_KEY_CODE = 40;
const LEFT_KEY_CODE = 37;

const attachEventListeners = () => {
  window.addEventListener("keydown", (e) => {
    switch (keyCode) {
      case value:
        break;

      default:
        break;
    }
  });
};

export const init = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const circle = new Circle({ x: 40, y: 70, mass: 50, radius: 25 });

  attachEventListeners();

  const mainLoop = (timeStamp: number) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circle.draw(ctx);

    requestAnimationFrame(mainLoop);
  };

  requestAnimationFrame(mainLoop);
};
