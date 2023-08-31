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
  let cubeRotationRef = {
    x: 0,
    y: 0,
    z: 0,
  };
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
  const [isCuboid, setIsCuboid] = useState(true);
  const [cubeRotation, setCubeRotation] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
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
    light.diffuse = new Color3(10, 10, 10);

    const texture = new Texture(boxTexture, scene);
    const material = new StandardMaterial("default", scene);
    material.diffuseTexture = texture;

    let box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    box.material = material;
    cube.current = box;
  };
  console.log(cube.current?.options);
  const makeACuboid = () => {
    if (cube.current) {
      setIsCuboid(!isCuboid);
      if (isCuboid) {
        cube.current.scaling.x = 1;
        cube.current.scaling.y = 0.5;
        cube.current.scaling.z = 1.5;
      } else {
        cube.current.scaling.x = 1;
        cube.current.scaling.y = 1;
        cube.current.scaling.z = 1;
      }
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
        makeACuboid,
        cube,
        cubeRotation,
        setCubeRotation,
        cubeRotationRef,
        isCuboid,
        setIsCuboid,
      }}
    >
      {children}
    </BoxContext.Provider>
  );
};

export const useBox = () => useContext(BoxContext);
