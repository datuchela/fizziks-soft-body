import { isOdd } from "./../utils/isOdd";
import { SoftBodyObject } from "../objects/SoftBodyObject";
import { getPointToBodyIntersections } from "./getPointToBodyIntersections";

export const getBodyToBodyIntersections = (
  obj1: SoftBodyObject,
  obj2: SoftBodyObject
) => {
  let isIntersecting = false;

  for (let i = 0; i < obj1.particles.length; ++i) {
    const currentParticle = obj1.particles[i];
    const intersections = getPointToBodyIntersections(currentParticle.p, obj2);
    if (isOdd(intersections.length)) {
      currentParticle.isColliding = true;
      isIntersecting = true;
    }
  }

  return isIntersecting;
};
