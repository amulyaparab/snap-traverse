import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Cube } from "./Pages/Cube";
import { Map } from "./Pages/Map";
import { Header } from "./Components/Header";

function App() {
  return (
    <div className="App">
      <h1>Snap Traverse</h1>
      <Header />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/cube" element={<Cube />} />
      </Routes>
    </div>
  );
}

export default App;
