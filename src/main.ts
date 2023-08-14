import { init } from "./engine/init";
import { engineConfig } from "./engine.config";
import "./style.css";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const canvas = document.getElementById("physics-canvas") as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Couldn't get context of a canvas");

init({ canvas, ctx, engineConfig });
