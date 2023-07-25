import { Vector } from "../Vector";
import { Segment } from "../utils/types";
import { Particle } from "./Particle";
import { Spring } from "./Spring";

export interface SoftBodyObject {
  particles: Particle[];
  springs: Spring[];
}

export interface PhysicsObjectConstructorProps {
  particles: Particle[];
}

export class SoftBodyObject {
  constructor({ particles }: PhysicsObjectConstructorProps) {
    this.particles = particles;
    this.springs = SoftBodyObject.generateBonds(particles);
  }

  get boundingRect() {
    let top = Number.MAX_SAFE_INTEGER;
    let left = Number.MAX_SAFE_INTEGER;
    let right = Number.MIN_SAFE_INTEGER;
    let bottom = Number.MIN_SAFE_INTEGER;

    for (const { x, y } of this.particles) {
      if (y < top) {
        top = y;
      }
      if (x < left) {
        left = x;
      }
      if (x > right) {
        right = x;
      }
      if (y > bottom) {
        bottom = y;
      }
    }

    if (
      top === Number.MAX_SAFE_INTEGER ||
      left === Number.MAX_SAFE_INTEGER ||
      right === Number.MIN_SAFE_INTEGER ||
      bottom === Number.MIN_SAFE_INTEGER
    ) {
      throw new Error("Something bad happened while calculating boundingRect");
    }

    return {
      top,
      right,
      bottom,
      left,
      topLeft: new Vector(left, top),
      topRight: new Vector(right, top),
      bottomLeft: new Vector(left, bottom),
      bottomRight: new Vector(right, bottom),
    };
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

  getSides = (): Segment[] => {
    return this.particles.map((particle, index) => {
      const nextIndex = index !== this.particles.length - 1 ? index + 1 : 0;
      const nextParticle = this.particles[nextIndex];
      return [particle.p, nextParticle.p];
    });
  };

  static generateBonds = (particles: Particle[]): Spring[] => {
    return particles.map((particle, index) => {
      const nextIndex = index !== particles.length - 1 ? index + 1 : 0;
      const nextParticle = particles[nextIndex];
      return new Spring({ particles: [particle, nextParticle] });
    });
  };
}
