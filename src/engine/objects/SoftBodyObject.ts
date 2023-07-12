import { Vector } from "../Vector";
import { transpose } from "../utils/transpose";
import { Particle } from "./Particle";
import { Spring } from "./Spring";

export interface SoftBodyObject {
  particles: Particle[][];
  springs: Spring[];
}

export interface PhysicsObjectConstructorProps {
  particles: Particle[][];
}

export class SoftBodyObject {
  constructor({ particles }: PhysicsObjectConstructorProps) {
    this.particles = particles;
    this.springs = [];
    this.generateBonds(particles);
    this.generateBonds(transpose(particles));
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

  private generateBonds = (particles: Particle[][]) => {
    for (let r = 0; r < particles.length; ++r) {
      for (let c = 0; c < particles[r].length - 1; ++c) {
        let p1 = particles[r][c];
        let p2 = particles[r][c + 1];
        if (!p1 || !p2) continue;

        this.springs.push(new Spring({ particles: [p1, p2] }));

        // Connect right-down
        if (r < particles.length - 1) {
          let p3 = particles[r + 1][c + 1];
          if (!p3) continue;
          this.springs.push(new Spring({ particles: [p1, p3] }));
        }

        // Connect up-right
        if (r !== 0) {
          let p3 = particles[r - 1][c + 1];
          if (!p3) continue;
          this.springs.push(new Spring({ particles: [p1, p3] }));
        }
      }
    }
  };
}
