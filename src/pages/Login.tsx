
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthTabs from "@/components/AuthForms";

const Login = () => {
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
          
          <AuthTabs />
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Login;
