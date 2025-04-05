import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./styles/custom.css";

// Import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import FindPets from "./components/FindPets";
import PetCare from "./components/pages/PetCare";
import ContactUs from "./components/ContactUs";
import Disclaimer from "./components/Disclaimer";
import Giveaway from "./components/Giveaway";

// Wrapper component to handle conditional header and footer rendering
const AppContent: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="d-flex flex-column min-vh-100">
      {!isHomePage && <Header />}
      <main className={`flex-grow-1 ${isHomePage ? "overflow-hidden" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/find-pets" element={<FindPets />} />
          <Route path="/pet-care" element={<PetCare />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/giveaway" element={<Giveaway />} />
        </Routes>
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
