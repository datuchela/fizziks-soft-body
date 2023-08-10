import { EngineConfig } from "./engine/types";

export const engineConfig: EngineConfig = {
  fps: 60,
  canvas: {
    width: 1366,
    height: 720,
  },
  particles: {
    friction: 0.005,
    maxVelocity: 400,
  },
};
