import { createContext, useContext, useEffect, useRef, useState } from "react";

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
  const cube = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const prevScreenshot = localStorage.getItem("screenshot");
  const [screenshot, setScreenShot] = useState(
    prevScreenshot ? prevScreenshot : ""
  );
  const [boxTexture, setBoxTexture] = useState(
    prevScreenshot ? prevScreenshot : ""
  );

  const [showCube, setShowCube] = useState(
    localStorage.getItem("shouldShowCube")
      ? localStorage.getItem("shouldShowCube")
      : false
  );

  // theme === "dark"
  //   ? "https://images.unsplash.com/photo-1570284613060-766c33850e00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  //   : "https://images.unsplash.com/photo-1602173195036-5c649b66422d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"

  const onSceneReady = (scene) => {
    console.log(scene);
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
    light.diffuse = new Color3(10, 10, 10);

    const texture = new Texture(boxTexture, scene);
    const material = new StandardMaterial("default", scene);
    material.diffuseTexture = texture;

    let box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    box.material = material;
    cube.current = box;
  };

  const scaleCube = () => {
    if (cube.current) {
      cube.current.scaling.x += 0.5;
      cube.current.scaling.y += 0.2;
      cube.current.scaling.z += 1;
    }
  };

  useEffect(() => {
    localStorage.setItem("shouldShowCube", showCube);
  }, [showCube]);

  return (
    <BoxContext.Provider
      value={{
        onSceneReady,
        setBoxTexture,
        screenshot,
        setScreenShot,
        showModal,
        setShowModal,
        showCube,
        setShowCube,
        scaleCube,
        cube,
      }}
    >
      {children}
    </BoxContext.Provider>
  );
};

export const useBox = () => useContext(BoxContext);
