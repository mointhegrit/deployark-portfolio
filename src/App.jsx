import { Routes, Route } from "react-router-dom";
import NoiseOverlay from "./components/NoiseOverlay";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import CaseStudy from "./components/CaseStudy";
import useAnalyticsPageview from "./hooks/useAnalyticsPageview";

function App() {
  useAnalyticsPageview();

  return (
    <>
      <NoiseOverlay />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
