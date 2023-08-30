import { SceneComponent } from "../Components/SceneComponent";
import { useBox } from "../Contexts/BoxProvider";

const Cube = () => {
  const { onSceneReady, scaleCube } = useBox();
  return (
    <>
      <SceneComponent antialias onSceneReady={onSceneReady} />
      <button onClick={scaleCube}>Make A Cuboid</button>
    </>
  );
};
export default Cube;
