export type DeepRequired<T> = T extends object
  ? {
      [K in keyof T]-?: DeepRequired<T[K]>;
    }
  : T;

export interface EngineConfig {
  fps: number;
  canvasSize?: {
    width: number;
    height: number;
  };
  particles?: {
    maxVelocity?: number;
    friction?: number;
  };
}

export type RequiredEngineConfig = DeepRequired<EngineConfig>;
