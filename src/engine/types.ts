export interface EngineConfig {
  fps: number;
  canvas: {
    width: number;
    height: number;
  };
  particles?: {
    maxVelocity?: number;
    friction?: number;
  };
}

export type RequiredEngineConfig = Required<EngineConfig> & {
  particles: Required<EngineConfig["particles"]>;
};
