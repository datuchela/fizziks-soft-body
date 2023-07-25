export type Shape = {
  x: number;
  y: number;
  mass: number;
  additionalBonds?: number[];
}[];

export const squareShape: Shape = [
  { x: 100, y: 100, mass: 10 },
  { x: 150, y: 100, mass: 10 },
  { x: 150, y: 150, mass: 10 },
  { x: 100, y: 150, mass: 10 },
];

export const softBodyShape2: Shape = [
  { x: 450, y: 250, mass: 10 },
  { x: 500, y: 250, mass: 10 },
  { x: 450, y: 400, mass: 10 },
  { x: 330, y: 400, mass: 10 },
];
