import { Routes, Route } from "react-router-dom";

import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import Home from "./pages/Home";
import Coaching from "./pages/Coaching";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coaching" element={<Coaching />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;