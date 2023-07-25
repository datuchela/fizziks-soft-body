import { Particle } from "../objects/Particle";
import { SoftBodyObject } from "../objects/SoftBodyObject";
import { Shape } from "../softBodyShapes";

export const generateSoftBody = (shape: Shape) => {
  const particles: Particle[] = shape.map(
    (point) => new Particle({ ...point })
  );
  return new SoftBodyObject({ particles });
};
