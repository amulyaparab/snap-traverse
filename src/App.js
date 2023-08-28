import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Cube } from "./Pages/Cube";
import { Map } from "./Pages/Map";
import { Header } from "./Components/Header";
import { Navbar } from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/cube" element={<Cube />} />
      </Routes>
    </div>
  );
}

export default App;
