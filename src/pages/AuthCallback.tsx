
import React, { useEffect, useState } from "react";
import { processAuthCallback } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      processAuthCallback();
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
      });
      // La redirection est gérée dans processAuthCallback
    } catch (err) {
      setError("Une erreur s'est produite lors de l'authentification");
      setLoading(false);
      toast({
        title: "Erreur d'authentification",
        description: "Une erreur s'est produite lors de l'authentification",
        variant: "destructive",
      });
    }
  }, [toast]);

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
        <a href="/login" className="mt-4 text-primary hover:underline">
          Retour à la page de connexion
        </a>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
