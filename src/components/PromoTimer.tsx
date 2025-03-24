
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PromoTimer = () => {
  const [days, setDays] = useState(5);
  const [hours, setHours] = useState(18);
  const [minutes, setMinutes] = useState(18);
  const [seconds, setSeconds] = useState(14);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else if (days > 0) {
        setDays(days - 1);
        setHours(23);
        setMinutes(59);
        setSeconds(59);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [days, hours, minutes, seconds]);

  return (
    <section className="py-6 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="container px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-3">
            <span className="inline-block bg-primary/90 text-white px-4 py-1 rounded-full text-sm font-medium">
              Offre Spéciale Printemps
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            -20% sur tous nos services avec le code: <span className="text-primary">SPRING20</span>
          </h2>
          
          <p className="text-muted-foreground mb-6">
            Profitez de notre offre exceptionnelle valable sur toutes les plateformes
          </p>
          
          <div className="mb-6">
            <p className="text-sm uppercase tracking-wider font-medium text-muted-foreground mb-3">
              SE TERMINE DANS :
            </p>
            <div className="flex justify-center">
              <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto">
                <div className="flex flex-col items-center">
                  <div className="bg-background w-14 h-14 md:w-20 md:h-20 rounded-md flex items-center justify-center text-2xl md:text-4xl font-bold shadow-sm">
                    {String(days).padStart(2, '0')}
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground">JOURS</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-background w-14 h-14 md:w-20 md:h-20 rounded-md flex items-center justify-center text-2xl md:text-4xl font-bold shadow-sm">
                    {String(hours).padStart(2, '0')}
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground">HEURES</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-background w-14 h-14 md:w-20 md:h-20 rounded-md flex items-center justify-center text-2xl md:text-4xl font-bold shadow-sm">
                    {String(minutes).padStart(2, '0')}
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground">MINUTES</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-background w-14 h-14 md:w-20 md:h-20 rounded-md flex items-center justify-center text-2xl md:text-4xl font-bold shadow-sm">
                    {String(seconds).padStart(2, '0')}
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground">SECONDES</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/services">
              ACHETEZ MAINTENANT <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoTimer;
