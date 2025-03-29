
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";

// Données FAQ
const faqData = [
  {
    category: "Commandes",
    questions: [
      {
        question: "Combien de temps faut-il pour livrer ma commande ?",
        answer: "Le délai de livraison dépend du service que vous avez commandé. La plupart de nos services sont livrés dans un délai de 24 à 72 heures. Vous pouvez consulter le délai de livraison estimé sur la page de chaque service avant de passer votre commande."
      },
      {
        question: "Comment puis-je suivre ma commande ?",
        answer: "Vous pouvez suivre votre commande en vous rendant sur la page 'Suivre ma commande' et en saisissant votre numéro de commande. Vous recevrez également des mises à jour par email sur l'état de votre commande."
      },
      {
        question: "Puis-je annuler ma commande ?",
        answer: "Si votre commande n'a pas encore commencé à être traitée, vous pouvez l'annuler en contactant notre service client. Cependant, une fois que le traitement a commencé, il n'est généralement pas possible d'annuler la commande."
      }
    ]
  },
  {
    category: "Services",
    questions: [
      {
        question: "Vos services sont-ils sûrs pour mon compte ?",
        answer: "Oui, tous nos services sont conçus pour être sûrs et respecter les directives des plateformes de médias sociaux. Nous utilisons des méthodes naturelles et organiques qui ne mettent pas votre compte en danger."
      },
      {
        question: "Les abonnés/likes que je reçois sont-ils réels ?",
        answer: "Oui, nos services fournissent des interactions réelles provenant de comptes authentiques. Nous ne recourons jamais à des bots ou à des comptes automatisés qui pourraient nuire à votre présence en ligne."
      },
      {
        question: "Avez-vous des garanties sur vos services ?",
        answer: "Oui, nous offrons une garantie de remplacement sur la plupart de nos services. Si vous constatez une baisse dans les 30 jours suivant la livraison, nous compenserons gratuitement."
      }
    ]
  },
  {
    category: "Paiement",
    questions: [
      {
        question: "Quels modes de paiement acceptez-vous ?",
        answer: "Nous acceptons les paiements par carte de crédit/débit, PayPal, et différentes options de portefeuille électronique. Toutes les transactions sont sécurisées et cryptées."
      },
      {
        question: "Ma carte bancaire est-elle en sécurité ?",
        answer: "Absolument. Nous utilisons des processeurs de paiement certifiés et sécurisés comme Stripe. Nous ne stockons pas les informations de votre carte sur nos serveurs."
      },
      {
        question: "Proposez-vous des remboursements ?",
        answer: "Si nous ne parvenons pas à livrer votre commande, vous aurez droit à un remboursement complet. Pour plus de détails, veuillez consulter notre politique de remboursement."
      }
    ]
  },
  {
    category: "Compte",
    questions: [
      {
        question: "Comment créer un compte ?",
        answer: "Vous pouvez créer un compte en cliquant sur 'Mon compte' dans le menu en haut, puis en choisissant l'option 'Créer un compte'. Remplissez le formulaire avec vos informations et vous êtes prêt à commencer."
      },
      {
        question: "J'ai oublié mon mot de passe, que faire ?",
        answer: "Sur la page de connexion, cliquez sur 'Mot de passe oublié' et suivez les instructions pour réinitialiser votre mot de passe. Un lien de réinitialisation sera envoyé à votre adresse email."
      },
      {
        question: "Quels sont les avantages d'avoir un compte ?",
        answer: "Avoir un compte vous permet de suivre vos commandes, d'accéder à votre historique d'achats, de bénéficier de promotions exclusives et de participer à notre programme de fidélité."
      }
    ]
  },
  {
    category: "Autre",
    questions: [
      {
        question: "Comment puis-je contacter le service client ?",
        answer: "Vous pouvez nous contacter via notre formulaire de contact sur la page 'Contact', par email à support@digiboost.com, ou via le chat en direct disponible sur notre site."
      },
      {
        question: "Proposez-vous des services personnalisés ?",
        answer: "Oui, nous proposons des solutions sur mesure pour les entreprises et les influenceurs. Contactez-nous pour discuter de vos besoins spécifiques et nous vous proposerons une offre adaptée."
      },
      {
        question: "Quels sont vos horaires de service client ?",
        answer: "Notre service client est disponible du lundi au vendredi, de 9h à 18h (heure de Paris). Nous nous efforçons de répondre à toutes les demandes dans un délai de 24 heures ouvrables."
      }
    ]
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFAQ, setFilteredFAQ] = useState(faqData);
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Filter FAQ based on search query
    if (searchQuery.trim() === "") {
      setFilteredFAQ(faqData);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = faqData.map(category => {
        const filteredQuestions = category.questions.filter(
          item => 
            item.question.toLowerCase().includes(query) || 
            item.answer.toLowerCase().includes(query)
        );
        
        return {
          ...category,
          questions: filteredQuestions
        };
      }).filter(category => category.questions.length > 0);
      
      setFilteredFAQ(filtered);
    }
  }, [searchQuery]);
  
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
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Questions fréquemment posées
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Trouvez des réponses aux questions les plus courantes sur nos services.
            </p>
            
            {/* Search Bar */}
            <div className="relative mb-12">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                placeholder="Rechercher dans les questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {filteredFAQ.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-lg text-muted-foreground">
                  Aucun résultat trouvé pour "{searchQuery}". Essayez une autre recherche.
                </p>
              </div>
            ) : (
              filteredFAQ.map((category, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-xl font-medium mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="mb-6">
                    {category.questions.map((item, idx) => (
                      <AccordionItem key={idx} value={`item-${index}-${idx}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            )}
            
            <div className="mt-12 p-6 bg-primary/5 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Vous n'avez pas trouvé de réponse à votre question ?</h3>
              <p className="text-muted-foreground mb-4">
                Notre équipe de support est disponible pour vous aider avec toutes vos questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <Link to="/contact">Contactez-nous</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:support@digiboost.com">support@digiboost.com</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatWidget />
    </motion.div>
  );
};

export default FAQ;
