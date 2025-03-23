
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  Clock,
  MoreHorizontal,
  XCircle,
  Eye,
  AlertTriangle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/lib/orders";

interface DashboardOrderTableProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: 'pending' | 'completed' | 'failed') => void;
}

const DashboardOrderTable: React.FC<DashboardOrderTableProps> = ({ orders, onUpdateStatus }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return "Complétée";
      case 'pending':
        return "En attente";
      case 'failed':
        return "Échouée";
      default:
        return "Inconnue";
    }
  };

  return (
    <>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucune commande trouvée.
                </TableCell>
              </TableRow>
            ) : (
              orders
                .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
                .map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{formatDate(order.orderDate)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{order.customerName}</span>
                        <span className="text-xs text-muted-foreground">{order.customerEmail}</span>
                      </div>
                    </TableCell>
                    <TableCell>{order.total.toFixed(2)} €</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.paymentStatus)}
                        <span>{getStatusText(order.paymentStatus)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 rounded-md hover:bg-secondary">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menu</span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir les détails
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'completed')}>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            Marquer comme complétée
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'pending')}>
                            <Clock className="mr-2 h-4 w-4 text-amber-500" />
                            Marquer comme en attente
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'failed')}>
                            <XCircle className="mr-2 h-4 w-4 text-red-500" />
                            Marquer comme échouée
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-md sm:max-w-lg md:max-w-xl">
          <DialogHeader>
            <DialogTitle>Détails de la commande #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              {selectedOrder && formatDate(selectedOrder.orderDate)}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                  <p className="text-sm">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Statut</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedOrder.paymentStatus)}
                    <span>{getStatusText(selectedOrder.paymentStatus)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Articles commandés</h3>
                <div className="border rounded-md divide-y">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="p-3 flex justify-between">
                      <div>
                        <p className="font-medium">{item.service.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantité: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">{item.total.toFixed(2)} €</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Total</span>
                <span className="font-bold">{selectedOrder.total.toFixed(2)} €</span>
              </div>
              
              <div className="text-xs text-muted-foreground pt-2">
                {selectedOrder.sessionId && (
                  <p>ID de session: {selectedOrder.sessionId}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardOrderTable;
