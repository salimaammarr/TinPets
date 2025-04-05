import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import components (we'll create these next)
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import FindPets from "./pages/FindPets";
import DogCare from "./pages/DogCare";
import CatCare from "./pages/CatCare";
import ContactUs from "./pages/ContactUs";
import Disclaimer from "./pages/Disclaimer";
import Giveaway from "./pages/Giveaway";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/find-pets" element={<FindPets />} />
            <Route path="/dog-care" element={<DogCare />} />
            <Route path="/cat-care" element={<CatCare />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/giveaway" element={<Giveaway />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
