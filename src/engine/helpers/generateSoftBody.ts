import { Particle } from "../objects/Particle";
import { SoftBodyObject } from "../objects/SoftBodyObject";
import { Shape } from "../softBodyShapes";

export const generateSoftBody = (shape: Shape) => {
  const particles: Particle[] = [];
  for (let i = 0; i < shape.length; ++i) {
    particles.push(new Particle({ ...shape[i], mass: 20 }));
  }

  return new SoftBodyObject({ particles });
};
