import { engineConfig } from "./engine.config";
import { init } from "./engine/init";
import { generateSoftBody, parseShapeJSON } from "./engine/helpers/generateSoftBody";

import "./style.css";

const CANVAS_WIDTH = 1366;
const CANVAS_HEIGHT = 800;

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
  const jsonShape = shapeTextArea.value;
  const shape = parseShapeJSON(jsonShape);
  const softBody = generateSoftBody(shape);
  addObject(softBody);
});

const defaultShape = `{"particles":[{"id":"1","x":525,"y":274},{"id":"2","x":581,"y":273},{"id":"3","x":581,"y":328},{"id":"4","x":525,"y":328}],"springs":[{"p1":"1","p2":"2"},{"p1":"2","p2":"3"},{"p1":"3","p2":"4"},{"p1":"4","p2":"1"},{"p1":"4","p2":"2"},{"p1":"1","p2":"3"}]}`

addObject(generateSoftBody(parseShapeJSON(defaultShape)));
