import { ArcRotateCamera, MeshBuilder, Vector3 } from "@babylonjs/core";
import { SceneComponent } from "./SceneComponent";

export const Box = () => {
  const onSceneReady = (scene) => {
    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 3,
      5,
      new Vector3(0, 0, 0),
      scene
    );
    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    const box = new MeshBuilder.CreateBox("box", { size: 2 }, scene);
  };

  return <SceneComponent antialias onSceneReady={onSceneReady} />;
};
