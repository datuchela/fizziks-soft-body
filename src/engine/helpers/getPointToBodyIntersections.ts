import { Vector } from "../Vector";
import { SoftBodyObject } from "../objects/SoftBodyObject";
import { getSegmentIntersection } from "../utils/getSegmentIntersection";
import { Segment } from "../utils/types";

export const getPointToBodyIntersections = (
  point: Vector,
  body: SoftBodyObject
) => {
  const intersections: Vector[] = [];
  const { right } = body.boundingRect;
  const rightPoint = new Vector(right + 20, point.y);
  const horizontalSegment: Segment = [point, rightPoint];

  const sides = body.getSides();
  sides.forEach((side) => {
    const intersection = getSegmentIntersection(horizontalSegment, side);
    if (intersection) {
      intersections.push(intersection);
    }
  });
  return intersections;
};
