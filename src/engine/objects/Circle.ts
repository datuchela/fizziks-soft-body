import { BaseObject, BaseObjectConstructorProps } from "./BaseObject";

export interface Circle extends BaseObject {
  radius: number;
}

export interface CircleConstructorProps extends BaseObjectConstructorProps {
  radius: number;
}

export class Circle extends BaseObject {
  constructor({ radius, ...baseProps }: CircleConstructorProps) {
    super(baseProps);
    this.radius = radius;
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  };
}
