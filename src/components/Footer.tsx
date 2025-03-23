
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary pt-16 pb-8 mt-16">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-display font-bold flex items-center mb-4">
              <span className="bg-primary text-white rounded-md p-1 mr-1">D</span>
              <span>DigiBoost</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Votre partenaire pour augmenter votre présence digitale et booster votre visibilité sur les réseaux sociaux.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/category/followers" className="text-muted-foreground hover:text-primary transition-colors">Followers</Link>
              </li>
              <li>
                <Link to="/services/category/likes" className="text-muted-foreground hover:text-primary transition-colors">Likes</Link>
              </li>
              <li>
                <Link to="/services/category/comments" className="text-muted-foreground hover:text-primary transition-colors">Commentaires</Link>
              </li>
              <li>
                <Link to="/services/category/reviews" className="text-muted-foreground hover:text-primary transition-colors">Avis</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Plateformes</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/platform/instagram" className="text-muted-foreground hover:text-primary transition-colors">Instagram</Link>
              </li>
              <li>
                <Link to="/services/platform/facebook" className="text-muted-foreground hover:text-primary transition-colors">Facebook</Link>
              </li>
              <li>
                <Link to="/services/platform/twitter" className="text-muted-foreground hover:text-primary transition-colors">Twitter</Link>
              </li>
              <li>
                <Link to="/services/platform/youtube" className="text-muted-foreground hover:text-primary transition-colors">YouTube</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary" />
                <span className="text-muted-foreground">contact@digiboost.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary" />
                <span className="text-muted-foreground">+33 6 12 34 56 78</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
          <p>© {year} DigiBoost. Tous droits réservés.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
