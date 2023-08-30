import { SceneComponent } from "../Components/SceneComponent";
import { useBox } from "../Contexts/BoxProvider";

const Cube = () => {
  const { onSceneReady } = useBox();
  return (
    <>
      <SceneComponent antialias onSceneReady={onSceneReady} />
    </>
  );
};
export default Cube;
