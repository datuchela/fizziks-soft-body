import { Particle } from "./Particle";

export interface Spring {
  particles: [Particle, Particle];
  stiffness: number;
  dampening: number;
}

export interface SpringConstructorProps {
  particles: [Particle, Particle];
  stiffness?: number;
  dampening?: number;
}

export class Spring {
  constructor({ particles, stiffness, dampening }: SpringConstructorProps) {
    this.particles = particles;
    this.stiffness = stiffness ?? 0.01;
    this.dampening = dampening ?? 0.1;
  }
}
