import { createContext, useContext, useState } from "react";

const ScreenshotContext = createContext();
export const ScreenshotProvider = ({ children }) => {
  const [screenshot, setScreenShot] = useState("");
  const [showModal, setShowModal] = useState(false);
  return (
    <ScreenshotContext.Provider
      value={{ screenshot, setScreenShot, setShowModal, showModal }}
    >
      {children}
    </ScreenshotContext.Provider>
  );
};

export const useScreenshot = () => useContext(ScreenshotContext);
