
import React from "react";
import { cn } from "@/frontend/lib/utils";
import { CheckCircle, XCircle, Clock } from "lucide-react";

// Update the PaymentStatus type to match the values used in orders
export type PaymentStatus = "succeeded" | "processing" | "failed" | "pending" | "completed";

interface PaymentStatusIndicatorProps {
  status: PaymentStatus;
  className?: string;
}

const PaymentStatusIndicator = ({ status, className }: PaymentStatusIndicatorProps) => {
  // Map the order status values to our component's internal values
  let displayStatus: "succeeded" | "processing" | "failed";
  
  if (status === "completed" || status === "succeeded") {
    displayStatus = "succeeded";
  } else if (status === "pending" || status === "processing") {
    displayStatus = "processing";
  } else {
    displayStatus = "failed";
  }
  
  const statusConfig = {
    succeeded: {
      icon: CheckCircle,
      text: "Paiement réussi",
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    processing: {
      icon: Clock,
      text: "En cours de traitement",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    },
    failed: {
      icon: XCircle,
      text: "Paiement échoué",
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    }
  };

  const config = statusConfig[displayStatus];
  const Icon = config.icon;

  return (
    <div 
      className={cn(
        "flex items-center gap-2 p-3 rounded-md border",
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      <Icon className={config.color} size={20} />
      <span className={cn("font-medium", config.color)}>
        {config.text}
      </span>
    </div>
  );
};

export default PaymentStatusIndicator;
