import type { RequiredEngineConfig } from "./types";

export const DEFAULT_ENGINE_CONFIG: Omit<RequiredEngineConfig, "canvas"> = {
  fps: 60,
  particles: {
    maxVelocity: Number.MAX_SAFE_INTEGER,
    friction: 0,
  },
};
