import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Trade from "./pages/Trade";
import Markets from "./pages/Markets";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trade/:id" element={<Trade />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          {/* Add more routes here */}
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
