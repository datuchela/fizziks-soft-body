import { EngineConfig } from "./engine/types";

export const engineConfig: EngineConfig = {
  fps: 60,
  canvas: {
    width: 1366,
    height: 720,
  },
  particles: {
    // if you want to remove the velocity constraint on particles, delete the next line.
    friction: 0.005,
    maxVelocity: 400,
  },
};
