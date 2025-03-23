
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialSection from "@/components/TestimonialSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageCircle, Users } from "lucide-react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero section */}
        <section className="py-12 md:py-20 bg-secondary">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  À propos de <span className="text-primary">DigiBoost</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Nous sommes une équipe passionnée qui aide les créateurs de contenu, entrepreneurs et entreprises à développer leur présence sur les réseaux sociaux avec des solutions efficaces et éthiques.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button asChild>
                    <Link to="/services">
                      Découvrir nos services <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="#contact">
                      Contactez-nous
                    </a>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10 aspect-video rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1552581234-26160f608093?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Notre équipe" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-xl -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Mission section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Notre mission
              </h2>
              <p className="text-lg text-muted-foreground">
                Nous croyons que chaque créateur de contenu mérite d'être vu et entendu. Notre mission est de fournir des services de qualité qui aident à atteindre le public cible de manière éthique et efficace.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Qualité",
                  description: "Nous ne compromettons jamais la qualité. Nos services sont conçus pour ressembler à une croissance organique naturelle.",
                  icon: Users,
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  title: "Transparence",
                  description: "Nous sommes transparents sur nos méthodes et nos résultats. Vous savez exactement ce que vous obtenez.",
                  icon: MessageCircle,
                  color: "bg-green-100 text-green-600",
                },
                {
                  title: "Support",
                  description: "Notre équipe est disponible pour vous guider et répondre à toutes vos questions à chaque étape.",
                  icon: Mail,
                  color: "bg-purple-100 text-purple-600",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1 
                  }}
                  className="p-6 rounded-xl bg-card hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center mb-4`}>
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ section */}
        <section className="py-16 bg-secondary">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
                Questions fréquentes
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    question: "Vos services sont-ils sûrs pour mon compte ?",
                    answer: "Oui, nous utilisons des méthodes conformes aux politiques des plateformes. Nous n'avons jamais eu de problème avec des comptes suspendus ou pénalisés suite à l'utilisation de nos services."
                  },
                  {
                    question: "Combien de temps faut-il pour voir les résultats ?",
                    answer: "Nos délais de livraison varient selon le service choisi, mais la plupart des commandes commencent à être livrées dans les 24 à 48 heures. Nous privilégions une livraison progressive pour maintenir un aspect naturel."
                  },
                  {
                    question: "Quelles méthodes de paiement acceptez-vous ?",
                    answer: "Nous acceptons les cartes de crédit/débit majeures, PayPal, et les virements bancaires. Toutes les transactions sont sécurisées avec un cryptage SSL."
                  },
                  {
                    question: "Proposez-vous une garantie de satisfaction ?",
                    answer: "Oui, nous offrons une garantie de satisfaction de 30 jours. Si vous n'êtes pas satisfait de nos services, nous vous offrirons un remplacement ou un remboursement."
                  },
                  {
                    question: "Avez-vous besoin de mon mot de passe ?",
                    answer: "Non, nous n'avons jamais besoin de vos identifiants de connexion pour fournir nos services. Nous vous demandons uniquement l'URL publique ou le nom d'utilisateur de votre compte."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-xl"
                  >
                    <h3 className="text-lg font-medium mb-3">{item.question}</h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact section */}
        <section id="contact" className="py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Contactez-nous
              </h2>
              <p className="text-muted-foreground mb-8">
                Des questions ? Notre équipe est là pour vous aider. N'hésitez pas à nous contacter.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="neo p-8 rounded-xl">
                <h3 className="text-xl font-medium mb-6">Envoyez-nous un message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Nom</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Votre email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">Sujet</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Sujet de votre message"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Votre message"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">
                    Envoyer le message
                  </Button>
                </form>
              </div>
              
              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-4">Nos coordonnées</h3>
                  <p className="text-muted-foreground mb-4">
                    N'hésitez pas à nous contacter directement si vous avez des questions ou des préoccupations.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Mail className="text-primary mt-1" size={18} />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:contact@digiboost.com" className="text-muted-foreground hover:text-primary">contact@digiboost.com</a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Heures de support</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Lundi - Vendredi: 9h00 - 18h00</p>
                    <p>Samedi: 10h00 - 15h00</p>
                    <p>Dimanche: Fermé</p>
                  </div>
                  <p className="mt-4 text-sm">
                    Temps de réponse moyen: moins de 24 heures
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <TestimonialSection />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default About;
