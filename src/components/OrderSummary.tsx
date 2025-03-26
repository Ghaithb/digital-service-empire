
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Order } from "@/lib/orders";
import PaymentStatusIndicator from "@/components/PaymentStatusIndicator";

interface OrderSummaryProps {
  order: Order;
  showDetailedItems?: boolean;
}

const OrderSummary = ({ order, showDetailedItems = true }: OrderSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex justify-between items-center">
          <span>Commande #{order.id}</span>
          <PaymentStatusIndicator status={order.paymentStatus} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-muted-foreground mb-2">Informations client</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">Nom:</span> {order.customerName}</div>
            <div><span className="font-medium">Email:</span> {order.customerEmail}</div>
            <div><span className="font-medium">Date:</span> {formatDate(order.orderDate)}</div>
            <div><span className="font-medium">Total:</span> {order.total.toFixed(2)} €</div>
          </div>
        </div>

        {showDetailedItems && (
          <div>
            <h3 className="font-medium text-muted-foreground mb-2">Articles commandés</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div 
                  key={`${item.service.id}-${item.variant?.id || 'standard'}-${index}`}
                  className="border-b last:border-0 pb-2 last:pb-0"
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">
                      {item.service.title} {item.variant ? `(${item.variant.title})` : ''}
                    </span>
                    <span>{item.total.toFixed(2)} €</span>
                  </div>
                  <div className="text-sm text-muted-foreground flex justify-between">
                    <span>Qté: {item.quantity}</span>
                    <span>{(item.variant?.price || item.service.price).toFixed(2)} € / unité</span>
                  </div>
                  {item.socialMediaLink && (
                    <div className="text-xs text-muted-foreground mt-1 truncate">
                      <span className="font-medium">Lien:</span> {item.socialMediaLink}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
