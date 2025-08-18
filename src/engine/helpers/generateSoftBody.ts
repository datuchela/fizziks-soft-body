import { Particle } from "../objects/Particle";
import { SoftBodyObject } from "../objects/SoftBodyObject";
import { Spring } from "../objects/Spring";
import { Shape } from "../softBodyShapes";

export const generateSoftBody = (shape: Shape) => {
  const particles: Particle[] = shape.particles.map(
    (p) => new Particle({ ...p, mass: 10 })
  );
  const springs: Spring[] = shape.springs.map(
    (s) => {
      const p1 = particles.filter(p => p.id === s.p1)[0];
      const p2 = particles.filter(p => p.id === s.p2)[0];
      console.log("p1: ", p1);
      return new Spring({particles: [p1, p2]});
    }
  );
  return new SoftBodyObject({ particles, springs });
};

export const parseRawJSONSoftBody = (rawShape: string) => {
  const parsedShape: Shape = JSON.parse(rawShape);
  return parsedShape;
}
