import { softBodyShape2, squareShape } from "./softBodyShapes";
import { generateSoftBody } from "./helpers/generateSoftBody";
import { Spring } from "./objects/Spring";

/**  This is only to generate bodies that you can test the engine on, soon I will develop a way to create soft bodies with custom shapes inside web UI
 */
export function generateTestSoftBodies() {
  const softBody1 = generateSoftBody(squareShape);
  // add inside bonds
  softBody1.springs.push(
    new Spring({ particles: [softBody1.particles[0], softBody1.particles[2]] })
  );
  softBody1.springs.push(
    new Spring({ particles: [softBody1.particles[1], softBody1.particles[3]] })
  );

  const softBody2 = generateSoftBody(softBodyShape2);

  return [softBody1, softBody2];
}
