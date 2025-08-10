import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Landing from "./components/landing/landing";
import About from "./components/about/about";
import Login from "./components/LoginSignup/LoginSignup";
import Profile from "./components/profile/profile";

function AppRoutes() {
  const { currentUser } = useAuth(); // Pega o usuário do contexto

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />

      <Route
        path="/login"
        element={currentUser ? <Navigate to="/profile" /> : <Login />}
      />

      <Route
        path="/profile"
        element={currentUser ? <Profile /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
