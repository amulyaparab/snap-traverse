import { createContext, useContext, useState } from "react";

const ScreenshotContext = createContext();
export const ScreenshotProvider = ({ children }) => {
  const [screenshot, setScreenShot] = useState("");
  return (
    <ScreenshotContext.Provider value={{ screenshot, setScreenShot }}>
      {children}
    </ScreenshotContext.Provider>
  );
};

export const useScreenshot = () => useContext(ScreenshotContext);
