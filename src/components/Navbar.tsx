
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { socialPlatforms, serviceCategories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Track scrolling to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: "À propos", path: "/about" }
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-apple",
      isScrolled 
        ? "py-3 backdrop-blur-md bg-background/80 shadow-sm" 
        : "py-5 bg-transparent"
    )}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-display font-bold flex items-center"
        >
          <span className="bg-primary text-white rounded-md p-1 mr-1">D</span>
          <span>DigiBoost</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative font-medium transition-colors hover:text-primary",
                location.pathname === link.path 
                  ? "text-primary" 
                  : "text-foreground/80"
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>
        
        {/* Cart and Mobile Menu Buttons */}
        <div className="flex items-center space-x-3">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          
          <Button className="hidden md:flex" asChild>
            <Link to="/services">
              Découvrir
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b overflow-hidden"
          >
            <div className="container px-4 py-5 mx-auto flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-lg py-2 px-4 rounded-md transition-colors",
                    location.pathname === link.path 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-secondary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2 px-4">Catégories</p>
                <div className="grid grid-cols-2 gap-2">
                  {serviceCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/services/category/${category.id}`}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary"
                    >
                      <category.icon size={16} />
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2 px-4">Plateformes</p>
                <div className="grid grid-cols-2 gap-2">
                  {socialPlatforms.map((platform) => (
                    <Link
                      key={platform.id}
                      to={`/services/platform/${platform.id}`}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary"
                    >
                      <platform.icon size={16} style={{ color: platform.color }} />
                      <span>{platform.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
