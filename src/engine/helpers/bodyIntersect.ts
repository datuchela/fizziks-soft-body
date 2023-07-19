import { Vector } from "../Vector";
import { SoftBodyObject } from "../objects/SoftBodyObject";
import { lineIntersect } from "../utils/lineIntersect";

export function bodyIntersect(
  obj1: SoftBodyObject,
  obj2: SoftBodyObject,
  ctx: CanvasRenderingContext2D
) {
  for (let i = 0; i < obj1.particles.length; ++i) {
    const currentParticle = obj1.particles[i];
    let intersections = 0;

    const { rightest } = obj2.boundingRect;

    const tempPointRight = new Vector(rightest + 20, currentParticle.y);

    const ray = Vector.subtract(tempPointRight, currentParticle.p);

    ray.draw(ctx, currentParticle.x, currentParticle.y);

    for (let j = 0; j < obj2.particles.length - 1; ++j) {
      let particle1 = obj2.particles[j];
      for (let k = j + 1; k < obj2.particles.length; ++k) {
        let particle2 = obj2.particles[k];
        const intersection = lineIntersect(
          currentParticle.p,
          tempPointRight,
          particle1.p,
          particle2.p
        );
        if (intersection) {
          intersections++;
        }
      }
    }

    if (intersections % 2 !== 0) {
      currentParticle.isColliding = true;
    } else {
      currentParticle.isColliding = false;
    }
  }
}
