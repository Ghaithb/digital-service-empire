
import React from "react";
import { CheckCircle, Clock, Truck, Package, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderTrackerProps {
  status: "pending" | "processing" | "shipped" | "delivered" | "completed";
  orderDate: Date;
  estimatedDelivery?: Date;
  shippedDate?: Date;
  deliveredDate?: Date;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({
  status,
  orderDate,
  estimatedDelivery,
  shippedDate,
  deliveredDate,
}) => {
  const steps = [
    {
      id: "pending",
      title: "Commande reçue",
      description: "Nous avons reçu votre commande",
      icon: ShoppingBag,
      date: orderDate,
      complete: ["pending", "processing", "shipped", "delivered", "completed"].includes(status),
      current: status === "pending",
    },
    {
      id: "processing",
      title: "En préparation",
      description: "Votre commande est en cours de traitement",
      icon: Clock,
      date: null,
      complete: ["processing", "shipped", "delivered", "completed"].includes(status),
      current: status === "processing",
    },
    {
      id: "shipped",
      title: "Expédiée",
      description: shippedDate 
        ? `Expédiée le ${formatDate(shippedDate)}`
        : estimatedDelivery 
          ? `Expédition prévue pour le ${formatDate(estimatedDelivery)}`
          : "En attente d'expédition",
      icon: Package,
      date: shippedDate,
      complete: ["shipped", "delivered", "completed"].includes(status),
      current: status === "shipped",
    },
    {
      id: "delivered",
      title: "Livrée",
      description: deliveredDate 
        ? `Livrée le ${formatDate(deliveredDate)}`
        : "En attente de livraison",
      icon: Truck,
      date: deliveredDate,
      complete: ["delivered", "completed"].includes(status),
      current: status === "delivered" || status === "completed",
    },
  ];

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="py-4">
      <div className="flex items-center justify-between w-full mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step circle */}
            <div className="relative">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2",
                  step.complete
                    ? "bg-primary border-primary text-white"
                    : step.current
                    ? "border-primary text-primary"
                    : "border-gray-300 text-gray-300"
                )}
              >
                {step.complete ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <div className="absolute -bottom-6 w-20 text-center -left-5">
                <p className={cn(
                  "text-xs font-medium",
                  step.complete || step.current ? "text-primary" : "text-muted-foreground"
                )}>
                  {step.title}
                </p>
              </div>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-auto border-t-2",
                  steps[index].complete && steps[index + 1].complete
                    ? "border-primary"
                    : "border-gray-300"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-accent/50 rounded-md">
        <h4 className="font-medium mb-2">Statut actuel:</h4>
        <p className="text-sm">{steps.find(step => step.current)?.description}</p>
        
        {estimatedDelivery && status !== "delivered" && status !== "completed" && (
          <p className="text-sm mt-2">
            <span className="font-medium">Livraison estimée:</span> {formatDate(estimatedDelivery)}
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderTracker;
