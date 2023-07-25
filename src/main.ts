import { engineConfig } from "./engine.config";
import { init } from "./engine/init";
import { generateTestSoftBodies } from "./engine/softBodies";
import type { SoftBodyObject } from "./engine/objects/SoftBodyObject";

import "./style.css";

const handleAddObject = (object: SoftBodyObject) => {
  // console.log("New Object has been added", object);
};

const initObjectListButtons = (
  objects: SoftBodyObject[],
  canvas: HTMLCanvasElement
) => {
  const listItems = objects.map((object, i) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = `${i}`;
    li.appendChild(button);
    return { element: li, object };
  });

  let controllable = listItems[0];
  controllable.element.children[0].classList.add("active-object");

  listItems.forEach((li) => {
    li.element.children[0].classList.add("object");
    li.element.children[0].addEventListener("click", () => {
      // reset
      controllable.element.children[0].classList.remove("active-object");
      controllable.object.detachMouseControls();

      // set
      controllable = li;
      controllable.object.attachMouseControls(canvas);
      li.element.children[0].classList.add("active-object");
    });
  });

  const aside = document.querySelector("aside");
  const ul = document.createElement("ul");

  listItems.forEach((item) => {
    ul.appendChild(item.element);
  });

  aside?.appendChild(ul);
};

const main = () => {
  const canvas = document.getElementById("physics-canvas") as HTMLCanvasElement;

  canvas.width = engineConfig.canvas.width;
  canvas.height = engineConfig.canvas.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { objects, addObject } = init({
    ctx,
    engineConfig,
    onAddObject: handleAddObject,
  });

  const [softBody1, softBody2, softBody3] = generateTestSoftBodies();

  softBody1.attachMouseControls(canvas);

  addObject(softBody1);
  addObject(softBody2);
  addObject(softBody3);

  initObjectListButtons(objects, canvas);
};

main();
