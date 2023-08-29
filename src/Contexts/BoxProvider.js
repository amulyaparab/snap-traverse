import { createContext, useContext, useState } from "react";
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
const BoxContext = createContext();
export const BoxProvider = ({ children }) => {
  const [boxTexture, setBoxTexture] = useState(
    "https://images.unsplash.com/photo-1570284613060-766c33850e00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  );
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
    const light = new HemisphericLight("light", new Vector3(0, 0, 0), scene);
    light.intensity = 0.2;
    light.groundColor = new Color3(7, 7, 7);
    const texture = new Texture(boxTexture, scene);
    const material = new StandardMaterial("default", scene);
    material.diffuseTexture = texture;
    let box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    box.material = material;
  };

  return (
    <BoxContext.Provider value={{ onSceneReady, setBoxTexture }}>
      {children}
    </BoxContext.Provider>
  );
};

export const useBox = () => useContext(BoxContext);
