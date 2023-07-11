import { Vector } from "../Vector";
import { Spring } from "./Spring";

export interface SoftBodyObject {
  springs: Spring[];
}

export interface PhysicsObjectConstructorProps {
  springs?: Spring[];
}

export class SoftBodyObject {
  constructor({ springs }: PhysicsObjectConstructorProps) {
    this.springs = springs ?? [];
  }

  resetForces = () => {
    this.springs.forEach((spring) => {
      spring.particles.forEach((particle) => {
        particle.f = new Vector(0, 0);
      });
    });
  };

  update = (dt: number) => {
    this.springs.forEach((spring) => {
      spring.update();
      spring.particles.forEach((particle) => {
        particle.update(dt);
      });
    });
  };

  draw = (ctx: CanvasRenderingContext2D) => {
    this.springs.forEach((spring) => {
      spring.draw(ctx);
      spring.particles.forEach((particle) => {
        particle.draw(ctx);
      });
    });
  };
}
