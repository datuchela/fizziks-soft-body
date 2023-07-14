import { Vector } from "../Vector";
import { transpose } from "../utils/transpose";
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
    let toppest: number | undefined;
    let leftest: number | undefined;
    let rightest: number | undefined;
    let bottomest: number | undefined;
    for (let i = 0; i < this.particles.length; ++i) {
      const { x, y } = this.particles[i];
      if (toppest === undefined || y < toppest) {
        toppest = y;
      }
      if (leftest === undefined || x < leftest) {
        leftest = x;
      }
      if (rightest === undefined || x > rightest) {
        rightest = x;
      }
      if (bottomest === undefined || y > bottomest) {
        bottomest = y;
      }
    }

    if (
      toppest === undefined ||
      leftest === undefined ||
      rightest === undefined ||
      bottomest === undefined
    ) {
      throw new Error("Something bad happened while calculating boundingRect");
    }

    return {
      topLeft: { x: leftest, y: toppest },
      topRight: { x: rightest, y: toppest },
      bottomLeft: { x: leftest, y: bottomest },
      bottomRight: { x: rightest, y: bottomest },
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

  static generateParticles = (
    massDistribution: (number | null)[][],
    options?: { offsetX?: number; offsetY?: number; distanceBetween?: number }
  ): (Particle | null)[][] => {
    const offsetX = options?.offsetX ?? 100;
    const offsetY = options?.offsetY ?? 200;
    const distanceBetween = options?.distanceBetween ?? 80;

    return transpose(massDistribution).map((row, r) => {
      return row.map((mass, c) => {
        if (mass === null) return null;
        return new Particle({
          x: offsetX + r * distanceBetween,
          y: offsetY + c * distanceBetween,
          mass,
        });
      });
    });
  };

  static generateBonds = (particles: Particle[]): Spring[] => {
    const springs: Spring[] = [];
    let p1;
    let p2;
    const lastIndex = particles.length - 1;
    for (let i = 0; i < particles.length; ++i) {
      p1 = particles[i];
      if (i !== lastIndex) {
        p2 = particles[i + 1];
      } else {
        p2 = particles[0];
      }
      springs.push(new Spring({ particles: [p1, p2] }));
    }
    return springs;
  };
}
