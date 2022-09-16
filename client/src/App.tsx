import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Articles from "./pages/Drivers";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route  path="/drivers" element={<Articles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
