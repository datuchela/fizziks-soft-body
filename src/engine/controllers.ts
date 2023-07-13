import { Vector } from "./Vector";
import { Particle } from "./objects/Particle";
import { SoftBodyObject } from "./objects/SoftBodyObject";

export enum KeyCode {
  ArrowUp = "ArrowUp",
  ArrowRight = "ArrowRight",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",

  KeyW = "KeyW",
  KeyA = "KeyA",
  KeyS = "KeyS",
  KeyD = "KeyD",
}

export type Key = {
  code: KeyCode;
  isPressed: boolean;
};

export type DirectionKeys = {
  up: Key;
  right: Key;
  down: Key;
  left: Key;
};

export const arrowKeys: DirectionKeys = {
  up: {
    code: KeyCode.ArrowUp,
    isPressed: false,
  },
  right: {
    code: KeyCode.ArrowRight,
    isPressed: false,
  },
  down: {
    code: KeyCode.ArrowDown,
    isPressed: false,
  },
  left: {
    code: KeyCode.ArrowLeft,
    isPressed: false,
  },
};

export const wasdKeys: DirectionKeys = {
  up: {
    code: KeyCode.KeyW,
    isPressed: false,
  },
  right: {
    code: KeyCode.KeyD,
    isPressed: false,
  },
  down: {
    code: KeyCode.KeyS,
    isPressed: false,
  },
  left: {
    code: KeyCode.KeyA,
    isPressed: false,
  },
};

export const attachControllerKeysDownListener = (arrowKeys: DirectionKeys) => {
  window.addEventListener("keydown", (e) => {
    switch (e.code) {
      case arrowKeys.up.code:
        arrowKeys.up.isPressed = true;
        break;
      case arrowKeys.right.code:
        arrowKeys.right.isPressed = true;
        break;
      case arrowKeys.down.code:
        arrowKeys.down.isPressed = true;
        break;
      case arrowKeys.left.code:
        arrowKeys.left.isPressed = true;
        break;

      default:
        break;
    }
  });
  return arrowKeys;
};

export const attachControllerKeysUpListener = (arrowKeys: DirectionKeys) => {
  window.addEventListener("keyup", (e) => {
    switch (e.code) {
      case arrowKeys.up.code:
        arrowKeys.up.isPressed = false;
        break;
      case arrowKeys.right.code:
        arrowKeys.right.isPressed = false;
        break;
      case arrowKeys.down.code:
        arrowKeys.down.isPressed = false;
        break;
      case arrowKeys.left.code:
        arrowKeys.left.isPressed = false;
        break;

      default:
        break;
    }
  });
};

export type MouseState = {
  isMouseDown: boolean;
  position: Vector;
  closestParticle: Particle | null;
};

export const attachMouseDownListener = (
  canvas: HTMLCanvasElement,
  mouseState: MouseState,
  softBody: SoftBodyObject
) => {
  canvas.addEventListener("mousedown", (e) => {
    mouseState.isMouseDown = true;

    const rect = canvas.getBoundingClientRect();
    mouseState.position = new Vector(
      e.clientX - rect.left,
      e.clientY - rect.top
    );

    let closestDistance: number | undefined;

    for (let r = 0; r < softBody.particles.length; ++r) {
      for (let c = 0; c < softBody.particles[r].length; ++c) {
        const currentParticle = softBody.particles[r][c];
        if (currentParticle === null) continue;
        const currDistance = Vector.subtract(
          mouseState.position,
          currentParticle.p
        ).length;
        if (closestDistance === undefined || currDistance < closestDistance) {
          mouseState.closestParticle = softBody.particles[r][c];
          closestDistance = currDistance;
        }
      }
    }
  });
};

export const attachMouseUpListener = (mouseState: MouseState) => {
  window.addEventListener("mouseup", () => {
    mouseState.isMouseDown = false;
  });
};

export const attachMouseMoveListener = (
  canvas: HTMLCanvasElement,
  mouseState: MouseState
) => {
  canvas.addEventListener("mousemove", (e) => {
    if (!mouseState.isMouseDown) return;

    const rect = canvas.getBoundingClientRect();

    mouseState.position = new Vector(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  });
};

export const handleMouseControls = (mouseState: MouseState) => {
  if (mouseState.isMouseDown && mouseState.closestParticle) {
    // Prevent mouse-controlled particle from slipping away
    mouseState.closestParticle.v = new Vector(0, 0);

    mouseState.closestParticle.p = mouseState.position;
  }
};
