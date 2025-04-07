
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { 
  services,
  Service
} from "@/lib/data";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Services = () => {
  const location = useLocation();
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  
  // Handle search query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");
    
    if (searchQuery) {
      console.log("Search query from URL:", searchQuery);
      setSearchTerm(searchQuery);
    }
  }, [location.search]);
  
  // Apply filters
  useEffect(() => {
    console.log("Filtering with:", { 
      searchTerm: searchTerm
    });
    
    let result = [...services];
    
    // Text search
    if (searchTerm) {
      result = result.filter(service => {
        const serviceMatch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Also check variants for matches
        const variantMatch = service.variants?.some(variant => 
          variant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          variant.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        return serviceMatch || variantMatch;
      });
      console.log(`After search filter (${searchTerm}):`, result.length);
    }
    
    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }
    
    console.log("Final filtered services:", result.length);
    setFilteredServices(result);
  }, [searchTerm, sortBy]);
  
  // Scroll to top when filters change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchTerm]);
  
  const clearSearch = () => {
    setSearchTerm("");
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nos Services
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre gamme complète de services pour améliorer votre présence sur les réseaux sociaux
            </p>
          </div>
          
          {/* Search and Sort */}
          <div className="mb-10 p-6 rounded-xl bg-secondary">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Rechercher un service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-0 top-0 h-full"
                    onClick={clearSearch}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
              
              <div className="flex-shrink-0">
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Popularité</SelectItem>
                    <SelectItem value="price-low">Prix: Bas à Élevé</SelectItem>
                    <SelectItem value="price-high">Prix: Élevé à Bas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-2 text-sm text-muted-foreground">
              Affichage de {filteredServices.length} services sur {services.length}
            </div>
          </div>
          
          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredServices.map((service, index) => (
                <ServiceCard 
                  key={service.id} 
                  service={service}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">Aucun service trouvé</h3>
              <p className="text-muted-foreground mb-6">
                Essayez une recherche différente.
              </p>
              <Button onClick={clearSearch}>
                Réinitialiser la recherche
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Services;
