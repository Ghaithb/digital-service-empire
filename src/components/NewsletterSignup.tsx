
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would normally integrate with a newsletter service
    toast({
      title: "Inscription réussie !",
      description: "Merci de vous être inscrit à notre newsletter. Votre code de réduction vous sera envoyé par email.",
    });
    
    setEmail("");
  };
  
  return (
    <section className="py-12 bg-primary/5 border-t border-b border-border/40">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Inscrivez-vous pour recevoir 20% de réduction !
          </h2>
          <p className="text-muted-foreground mb-6">
            (Exclus de spam, promis).
          </p>
          
          <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="email"
                placeholder="Entrez votre adresse email"
                className="pl-10 pr-4 py-2 rounded-l-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="rounded-l-none"
            >
              <ArrowRight size={16} />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
