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
import { useTheme } from "./ThemeProvider";

const BoxContext = createContext();

export const BoxProvider = ({ children }) => {
  const { theme } = useTheme();
  const [screenshot, setScreenShot] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [boxTexture, setBoxTexture] = useState(
    theme === "dark"
      ? "https://images.unsplash.com/photo-1570284613060-766c33850e00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      : "https://images.unsplash.com/photo-1602173195036-5c649b66422d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
  );
  const [showMap, setShowMap] = useState(true);
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

    let boxPosition = box.position;
    console.log(boxPosition);
  };

  return (
    <BoxContext.Provider
      value={{
        onSceneReady,
        setBoxTexture,
        screenshot,
        setScreenShot,
        showModal,
        setShowModal,
        showMap,
        setShowMap,
      }}
    >
      {children}
    </BoxContext.Provider>
  );
};

export const useBox = () => useContext(BoxContext);
