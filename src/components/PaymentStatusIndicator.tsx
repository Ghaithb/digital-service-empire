
import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Clock } from "lucide-react";

// Update the PaymentStatus type to match the values used in orders
export type PaymentStatus = "succeeded" | "processing" | "failed" | "pending" | "completed";

interface PaymentStatusIndicatorProps {
  status: PaymentStatus;
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const PaymentStatusIndicator = ({ 
  status, 
  className, 
  size = "md", 
  showText = true 
}: PaymentStatusIndicatorProps) => {
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
  
  const sizeClasses = {
    sm: "p-1 text-xs",
    md: "p-2 text-sm",
    lg: "p-3 text-base"
  };

  return (
    <div 
      className={cn(
        "flex items-center gap-2 rounded-md border",
        config.bgColor,
        config.borderColor,
        sizeClasses[size],
        className
      )}
    >
      <Icon className={config.color} size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
      {showText && (
        <span className={cn("font-medium", config.color)}>
          {config.text}
        </span>
      )}
    </div>
  );
};

export default PaymentStatusIndicator;
