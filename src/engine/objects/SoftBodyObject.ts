import { Vector } from "../Vector";
import { Segment } from "../utils/types";
import { Particle } from "./Particle";
import { Spring } from "./Spring";

export type MouseState = {
  isMouseDown: boolean;
  currentParticle?: Particle;
  mousePosition?: Vector;
};

export interface SoftBodyObject {
  particles: Particle[];
  springs: Spring[];
  isControlled: boolean;
  mouseState: MouseState;
  canvas?: HTMLCanvasElement;
}

export interface PhysicsObjectConstructorProps {
  particles: Particle[];
  springs?: Spring[];
}

export class SoftBodyObject {
  constructor({ particles, springs }: PhysicsObjectConstructorProps) {
    this.particles = particles;
    this.springs = springs ?? SoftBodyObject.generateBonds(particles);
    this.isControlled = false;
    this.mouseState = {
      isMouseDown: false,
    };
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

  updateWithMouse = () => {
    if (
      !this.isControlled ||
      !this.mouseState.isMouseDown ||
      !this.mouseState.mousePosition ||
      !this.mouseState.currentParticle
    )
      return;
    this.mouseState.currentParticle.v = new Vector(0, 0);
    this.mouseState.currentParticle.p = this.mouseState.mousePosition;
  };

  private onMouseDown = (e: MouseEvent) => {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.mouseState.isMouseDown = true;
    this.mouseState.mousePosition = new Vector(
      e.clientX - rect.left,
      e.clientY - rect.top
    );

    let closestDistance = Number.MAX_SAFE_INTEGER;

    this.particles.forEach((particle) => {
      if (!this.mouseState.mousePosition) return;

      const currentDistance = Vector.subtract(
        this.mouseState.mousePosition,
        particle.p
      ).length;

      if (currentDistance < closestDistance) {
        this.mouseState.currentParticle = particle;
        closestDistance = currentDistance;
      }
    });
  };

  private onMouseMove = (e: MouseEvent) => {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    if (!this.mouseState.isMouseDown) return;
    this.mouseState.mousePosition = new Vector(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  };

  private onMouseUp = () => {
    this.mouseState.isMouseDown = false;
    this.mouseState.currentParticle = undefined;
  };

  private attachMouseDownListener = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas;
    canvas.addEventListener("mousedown", this.onMouseDown);
  };

  private attachMouseMoveListener = (canvas: HTMLCanvasElement) => {
    canvas.addEventListener("mousemove", this.onMouseMove);
  };

  private attachMouseUpListener = () => {
    window.addEventListener("mouseup", this.onMouseUp);
  };

  attachMouseControls = (canvas: HTMLCanvasElement) => {
    this.isControlled = true;

    this.attachMouseDownListener(canvas);
    this.attachMouseMoveListener(canvas);
    this.attachMouseUpListener();
  };

  private detachMouseDownListener = () => {
    if (!this.canvas) return;
    this.canvas.removeEventListener("mousedown", this.onMouseDown);
  };

  private detachMouseMoveListener = () => {
    if (!this.canvas) return;
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
  };

  private detachMouseUpListener = () => {
    if (!this.canvas) return;
    window.removeEventListener("mouseup", this.onMouseUp);
  };

  detachMouseControls = () => {
    this.isControlled = false;
    this.detachMouseDownListener();
    this.detachMouseMoveListener();
    this.detachMouseUpListener();
    this.canvas = undefined;
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
