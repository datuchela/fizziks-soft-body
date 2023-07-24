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
    let toppest = Number.MAX_SAFE_INTEGER;
    let leftest = Number.MAX_SAFE_INTEGER;
    let rightest = Number.MIN_SAFE_INTEGER;
    let bottomest = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < this.particles.length; ++i) {
      const { x, y } = this.particles[i];
      if (y < toppest) {
        toppest = y;
      }
      if (x < leftest) {
        leftest = x;
      }
      if (x > rightest) {
        rightest = x;
      }
      if (y > bottomest) {
        bottomest = y;
      }
    }

    if (
      toppest === Number.MAX_SAFE_INTEGER ||
      leftest === Number.MAX_SAFE_INTEGER ||
      rightest === Number.MIN_SAFE_INTEGER ||
      bottomest === Number.MIN_SAFE_INTEGER
    ) {
      throw new Error("Something bad happened while calculating boundingRect");
    }

    return {
      toppest,
      rightest,
      bottomest,
      leftest,
      topLeft: new Vector(leftest, toppest),
      topRight: new Vector(rightest, toppest),
      bottomLeft: new Vector(leftest, bottomest),
      bottomRight: new Vector(rightest, bottomest),
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
    const sides: Segment[] = [];
    let sideParticle1;
    let sideParticle2;

    for (let i = 0; i < this.particles.length; ++i) {
      sideParticle1 = this.particles[i];
      sideParticle2 = this.particles[i + 1];
      if (i === this.particles.length - 1) {
        sideParticle1 = this.particles[0];
        sideParticle2 = this.particles[i];
      }

      const side: Segment = [sideParticle1.p, sideParticle2.p];
      sides.push(side);
    }

    return sides;
  };

  static generateBonds = (particles: Particle[]): Spring[] => {
    const springs: Spring[] = [];
    let p1;
    let p2;
    for (let i = 0; i < particles.length; ++i) {
      p1 = particles[i];
      if (i !== particles.length - 1) {
        p2 = particles[i + 1];
      } else {
        p2 = particles[0];
      }
      springs.push(new Spring({ particles: [p1, p2] }));
    }
    return springs;
  };
}
