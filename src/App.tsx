import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Trade from "./pages/Trade";
import Markets from "./pages/Markets";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import { ROUTES } from "./_common/routes";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.AUTH.LOGIN} element={<Auth />} />
        <Route
          path={ROUTES.AUTH.FORGOT_PASSWORD}
          element={<ForgotPassword />}
        />
        <Route path={ROUTES.AUTH.RESET_PASSWORD} element={<ResetPassword />} />
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path={ROUTES.DASHBOARD.HOME} element={<Home />} />
                <Route
                  path={`${ROUTES.DASHBOARD.TRADE}/:id`}
                  element={<Trade />}
                />
                <Route path={ROUTES.DASHBOARD.MARKETS} element={<Markets />} />
                <Route path={ROUTES.DASHBOARD.PROFILE} element={<Profile />} />
                <Route
                  path={ROUTES.DASHBOARD.SETTINGS}
                  element={<Settings />}
                />
                {/* Add more routes here */}
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
