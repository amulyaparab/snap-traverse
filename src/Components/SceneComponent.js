import { Engine, Scene } from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { useBox } from "../Contexts/BoxProvider";

export const SceneComponent = ({ antialias, onSceneReady }) => {
  const reactCanvas = useRef(null);
  const { cube } = useBox();
  let { setCubeRotation, cubeRotation, cubeRotationRef } = useBox();
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new Engine(canvas, antialias);
    const scene = new Scene(engine);

    engine.runRenderLoop(() => {
      scene.render();
    });

    if (scene.isReady()) {
      onSceneReady(scene);
      const cubeRotation = cube.current.rotation;
      console.log(
        `Rotation - X: ${cubeRotation.x.toFixed(
          2
        )}, Y: ${cubeRotation.y.toFixed(2)}, Z: ${cubeRotation.z.toFixed(2)}`
      );
    } else {
      scene.onReadyObservable().addOnce((scene) => {
        onSceneReady(scene);
        const cubeRotation = cube.current.rotation;
        console.log(
          `Rotation - X: ${cubeRotation.x.toFixed(
            2
          )}, Y: ${cubeRotation.y.toFixed(2)}, Z: ${cubeRotation.z.toFixed(2)}`
        );
      });
    }

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }
    // scene.onBeforeRenderObservable.add(() => {
    //   if (cube.current) {
    //     const rotation = cube.current.rotation;

    //     setCubeRotation({
    //       x: rotation.x.toFixed(2),
    //       y: rotation.y.toFixed(2),
    //       z: rotation.z.toFixed(2),
    //     });
    //   }
    // });

    return () => {
      console.log("box unmounted");
      scene.getEngine().dispose();
      window.addEventListener("resize", resize);
    };
  }, []);
  if (cube) {
    cubeRotationRef = cube.current?.rotation;
  }
  console.log("sdas", cubeRotationRef);
  return <canvas className="canvas" ref={reactCanvas} id="react-canvas" />;
};
