import { SceneComponent } from "../Components/SceneComponent";
import { useBox } from "../Contexts/BoxProvider";

const Cube = () => {
  const { onSceneReady, makeACuboid, isCuboid, setIsCuboid } = useBox();

  return (
    <>
      <SceneComponent antialias onSceneReady={onSceneReady} />
      {/* <button onClick={makeACuboid} className="screenshot-btn down-btn">
        {`Make a ${isCuboid ? "Cuboid" : "Cube"}`}
      </button> */}
    </>
  );
};

export default Cube;
