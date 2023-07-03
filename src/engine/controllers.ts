import { BaseObject } from "./objects/BaseObject";

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
    object.addForceY(-100);
  }
  if (keys.right.isPressed) {
    object.addForceX(100);
  }
  if (keys.down.isPressed) {
    object.addForceY(100);
  }
  if (keys.left.isPressed) {
    object.addForceX(-100);
  }
  // if (keys.up.isPressed) {
  //   object.setAccelerationY(-200);
  // }
  // if (keys.right.isPressed) {
  //   object.setAccelerationX(200);
  // }
  // if (keys.down.isPressed) {
  //   object.setAccelerationY(200);
  // }
  // if (keys.left.isPressed) {
  //   object.setAccelerationX(-200);
  // }
  // if (keys.up.isPressed && keys.right.isPressed) {
  //   object.setAccelerationX(200 / Math.sqrt(2));
  //   object.setAccelerationY(-200 / Math.sqrt(2));
  // }
  // if (keys.up.isPressed && keys.left.isPressed) {
  //   object.setAccelerationX(-200 / Math.sqrt(2));
  //   object.setAccelerationY(-200 / Math.sqrt(2));
  // }
  // if (keys.down.isPressed && keys.right.isPressed) {
  //   object.setAccelerationX(200 / Math.sqrt(2));
  //   object.setAccelerationY(200 / Math.sqrt(2));
  // }
  // if (keys.down.isPressed && keys.left.isPressed) {
  //   object.setAccelerationX(-200 / Math.sqrt(2));
  //   object.setAccelerationY(200 / Math.sqrt(2));
  // }
  if (!keys.up.isPressed && !keys.down.isPressed) {
    object.resetAllForcesY();
    object.setAccelerationY(0);
  }
  if (!keys.left.isPressed && !keys.right.isPressed) {
    object.resetAllForcesX();
    object.setAccelerationX(0);
  }
};
