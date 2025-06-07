// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/ResetPassword';
import AuthSuccess from './pages/AuthSuccess';
import VerifyEmail from './pages/VerifyEmail';
import VerificationPending from './pages/VerificationPending';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Layout from './components/Layout/Layout';
import Budget from './pages/Budget/Budget';
import Notifications from './pages/Notifications/Notifications';
import Settings from './pages/Settings/Settings';
import Admin from './pages/Admin/Admin';
import Help from './pages/Help/Help';
import SubscriptionSharing from './pages/SubscriptionSharing/SubscriptionSharing';
import AddSubscription from './pages/AddSubscription';
import Subscriptions from './pages/Subscriptions/Subscriptions';

// Wrap routes with AnimatePresence
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Root Route - Always redirects to signup for new users */}
        <Route
          path="/"
          element={<Navigate to="/signup" replace />}
        />

        {/* Public Routes */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        {/* Auth Flow Routes - These should be accessible without authentication */}
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verification-pending" element={<VerificationPending />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/subscriptions"
          element={
            <PrivateRoute>
              <Layout>
                <Subscriptions />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/add-subscription"
          element={
            <PrivateRoute>
              <Layout>
                <AddSubscription />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/budget"
          element={
            <PrivateRoute>
              <Layout>
                <Budget />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <Layout>
                <Notifications />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Layout>
                <Settings />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Layout>
                <Admin />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/help"
          element={
            <PrivateRoute>
              <Layout>
                <Help />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/subscription-sharing"
          element={
            <PrivateRoute>
              <Layout>
                <SubscriptionSharing />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Catch all route */}
        <Route
          path="*"
          element={<Navigate to="/signup" replace />}
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
