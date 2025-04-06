
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { socialPlatforms, serviceCategories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCart } from "@/lib/cart";
import SearchBar from "@/components/SearchBar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
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
  
  // Update cart count whenever location changes or component mounts
  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartItemCount(count);
    };
    
    // Initial count
    updateCartCount();
    
    // Setup interval to check for changes
    const intervalId = setInterval(updateCartCount, 1000);
    
    return () => clearInterval(intervalId);
  }, [location]);
  
  // Close menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services", hasDropdown: true },
    { name: "Parcours & Avis", path: "/about", hasDropdown: true }
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
        
        {/* Desktop Navigation with Dropdowns */}
        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            link.hasDropdown ? (
              <NavigationMenu key={link.path}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(
                      "font-medium transition-colors hover:text-primary",
                      location.pathname === link.path 
                        ? "text-primary" 
                        : "text-foreground/80"
                    )}>
                      {link.name}
                    </NavigationMenuTrigger>
                    
                    {link.name === "Services" && (
                      <NavigationMenuContent className="bg-background/95 backdrop-blur-md p-4 shadow-lg rounded-md">
                        <div className="grid grid-cols-2 gap-3 w-[400px]">
                          <div>
                            <h4 className="font-medium mb-2 text-sm">Réseaux sociaux</h4>
                            <ul className="space-y-1">
                              {socialPlatforms.map((platform) => (
                                <li key={platform.id}>
                                  <Link
                                    to={`/services/platform/${platform.id}`}
                                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary"
                                  >
                                    <platform.icon size={16} style={{ color: platform.color }} />
                                    <span>{platform.name}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2 text-sm">Catégories</h4>
                            <ul className="space-y-1">
                              {serviceCategories.map((category) => (
                                <li key={category.id}>
                                  <Link
                                    to={`/services/category/${category.id}`}
                                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary"
                                  >
                                    <category.icon size={16} />
                                    <span>{category.name}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    )}
                    
                    {link.name === "Parcours & Avis" && (
                      <NavigationMenuContent className="bg-background/95 backdrop-blur-md p-4 shadow-lg rounded-md">
                        <ul className="space-y-1 w-[200px]">
                          <li>
                            <Link
                              to="/about"
                              className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary"
                            >
                              <span>Notre Parcours</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/testimonials"
                              className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary"
                            >
                              <span>Avis client</span>
                            </Link>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    )}
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-3 py-2 relative font-medium transition-colors hover:text-primary",
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
            )
          ))}
        </div>
        
        {/* Cart, Search and Mobile Menu Buttons */}
        <div className="flex items-center space-x-3">
          <SearchBar />
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
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
                link.hasDropdown ? (
                  <DropdownMenu key={link.path}>
                    <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 px-4 rounded-md hover:bg-secondary">
                      <span>{link.name}</span>
                      <ChevronDown size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      {link.name === "Services" && (
                        <div className="p-2">
                          <div className="mb-4">
                            <p className="text-sm text-muted-foreground mb-2 px-2">Réseaux sociaux</p>
                            <div className="grid grid-cols-2 gap-2">
                              {socialPlatforms.map((platform) => (
                                <DropdownMenuItem key={platform.id} asChild>
                                  <Link
                                    to={`/services/platform/${platform.id}`}
                                    className="flex items-center space-x-2"
                                  >
                                    <platform.icon size={16} style={{ color: platform.color }} />
                                    <span>{platform.name}</span>
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-2 px-2">Catégories</p>
                            <div className="grid grid-cols-2 gap-2">
                              {serviceCategories.map((category) => (
                                <DropdownMenuItem key={category.id} asChild>
                                  <Link
                                    to={`/services/category/${category.id}`}
                                    className="flex items-center space-x-2"
                                  >
                                    <category.icon size={16} />
                                    <span>{category.name}</span>
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {link.name === "Parcours & Avis" && (
                        <div className="p-2">
                          <DropdownMenuItem asChild>
                            <Link to="/about">Notre Parcours</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/testimonials">Avis client</Link>
                          </DropdownMenuItem>
                        </div>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
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
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
