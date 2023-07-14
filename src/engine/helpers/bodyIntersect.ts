import { Vector } from "../Vector";
import { SoftBodyObject } from "../objects/SoftBodyObject";

export function bodyIntersect(obj1: SoftBodyObject, obj2: SoftBodyObject) {
  for (let i = 0; i < obj1.particles.length; ++i) {
    const currentParticle = obj1.particles[i];
    const { topRight } = obj2.boundingRect;
    const line = [
      currentParticle.p,
      new Vector(topRight.x, currentParticle.p.y),
    ];
  }
}
