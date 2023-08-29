import { SceneComponent } from "../Components/SceneComponent";
import { useBox } from "../Contexts/BoxProvider";
import { useScreenshot } from "../Contexts/ScreenShotProvider";

export const Cube = () => {
  const { screenshot } = useScreenshot();
  const { onSceneReady } = useBox();
  return (
    <>
      <SceneComponent antialias onSceneReady={onSceneReady} />
    </>
  );
};
