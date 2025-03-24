
import { motion } from "framer-motion";
import { DollarSign, Clock, ShieldCheck, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const KeyAdvantages = () => {
  const advantages = [
    {
      title: "Monétisation !",
      icon: DollarSign,
      description: "Grâce à votre croissance, monétisez vos contenus via les programmes de monétisation ou avec des partenariats comme les influenceurs."
    },
    {
      title: "Gagnez Du Temps !",
      icon: Clock,
      description: "Construire une communauté est très difficile, avec nos services, prenez de l'avance et surmontez les obstacles sur votre route."
    },
    {
      title: "100% Sécurisé",
      icon: ShieldCheck,
      description: "Notre fonctionnement basé sur l'IA respecte les règles des différents réseaux et il n'y a aucun risque de bannissement des plateformes."
    },
    {
      title: "Confidentialité Totale",
      icon: Lock,
      description: "Notre fonctionnement basé sur l'IA respecte les règles des différents réseaux et il n'y a aucun risque de bannissement des plateformes."
    }
  ];

  const guarantees = [
    "Garantie anti-perte",
    "100% Réels et Actifs",
    "Pas d'abonnement caché",
    "Livraison rapide garantie !",
    "Plus de 30 000 clients satisfaits",
    "Service client 7/7 J en temps réel"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Grâce à nos services :
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez tous les avantages qui vous permettront de booster votre présence sur les réseaux sociaux
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col p-6 rounded-xl bg-white shadow-sm"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10">
                    <advantage.icon size={24} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  {advantage.title}
                </h3>
                <p className="text-sm text-muted-foreground">{advantage.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <div className="relative">
              <img
                src="public/lovable-uploads/c6f0bf29-5184-4483-8fef-e3227449f817.png"
                alt="Social Media Users"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent rounded-xl"></div>
            </div>

            <div className="mt-8 space-y-3">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center">
                  <Check size={18} className="text-primary mr-2 flex-shrink-0" />
                  <span className="text-sm font-medium">{guarantee}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button size="lg" asChild>
                <Link to="/services">
                  Profiter De Nos Services
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default KeyAdvantages;
