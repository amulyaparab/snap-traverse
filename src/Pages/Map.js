import { MapBox } from "../Components/MapBox";
import { NotificationModal } from "../Components/NotificationModal";
import { useBox } from "../Contexts/BoxProvider";
import { useScreenshot } from "../Contexts/ScreenShotProvider";

export const Map = () => {
  const { showModal } = useScreenshot();
  return (
    <>
      {showModal && <NotificationModal />}
      <MapBox />
    </>
  );
};
