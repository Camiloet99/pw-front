import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Navbar from "../components/Navbar";
import ForgotPassword from "../pages/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import MyAccount from "../pages/MyAccount";
import Search from "../pages/Search";
import { useAuth } from "../contexts/AuthContext";
import Plans from "../pages/Plans";
import NotFound from "../pages/NotFound";
import { AnimatePresence } from "framer-motion";
import Footer from "../components/footer/Footer";
import UploadDocument from "../pages/admin/UploadDocument";
import UserManagement from "../pages/admin/UserManagement";

export default function AppRouter() {
  const { isAuthenticated, user } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="container flex-grow-1 mt-4">
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? <Navigate to="/search" replace /> : <Home />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/plans"
                element={
                  <PrivateRoute>
                    <Plans />
                  </PrivateRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <PrivateRoute>
                    <MyAccount />
                  </PrivateRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <PrivateRoute>
                    <Search />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/upload"
                element={
                  isAuthenticated && user?.role === "admin" ? (
                    <UploadDocument />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/admin/users"
                element={
                  isAuthenticated && user?.role === "admin" ? (
                    <PrivateRoute>
                      <UserManagement />
                    </PrivateRoute>
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AnimatePresence>
  );
}
