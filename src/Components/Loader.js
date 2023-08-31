import { ProgressBar } from "react-loader-spinner";
import { useTheme } from "../Contexts/ThemeProvider";

export const Loader = () => {
  const { isThemeDark } = useTheme();

  return (
    <div className="loader-parent">
      <ProgressBar
        height="180"
        width="180"
        ariaLabel="progress-bar-loading"
        wrapperClass="progress-bar-wrapper"
        borderColor={isThemeDark ? "#fff" : "#fccd4c"}
        barColor={isThemeDark ? "#fff" : "#fccd4c"}
      />
    </div>
  );
};
