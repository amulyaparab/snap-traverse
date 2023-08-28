import { Engine, Scene } from "@babylonjs/core";
import { useEffect, useRef } from "react";

export const SceneComponent = ({ antialias, onSceneReady }) => {
  const reactCanvas = useRef(null);

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
    } else {
      scene.onReadyObservable().addOnce((scene) => onSceneReady(scene));
    }

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();
      window.addEventListener("resize", resize);
    };
  }, []);

  return <canvas className="canvas" ref={reactCanvas} id="react-canvas" />;
};
