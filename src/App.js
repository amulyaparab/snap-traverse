import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Header";
import { Navbar } from "./Components/Navbar";
import { useTheme } from "./Contexts/ThemeProvider";
import "./dark-theme.css";
import "./light-theme.css";
import { Suspense, lazy } from "react";
import { useBox } from "./Contexts/BoxProvider";
import { Loader } from "./Components/Loader";
import { ErrorPage } from "./Pages/Error";
import MapPage from "./Pages/Map";

function App() {
  const { theme } = useTheme();
  document.body.className = theme;

  const { showCube } = useBox();

  // const Map = lazy(() => import("./Pages/Map"));
  const Cube = lazy(() => import("./Pages/Cube"));

  return (
    <div className="App">
      <Navbar />
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MapPage />} />
          {showCube && <Route path="/cube" element={<Cube />} />}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
