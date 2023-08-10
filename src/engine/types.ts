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
