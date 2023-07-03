import { init } from "./engine/init";
import "./style.css";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const canvas = document.getElementById("physics-canvas") as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

init(canvas);
