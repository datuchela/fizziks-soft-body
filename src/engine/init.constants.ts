import { RequiredEngineConfig } from "./types";

export const DEFAULT_ENGINE_CONFIG: RequiredEngineConfig = {
  fps: 60,
  canvas: {
    width: 1366,
    height: 720,
  },
  particles: {
    maxVelocity: Number.MAX_SAFE_INTEGER,
    friction: 0,
  },
};
