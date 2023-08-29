import { MapBox } from "../Components/MapBox";
import { NotificationModal } from "../Components/NotificationModal";
import { useBox } from "../Contexts/BoxProvider";

export const Map = () => {
  const { showModal } = useBox();
  return (
    <>
      {showModal && <NotificationModal />}
      <MapBox />
    </>
  );
};
