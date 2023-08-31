import { MapBox } from "../Components/MapBox";
import { NotificationModal } from "../Components/NotificationModal";
import { useBox } from "../Contexts/BoxProvider";

const MapPage = () => {
  const { showModal } = useBox();

  return (
    <div className="relative">
      {showModal && <NotificationModal />}
      <MapBox />
      <div className="target"></div>
    </div>
  );
};

export default MapPage;
