
import React from "react";
import { motion } from "framer-motion";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, FileText, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PrivacyTermsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="my-12"
    >
      <div className="container px-4 mx-auto">
        <div className="flex flex-col gap-2 items-center text-center mb-8">
          <FileText size={28} className="text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">
            Informations légales
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Consultez nos politiques pour comprendre comment nous traitons vos données et 
            quelles sont nos conditions générales de vente.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-card rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Shield size={20} className="mr-2 text-primary" />
              <h3 className="text-xl font-medium">Politique de confidentialité</h3>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Collecte de données</AccordionTrigger>
                <AccordionContent>
                  Nous collectons uniquement les informations nécessaires pour traiter vos commandes 
                  et améliorer votre expérience. Ces données incluent votre nom, adresse email et 
                  détails de paiement.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Utilisation des données</AccordionTrigger>
                <AccordionContent>
                  Vos données sont utilisées pour traiter vos commandes, gérer votre compte et vous 
                  informer des offres spéciales si vous avez consenti à recevoir nos communications.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Cookies et technologies similaires</AccordionTrigger>
                <AccordionContent>
                  Notre site utilise des cookies pour améliorer votre expérience de navigation et 
                  analyser le trafic. Vous pouvez désactiver les cookies dans les paramètres de votre 
                  navigateur.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Vos droits</AccordionTrigger>
                <AccordionContent>
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, 
                  d'effacement et de limitation du traitement de vos données. Contactez-nous pour 
                  exercer ces droits.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="bg-card rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FileText size={20} className="mr-2 text-primary" />
              <h3 className="text-xl font-medium">Conditions générales de vente</h3>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Services proposés</AccordionTrigger>
                <AccordionContent>
                  Nos services consistent en l'augmentation de l'engagement sur les réseaux sociaux. 
                  Nous proposons des followers, likes, commentaires et autres interactions pour 
                  diverses plateformes.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Commandes et paiements</AccordionTrigger>
                <AccordionContent>
                  Les prix affichés sont en euros, TTC. Le paiement est exigible immédiatement à la 
                  commande et peut être effectué par carte bancaire ou autres moyens proposés.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Livraison et délais</AccordionTrigger>
                <AccordionContent>
                  La livraison des services commence généralement dans les 24 heures suivant la 
                  validation du paiement. Les délais peuvent varier en fonction des services commandés.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Garanties et remboursements</AccordionTrigger>
                <AccordionContent>
                  Si nous ne parvenons pas à fournir le service commandé, nous proposons soit un 
                  remplacement, soit un remboursement. Les demandes doivent être effectuées dans les 
                  7 jours suivant la livraison.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Responsabilité</AccordionTrigger>
                <AccordionContent>
                  Nous ne sommes pas responsables des actions prises par les plateformes de réseaux 
                  sociaux concernant votre compte. L'utilisation de nos services est à vos propres 
                  risques.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        <Alert className="max-w-3xl mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            L'utilisation de services d'augmentation d'engagement sur les réseaux sociaux peut 
            contrevenir aux conditions d'utilisation de certaines plateformes. Nous vous recommandons 
            de consulter les termes de service de chaque plateforme avant d'utiliser nos services.
          </AlertDescription>
        </Alert>
      </div>
    </motion.div>
  );
};

export default PrivacyTermsSection;
