import { Box } from "../Components/Box";
import { useScreenshot } from "../Contexts/ScreenShotProvider";

export const Cube = () => {
  const { screenshot } = useScreenshot();
  return (
    <>
      <Box />
      {screenshot && <img src={screenshot} alt="screenshot" />}
    </>
  );
};
