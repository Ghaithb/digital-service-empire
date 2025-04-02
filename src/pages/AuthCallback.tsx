
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { processAuthCallback } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthContext";

const AuthCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Traiter le callback d'authentification
        await processAuthCallback();
        
        // Montrer un toast de succès
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté",
        });
        
        // Vérifier si l'utilisateur a été connecté avec succès
        setTimeout(() => {
          // Rediriger vers la page appropriée
          if (user?.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/account');
          }
        }, 500);
      } catch (err) {
        console.error("Erreur d'authentification:", err);
        setError("Une erreur s'est produite lors de l'authentification");
        setLoading(false);
        
        toast({
          title: "Erreur d'authentification",
          description: "Une erreur s'est produite lors de l'authentification",
          variant: "destructive",
        });
      }
    };

    handleCallback();
  }, [toast, navigate, user]);

  if (loading && !error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin w-10 h-10 rounded-full border-t-2 border-primary"></div>
        <p className="mt-4 text-lg">Authentification en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="mt-4 text-primary hover:underline px-4 py-2 bg-primary/10 rounded-md"
        >
          Retour à la page de connexion
        </button>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
