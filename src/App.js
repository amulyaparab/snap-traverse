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

function App() {
  const { theme } = useTheme();
  document.body.className = theme;
  const { showCube } = useBox();

  const Map = lazy(() => import("./Pages/Map"));
  const Cube = lazy(() => import("./Pages/Cube"));

  return (
    <div className="App">
      <Navbar />
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Map />} />
          {showCube && <Route path="/cube" element={<Cube />} />}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
