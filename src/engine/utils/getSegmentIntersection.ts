import { Vector } from "../Vector";
import type { Segment } from "./types";

/** This function takes two segments as arguments and returns the coordinate
 *  vector of the intersection point between them,
 * if there is one, otherwise returns null.  */
export const getSegmentIntersection = (
  segment1: Segment,
  segment2: Segment
): Vector | null => {
  const A = segment1[0];
  const B = segment1[1];
  const C = segment2[0];
  const D = segment2[1];
  const AB = Vector.subtract(B, A);
  const CD = Vector.subtract(D, C);
  const AC = Vector.subtract(C, A);

  const commonDenominator = Vector.crossProduct(CD, AB);

  if (commonDenominator === 0) return null;

  const t = Vector.crossProduct(CD, AC) / commonDenominator;
  const M = Vector.add(A, Vector.scale(AB, t));

  const isInsideSegment = 0 < t && t < 1;

  const isOnSegmentDownRight =
    C.x <= M.x && M.x <= D.x && C.y <= M.y && M.y <= D.y;

  const isOnSegmentDownLeft =
    C.x >= M.x && M.x >= D.x && C.y <= M.y && M.y <= D.y;

  const isOnSegmentUpLeft =
    C.x >= M.x && M.x >= D.x && C.y >= M.y && M.y >= D.y;

  const isOnSegmentUpRight =
    C.x <= M.x && M.x <= D.x && C.y >= M.y && M.y >= D.y;

  if (
    isInsideSegment &&
    (isOnSegmentDownRight ||
      isOnSegmentDownLeft ||
      isOnSegmentUpLeft ||
      isOnSegmentUpRight)
  ) {
    return M;
  }

  return null;
};
