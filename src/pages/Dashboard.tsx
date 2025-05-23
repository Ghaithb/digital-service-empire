
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardOrderTable from "@/components/DashboardOrderTable";
import { Order, getAllOrders, updateOrderPaymentStatus } from "@/lib/orders";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShoppingBag,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw
} from "lucide-react";

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const fetchedOrders = getAllOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Erreur lors du chargement des commandes:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les commandes",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadOrders();
  }, [refreshTrigger, toast]);

  const handleLogout = () => {
    navigate("/");
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté du tableau de bord."
    });
  };

  const handleUpdateOrderStatus = (orderId: string, status: 'pending' | 'completed' | 'failed') => {
    const updatedOrder = updateOrderPaymentStatus(orderId, status);
    if (updatedOrder) {
      // Refresh orders list
      setRefreshTrigger(prev => prev + 1);
      
      toast({
        title: "Statut mis à jour",
        description: `La commande #${orderId} est maintenant ${status === 'completed' ? 'complétée' : status === 'pending' ? 'en attente' : 'échouée'}.`
      });
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut de la commande.",
        variant: "destructive"
      });
    }
  };

  // Calculate order statistics
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.paymentStatus === 'completed').length;
  const pendingOrders = orders.filter(order => order.paymentStatus === 'pending').length;
  const failedOrders = orders.filter(order => order.paymentStatus === 'failed').length;
  const totalRevenue = orders
    .filter(order => order.paymentStatus === 'completed')
    .reduce((sum, order) => sum + order.total, 0);

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
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Tableau de Bord Admin
          </h1>
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Bienvenue, {user?.name || 'Admin'}</h2>
            <button 
              onClick={handleLogout}
              className="text-sm px-4 py-2 bg-secondary text-primary hover:bg-secondary/90 rounded-md"
            >
              Déconnexion
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Commandes totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ShoppingBag className="mr-2 text-muted-foreground" size={20} />
                  <span className="text-2xl font-bold">{totalOrders}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">En attente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="mr-2 text-amber-500" size={20} />
                  <span className="text-2xl font-bold">{pendingOrders}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Complétées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 text-green-500" size={20} />
                  <span className="text-2xl font-bold">{completedOrders}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Revenus (€)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Package className="mr-2 text-blue-500" size={20} />
                  <span className="text-2xl font-bold">{totalRevenue.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Liste des commandes</h2>
            <button 
              onClick={() => setRefreshTrigger(prev => prev + 1)}
              className="flex items-center text-sm px-3 py-1 bg-secondary hover:bg-secondary/90 rounded-md"
            >
              <RefreshCw size={16} className="mr-1" /> Actualiser
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-10 h-10 rounded-full border-t-2 border-primary"></div>
            </div>
          ) : (
            <DashboardOrderTable 
              orders={orders} 
              onUpdateStatus={handleUpdateOrderStatus}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Dashboard;
