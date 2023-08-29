import { SceneComponent } from "../Components/SceneComponent";
import { useBox } from "../Contexts/BoxProvider";

export const Cube = () => {
  const { onSceneReady } = useBox();
  return (
    <>
      <SceneComponent antialias onSceneReady={onSceneReady} />
    </>
  );
};
