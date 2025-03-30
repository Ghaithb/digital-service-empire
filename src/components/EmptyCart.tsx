
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyCart = () => {
  return (
    <div className="bg-secondary py-20 px-4 rounded-xl text-center">
      <ShoppingCart size={64} className="mx-auto mb-6 text-muted-foreground" />
      <h2 className="text-2xl font-medium mb-2">Votre panier est vide</h2>
      <p className="text-muted-foreground mb-8">
        Parcourez notre catalogue pour découvrir des services qui boosteront votre présence en ligne.
      </p>
      <Button asChild size="lg" className="px-8 py-6 text-lg">
        <Link to="/services">
          Découvrir nos services
        </Link>
      </Button>
    </div>
  );
};

export default EmptyCart;
