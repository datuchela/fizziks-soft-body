import { Vector } from "./Vector";
import { BaseObject } from "./objects/BaseObject";
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

export const attachController = (keys: DirectionKeys, object: BaseObject) => {
  if (keys.up.isPressed) {
    object.addForce(new Vector(0, -100));
  }
  if (keys.right.isPressed) {
    object.addForce(new Vector(100, 0));
  }
  if (keys.down.isPressed) {
    object.addForce(new Vector(0, 100));
  }
  if (keys.left.isPressed) {
    object.addForce(new Vector(-100, 0));
  }
  if (!keys.up.isPressed && !keys.down.isPressed) {
    object.resetAllForcesY();
  }
  if (!keys.left.isPressed && !keys.right.isPressed) {
    object.resetAllForcesX();
  }
};

export type MouseState = {
  isMouseDown: boolean;
};

export const attachMouseDownListener = (
  canvas: HTMLCanvasElement,
  mouseState: MouseState
) => {
  canvas.addEventListener("mousedown", () => {
    mouseState.isMouseDown = true;
  });
};

export const attachMouseUpListener = (mouseState: MouseState) => {
  window.addEventListener("mouseup", () => {
    mouseState.isMouseDown = false;
  });
};

export const attachMouseMoveListener = (
  canvas: HTMLCanvasElement,
  mouseState: MouseState,
  particles: Particle[]
) => {
  canvas.addEventListener("mousemove", (e) => {
    if (!mouseState.isMouseDown) return;

    const rect = canvas.getBoundingClientRect();

    const mousePosition = new Vector(
      e.clientX - rect.left,
      e.clientY - rect.top
    );

    let closestParticle: Particle = particles[0];
    let closestParticleDistance: number = Vector.subtract(
      mousePosition,
      particles[0].p
    ).length;

    for (let i = 1; i < particles.length; ++i) {
      const currDistance = Vector.subtract(
        mousePosition,
        particles[i].p
      ).length;
      if (currDistance < closestParticleDistance) {
        closestParticle = particles[i];
        closestParticleDistance = currDistance;
      }
    }

    // Restrict grabbing out of range
    // if (closestParticleDistance > 25) return;

    closestParticle.f = new Vector(0, 0);
    closestParticle.v = new Vector(0, 0);

    closestParticle.p = mousePosition;
  });
};
