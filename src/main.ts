import { init } from "./engine/init";
import { engineConfig } from "./engine.config";
import "./style.css";
import { generateSoftBody, parseRawJSONSoftBody } from "./engine/helpers/generateSoftBody";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const shapeTextArea = document.getElementById("shape-input") as HTMLTextAreaElement | null;
const shapeAddBtn = document.getElementById("shape-add") as HTMLButtonElement | null;
if(!shapeTextArea) throw new Error("Couldn't find shapeTextArea");
if(!shapeAddBtn) throw new Error("Couldn't find shapeAddBtn");

const canvas = document.getElementById("physics-canvas") as HTMLCanvasElement | null;
if(!canvas) throw new Error("Couldn't find physics-canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Couldn't get context of a canvas");

const { addObject } = init({ canvas, ctx, engineConfig });

shapeAddBtn.addEventListener("click", () => {
  const rawShape = shapeTextArea.value;
  const parsedShape = parseRawJSONSoftBody(rawShape);
  const softBody = generateSoftBody(parsedShape);
  addObject(softBody);
});
