import { Vector } from "../Vector";

export const segmentIntersect = (
  A: Vector,
  B: Vector,
  C: Vector,
  D: Vector
) => {
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
