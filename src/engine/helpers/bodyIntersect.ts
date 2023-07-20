import { Vector } from "../Vector";
import { Particle } from "../objects/Particle";
import { SoftBodyObject } from "../objects/SoftBodyObject";
import { getSegmentIntersection } from "../utils/getSegmentIntersection";

export function bodyIntersect(obj1: SoftBodyObject, obj2: SoftBodyObject) {
  for (let i = 0; i < obj1.particles.length; ++i) {
    const currentParticle = obj1.particles[i];
    const { rightest } = obj2.boundingRect;

    const tempPointRight = new Vector(rightest + 20, currentParticle.y);

    let intersections = 0;

    let wallParticle1: Particle;
    let wallParticle2: Particle;

    for (let j = 0; j < obj2.particles.length; ++j) {
      if (j === obj2.particles.length - 1) {
        wallParticle1 = obj2.particles[0];
        wallParticle2 = obj2.particles[j];
      } else {
        wallParticle1 = obj2.particles[j];
        wallParticle2 = obj2.particles[j + 1];
      }

      const intersection = getSegmentIntersection(
        currentParticle.p,
        tempPointRight,
        wallParticle1.p,
        wallParticle2.p
      );

      if (intersection) {
        intersections++;
      }
    }

    if (intersections % 2 !== 0) {
      currentParticle.isColliding = true;
    } else {
      currentParticle.isColliding = false;
    }
  }
}
