import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./styles/custom.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Auth from "./components/Auth";
import FindPets from "./components/FindPets";
import PetCare from "./components/pages/PetCare";
import ContactUs from "./components/ContactUs";
import Disclaimer from "./components/Disclaimer";
import Giveaway from "./components/Giveaway";

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Wrapper component to handle conditional header and footer rendering
const AppContent: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      {!isHomePage && <Header />}
      <main className={`flex-grow-1 ${isHomePage ? "overflow-hidden" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/find-pets" element={<FindPets />} />
          <Route path="/pet-care" element={<PetCare />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route
            path="/giveaway"
            element={
              <ProtectedRoute>
                <Giveaway />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isHomePage && !isAuthPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
