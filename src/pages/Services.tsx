
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { 
  services, 
  getServicesByCategory, 
  getServicesByPlatform, 
  serviceCategories, 
  socialPlatforms,
  Service,
  ServiceCategory, 
  SocialPlatform
} from "@/lib/data";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Services = () => {
  const { type, value } = useParams<{ type?: string; value?: string }>();
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "all">("all");
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | "all">("all");
  const [sortBy, setSortBy] = useState("popular");
  const [activeTab, setActiveTab] = useState("all");
  
  // Handle route params for filtering
  useEffect(() => {
    if (type === "category" && value) {
      setSelectedCategory(value as ServiceCategory);
      setActiveTab("category");
    } else if (type === "platform" && value) {
      setSelectedPlatform(value as SocialPlatform);
      setActiveTab("platform");
    } else {
      setActiveTab("all");
    }
  }, [type, value]);
  
  // Apply filters
  useEffect(() => {
    let result = [...services];
    
    // Text search
    if (searchTerm) {
      result = result.filter(service => 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(service => service.category === selectedCategory);
    }
    
    // Platform filter
    if (selectedPlatform !== "all") {
      result = result.filter(service => service.platform === selectedPlatform);
    }
    
    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }
    
    setFilteredServices(result);
  }, [searchTerm, selectedCategory, selectedPlatform, sortBy]);
  
  // Scroll to top when filters change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type, value]);
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedPlatform("all");
    setSortBy("popular");
  };
  
  const hasActiveFilters = searchTerm || selectedCategory !== "all" || selectedPlatform !== "all";
  
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
          
          {/* Filters and Search */}
          <div className="mb-10 p-6 rounded-xl bg-secondary">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Rechercher un service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
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
                
                {hasActiveFilters && (
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="flex items-center"
                  >
                    <X size={16} className="mr-2" /> Réinitialiser
                  </Button>
                )}
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="all">Tous les services</TabsTrigger>
                <TabsTrigger value="category">Catégories</TabsTrigger>
                <TabsTrigger value="platform">Plateformes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <p className="text-muted-foreground text-sm">
                  Affichage de {filteredServices.length} services sur {services.length}
                </p>
              </TabsContent>
              
              <TabsContent value="category" className="mt-0">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                    className="mb-2"
                  >
                    Toutes
                  </Button>
                  
                  {serviceCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id as ServiceCategory)}
                      className="mb-2"
                    >
                      <category.icon size={16} className="mr-2" />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="platform" className="mt-0">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedPlatform === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPlatform("all")}
                    className="mb-2"
                  >
                    Toutes
                  </Button>
                  
                  {socialPlatforms.map((platform) => (
                    <Button
                      key={platform.id}
                      variant={selectedPlatform === platform.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPlatform(platform.id as SocialPlatform)}
                      className="mb-2"
                    >
                      <platform.icon size={16} className="mr-2" style={{ color: platform.color }} />
                      {platform.name}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
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
                Essayez de modifier vos filtres ou effectuez une recherche différente.
              </p>
              <Button onClick={clearFilters}>
                Réinitialiser les filtres
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
