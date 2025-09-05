import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import NotificationsPage from "./pages/NotificationsPage";
import RulesPage from "./pages/RulesPage";
import OAuthCallbackPage from "./pages/OAuthCallbackHandler";
import { session } from "./store/session";
import AppNotificationsPage from "./pages/AppNotificationsPage";
import "./index.css";

const Guard = ({ children }: { children: React.ReactNode }) =>
  session.token ? <>{children}</> : <Navigate to="/login" replace />;

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route index element={<Guard><NotificationsPage/></Guard>} />
          <Route path="integrations" element={<Guard><IntegrationsPage/></Guard>} />
          <Route path="rules" element={<Guard><RulesPage/></Guard>} />
          <Route path="oauth/callback" element={<Guard><OAuthCallbackPage/></Guard>} />
          <Route path="apps/:app" element={<Guard><AppNotificationsPage/></Guard>} />  {/* NEW */}
        </Route>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
