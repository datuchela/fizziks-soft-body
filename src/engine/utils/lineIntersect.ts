import { Vector } from "../Vector";

export const lineIntersect = (A: Vector, B: Vector, C: Vector, D: Vector) => {
  const AB = Vector.subtract(B, A);
  const CD = Vector.subtract(D, C);
  const AC = Vector.subtract(C, A);

  const commonDenominator = Vector.crossProduct(CD, AB);

  if (commonDenominator === 0) return null;

  const t = Vector.crossProduct(CD, AC) / commonDenominator;
  const M = Vector.add(A, Vector.scale(AB, t));

  if (0 < t && t < 1) {
    if (C.x <= M.x && M.x <= D.x && C.y <= M.y && M.y <= D.y) {
      return M;
    }
  }

  return null;
};
