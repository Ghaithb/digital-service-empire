
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthTabs from "@/components/AuthForms";
import { useAuth } from "@/components/AuthContext";

const Login = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Récupérer l'URL de redirection si disponible
  const from = location.state?.from?.pathname || "/";
  
  useEffect(() => {
    if (!loading && isAuthenticated) {
      // Si l'utilisateur est déjà connecté, rediriger vers la destination appropriée
      if (isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/account");
      }
    }
  }, [isAuthenticated, isAdmin, loading, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-md mx-auto mb-8">
            <h1 className="text-3xl font-bold text-center mb-2">
              Espace client
            </h1>
            <p className="text-center text-muted-foreground">
              Connectez-vous pour gérer vos commandes et accéder à votre programme de fidélité
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin w-8 h-8 rounded-full border-t-2 border-primary"></div>
            </div>
          ) : (
            <AuthTabs />
          )}
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Login;
