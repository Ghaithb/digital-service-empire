
import { Link } from "react-router-dom";
import { socialPlatforms, serviceCategories } from "@/lib/data";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background pt-16 pb-6 border-t">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-display font-bold flex items-center mb-4">
              <span className="bg-primary text-white rounded-md p-1 mr-1">D</span>
              <span>DigiBoost</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Solutions de croissance pour les médias sociaux qui boostent votre présence en ligne.
            </p>
            <div className="flex space-x-4">
              {/* Social icons */}
              {socialPlatforms.slice(0, 5).map((platform) => (
                <a
                  key={platform.id}
                  href={`#${platform.id}`}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label={platform.name}
                >
                  <platform.icon size={16} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-3">
              {[
                { name: "Accueil", path: "/" },
                { name: "Services", path: "/services" },
                { name: "Notre parcours", path: "/about" },
                { name: "Avis clients", path: "/testimonials" },
                { name: "FAQ", path: "/faq" },
                { name: "Blog", path: "/blog" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {serviceCategories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/services/category/${category.id}`}
                    className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {[
                { name: "Mon compte", path: "/dashboard" },
                { name: "Suivre ma commande", path: "/order-tracking" },
                { name: "Fidélité & Parrainage", path: "/loyalty" },
                { name: "FAQ", path: "/faq" },
                { name: "Politique de confidentialité", path: "/legal" },
                { name: "Conditions générales", path: "/legal" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {currentYear} DigiBoost. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/legal"
                className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link
                to="/legal"
                className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
              >
                Conditions générales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
