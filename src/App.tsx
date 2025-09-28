import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { BottomNav } from "@/components/navigation/BottomNav";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Meal from "./pages/Meal";
import Workouts from "./pages/Workouts";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";

// Import i18n after React is ready
import "./lib/i18n";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify" element={<Verify />} />
                
                {/* Protected routes */}
                <Route path="/onboarding" element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <>
                      <Dashboard />
                      <BottomNav />
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/meal" element={
                  <ProtectedRoute>
                    <>
                      <Meal />
                      <BottomNav />
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/workouts" element={
                  <ProtectedRoute>
                    <>
                      <Workouts />
                      <BottomNav />
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/stats" element={
                  <ProtectedRoute>
                    <>
                      <Stats />
                      <BottomNav />
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <>
                      <Profile />
                      <BottomNav />
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/subscription" element={
                  <ProtectedRoute>
                    <>
                      <Subscription />
                      <BottomNav />
                    </>
                  </ProtectedRoute>
                } />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
