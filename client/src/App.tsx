import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Articles from "./pages/Drivers";
import LandingPage from "./pages/LandingPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/drivers" element={<Articles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
