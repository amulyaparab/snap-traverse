import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Header";
import { Navbar } from "./Components/Navbar";
import { useTheme } from "./Contexts/ThemeProvider";
import "./dark-theme.css";
import "./light-theme.css";
import { Suspense, lazy } from "react";
import { useBox } from "./Contexts/BoxProvider";

function App() {
  const { theme } = useTheme();
  document.body.className = theme;

  const Map = lazy(() => import("./Pages/Map"));
  const Cube = lazy(() => import("./Pages/Cube"));
  const { showCube } = useBox();
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/cube" element={<Cube />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
