import { Vector } from "../Vector";
import { Particle } from "./Particle";

export interface Spring {
  particles: [Particle, Particle];
  stiffness: number;
  dampening: number;
  restLength: number;
}

export interface SpringConstructorProps {
  particles: [Particle, Particle];
  restLength?: number;
  stiffness?: number;
  dampening?: number;
}

export class Spring {
  constructor({
    particles,
    restLength,
    stiffness,
    dampening,
  }: SpringConstructorProps) {
    this.particles = particles;

    this.restLength =
      restLength ??
      Vector.subtract(this.particles[0].p, this.particles[1].p).length;
    this.stiffness = stiffness ?? 150;
    this.dampening = dampening ?? 80;
  }

  static attach = (particle1: Particle, particle2: Particle) => {
    return new Spring({ particles: [particle1, particle2] });
  };

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(this.particles[0].x, this.particles[0].y);
    ctx.lineTo(this.particles[1].x, this.particles[1].y);
    ctx.strokeStyle = "white";
    ctx.stroke();
  };

  update = () => {
    const direction1 = Vector.subtract(
      this.particles[0].p,
      this.particles[1].p
    );

    const deltaLength = direction1.length - this.restLength;

    const deltaLengthVector1 = Vector.scale(direction1.unit, deltaLength);
    const deltaLengthVector2 = Vector.scale(direction1.unit, -deltaLength);

    this.particles[0].f = Vector.add(
      this.particles[0].f,
      Vector.scale(deltaLengthVector1, -this.stiffness)
    );
    this.particles[1].f = Vector.add(
      this.particles[1].f,
      Vector.scale(deltaLengthVector2, -this.stiffness)
    );

    const relativeVelocity = Vector.subtract(
      this.particles[1].v,
      this.particles[0].v
    );
    const dampeningForce = Vector.scale(
      direction1.unit,
      Vector.dotProduct(direction1.unit, relativeVelocity) * this.dampening
    );

    this.particles[0].f = Vector.add(this.particles[0].f, dampeningForce);
    this.particles[1].f = Vector.add(
      this.particles[1].f,
      Vector.scale(dampeningForce, -1)
    );
  };
}
