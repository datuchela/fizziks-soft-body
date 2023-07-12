import { Vector } from "./Vector";
import { Particle } from "./objects/Particle";

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
  closestParticleDistance: number | null;
};

export const attachMouseDownListener = (
  canvas: HTMLCanvasElement,
  mouseState: MouseState,
  particles: Particle[]
) => {
  canvas.addEventListener("mousedown", (e) => {
    mouseState.isMouseDown = true;

    const rect = canvas.getBoundingClientRect();

    mouseState.position = new Vector(
      e.clientX - rect.left,
      e.clientY - rect.top
    );

    mouseState.closestParticle = particles[0];
    mouseState.closestParticleDistance = Vector.subtract(
      mouseState.position,
      particles[0].p
    ).length;

    for (let i = 1; i < particles.length; ++i) {
      const currDistance = Vector.subtract(
        mouseState.position,
        particles[i].p
      ).length;
      if (currDistance < mouseState.closestParticleDistance) {
        mouseState.closestParticle = particles[i];
        mouseState.closestParticleDistance = currDistance;
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
