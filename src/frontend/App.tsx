
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "../pages/Index";
import Services from "../pages/Services";
import ServiceDetail from "../pages/ServiceDetail";
import Cart from "../pages/Cart";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Legal from "../pages/Legal";
import OrderConfirmation from "../pages/OrderConfirmation";
import Dashboard from "../pages/Dashboard";

// New pages based on the dropdown menus
import Testimonials from "../pages/Testimonials";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import OrderTracking from "../pages/OrderTracking";
import Loyalty from "../pages/Loyalty";
import FAQ from "../pages/FAQ";

// Authentication and user pages
import Login from "../pages/Login";
import UserDashboard from "../pages/UserDashboard";
import AuthCallback from "../pages/AuthCallback";
import { useAuth } from "@/components/AuthContext";

const queryClient = new QueryClient();

// Auth Protected Route component
const ProtectedRoute = ({ children, allowedRole, redirectTo = "/login" }) => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin w-8 h-8 border-t-2 border-primary rounded-full"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // Check role if specified
  if (allowedRole === "admin" && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/category/:value" element={<Services />} />
            <Route path="/services/platform/:value" element={<Services />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            
            {/* Authentication and user routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/auth-callback" element={<AuthCallback />} />
            
            {/* Protected user routes */}
            <Route path="/account" element={
              <ProtectedRoute allowedRole="user">
                <UserDashboard />
              </ProtectedRoute>
            } />
            
            {/* Protected admin routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRole="admin">
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
