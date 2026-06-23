import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import TraceCurrent from "./pages/TraceCurrent";
import ViaCurrent from "./pages/ViaCurrent";
import Home from "./pages/Home";
import OhmsLaw from "./pages/OhmsLaw";
import Reactance from "./pages/Reactance";
import Wavelength from "./pages/Wavelength";
import Microstrip from "./pages/Microstrip";
import Stripline from "./pages/Stripline";
import DifferentialPair from "./pages/DifferentialPair";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ohms" element={<OhmsLaw />} />
          <Route path="/reactance" element={<Reactance />} />
          <Route path="/wavelength" element={<Wavelength />} />
          <Route path="/trace-current" element={<TraceCurrent />} />
          <Route path="/via-current" element={<ViaCurrent />} />
          <Route path="/microstrip" element={<Microstrip />} />
          <Route path="/stripline" element={<Stripline />} />
          <Route path="/differential-pair" element={<DifferentialPair />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;