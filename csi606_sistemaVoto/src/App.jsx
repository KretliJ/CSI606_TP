import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Landing from "./components/landing/landing";
import About from "./components/about/about";
import Login from "./components/LoginSignup/LoginSignup";
import Profile from "./components/profile/profile";
import UserPoll from "./components/userPoll/userPoll";
import Poll from "./components/poll/poll";
import MyPolls from "./components/mypolls/mypolls";

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

      <Route
        path="/userPoll"
        element={currentUser ? <UserPoll /> : <Navigate to="/login" />}
      />

      <Route
        path="/myPolls"
        element={currentUser ? <MyPolls /> : <Navigate to="/login" />}
      />

      <Route path="/poll/:pollId" element={<Poll />} />
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
