
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Order, getOrderById } from "@/lib/orders";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Clock, Link as LinkIcon, Check, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const orderData = getOrderById(id);
      setOrder(orderData);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container px-4 mx-auto pt-24 pb-16 min-h-[70vh] flex items-center justify-center">
          <div className="animate-pulse w-16 h-16 rounded-full bg-primary/30"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container px-4 mx-auto pt-24 pb-16 min-h-[70vh] flex flex-col items-center justify-center">
          <AlertTriangle size={64} className="text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-4">Commande introuvable</h1>
          <p className="text-muted-foreground mb-6">
            Nous n'avons pas pu trouver la commande avec l'identifiant {id}.
          </p>
          <Button asChild>
            <Link to="/services">
              Découvrir nos services
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusBadge = (status: 'pending' | 'completed' | 'failed') => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Complété</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">En attente</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Échoué</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

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
          <Button 
            variant="ghost" 
            className="mb-8 flex items-center"
            asChild
          >
            <Link to="/orders">
              <ChevronLeft size={16} className="mr-2" /> Retour aux commandes
            </Link>
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Commande #{order.id}</CardTitle>
                      <CardDescription>
                        {format(new Date(order.orderDate), "dd MMMM yyyy, HH:mm", { locale: fr })}
                      </CardDescription>
                    </div>
                    {getStatusBadge(order.paymentStatus)}
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium text-lg mb-4">Articles commandés</h3>
                  
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="w-full sm:w-20 h-20 bg-muted rounded overflow-hidden">
                            <img 
                              src={item.service.imageUrl} 
                              alt={item.service.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium">{item.service.title}</h4>
                            
                            {item.variant && (
                              <p className="text-sm text-muted-foreground">
                                Option: {item.variant.title}
                              </p>
                            )}
                            
                            {item.socialMediaLink && (
                              <div className="flex items-center mt-2 text-sm">
                                <LinkIcon size={14} className="mr-1 text-muted-foreground" />
                                <a 
                                  href={item.socialMediaLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline truncate"
                                >
                                  {item.socialMediaLink}
                                </a>
                              </div>
                            )}
                            
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm">
                                Quantité: {item.quantity}
                              </span>
                              <span className="font-medium">
                                {item.total.toFixed(2)} €
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{order.total.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">TVA</span>
                      <span>0.00 €</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{order.total.toFixed(2)} €</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations client</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><span className="font-medium">Nom:</span> {order.customerName}</p>
                    <p><span className="font-medium">Email:</span> {order.customerEmail}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Statut de la commande</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 rounded-full p-1 ${
                        order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 
                        order.paymentStatus === 'pending' ? 'bg-amber-100 text-amber-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.paymentStatus === 'completed' ? <Check size={16} /> : 
                         order.paymentStatus === 'pending' ? <Clock size={16} /> : 
                         <AlertTriangle size={16} />}
                      </div>
                      <div>
                        <p className="font-medium">
                          {order.paymentStatus === 'completed' ? 'Paiement effectué' : 
                           order.paymentStatus === 'pending' ? 'Paiement en attente' : 
                           'Paiement échoué'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.paymentStatus === 'completed' ? 'Votre paiement a été traité avec succès.' : 
                           order.paymentStatus === 'pending' ? 'Votre paiement est en cours de traitement.' : 
                           'Votre paiement a rencontré un problème.'}
                        </p>
                      </div>
                    </div>
                    
                    {order.paymentStatus === 'completed' && (
                      <div className="flex items-start gap-3">
                        <div className="mt-1 bg-blue-100 text-blue-800 rounded-full p-1">
                          <Clock size={16} />
                        </div>
                        <div>
                          <p className="font-medium">Traitement en cours</p>
                          <p className="text-sm text-muted-foreground">
                            Votre commande est en cours de traitement et sera livrée dans les délais indiqués.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="text-center">
                <Button asChild className="w-full">
                  <Link to="/contact">
                    Contacter le support
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default OrderDetails;
