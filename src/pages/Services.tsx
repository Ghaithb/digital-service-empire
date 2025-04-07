
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  serviceTypes,
  Service,
  ServiceCategory, 
  SocialPlatform,
  ServiceType
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
  const navigate = useNavigate();
  const location = useLocation();
  const { type, value } = useParams<{ type?: string; value?: string }>();
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "all">("all");
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | "all">("all");
  const [selectedType, setSelectedType] = useState<ServiceType | "all">("all");
  const [sortBy, setSortBy] = useState("popular");
  const [activeTab, setActiveTab] = useState("all");
  
  // Handle route params for filtering
  useEffect(() => {
    console.log("Route params changed:", { type, value });
    
    if (type === "category" && value) {
      // When category is selected from URL, reset other filters
      setSelectedCategory(value as ServiceCategory);
      setSelectedPlatform("all");
      setSelectedType("all");
      setActiveTab("category");
      console.log("Setting category from URL param:", value);
    } else if (type === "platform" && value) {
      // When platform is selected from URL, reset other filters
      setSelectedPlatform(value as SocialPlatform);
      setSelectedCategory("all");
      setSelectedType("all");
      setActiveTab("platform");
      console.log("Setting platform from URL param:", value);
    } else if (type === "type" && value) {
      // When type is selected from URL, reset other filters
      setSelectedType(value as ServiceType);
      setSelectedCategory("all");
      setSelectedPlatform("all");
      setActiveTab("type");
      console.log("Setting type from URL param:", value);
    } else {
      // Only reset if there are no query params
      if (!location.search) {
        setActiveTab("all");
        setSelectedCategory("all");
        setSelectedPlatform("all");
        setSelectedType("all");
        console.log("Resetting all filters (no params)");
      }
    }
  }, [type, value, location]);
  
  // Apply filters
  useEffect(() => {
    console.log("Filtering with:", { 
      category: selectedCategory, 
      platform: selectedPlatform, 
      type: selectedType,
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
          variant.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        return serviceMatch || variantMatch;
      });
    }
    
    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(service => service.category === selectedCategory);
      console.log(`After category filter (${selectedCategory}):`, result.length);
    }
    
    // Platform filter
    if (selectedPlatform !== "all") {
      result = result.filter(service => service.platform === selectedPlatform);
      console.log(`After platform filter (${selectedPlatform}):`, result.length);
    }
    
    // Type filter - Check variants for the selected type
    if (selectedType !== "all") {
      result = result.filter(service => {
        // Check if service has variants and any of them match the selected type
        if (service.variants && service.variants.length > 0) {
          return service.variants.some(variant => variant.type === selectedType);
        }
        // Services without variants don't match any type filter
        return false;
      });
      console.log(`After type filter (${selectedType}):`, result.length);
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
  }, [searchTerm, selectedCategory, selectedPlatform, selectedType, sortBy]);
  
  // Scroll to top when filters change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type, value]);
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedPlatform("all");
    setSelectedType("all");
    setSortBy("popular");
    // Also navigate to base services URL to clear URL params
    navigate("/services");
  };
  
  const updateFilters = (category: ServiceCategory | "all", platform: SocialPlatform | "all", type: ServiceType | "all") => {
    console.log("Updating filters:", { category, platform, type });
    
    // Update URL based on filters
    if (category !== "all" && platform === "all" && type === "all") {
      navigate(`/services/category/${category}`);
    } else if (category === "all" && platform !== "all" && type === "all") {
      navigate(`/services/platform/${platform}`);
    } else if (category === "all" && platform === "all" && type !== "all") {
      navigate(`/services/type/${type}`);
    } else if (category !== "all" && platform !== "all" && type === "all") {
      // Add support for combined filters (category + platform)
      navigate(`/services?category=${category}&platform=${platform}`);
    } else if (category !== "all" && platform === "all" && type !== "all") {
      // Add support for combined filters (category + type)
      navigate(`/services?category=${category}&type=${type}`);
    } else if (category === "all" && platform !== "all" && type !== "all") {
      // Add support for combined filters (platform + type)
      navigate(`/services?platform=${platform}&type=${type}`);
    } else if (category !== "all" && platform !== "all" && type !== "all") {
      // Add support for all three filters
      navigate(`/services?category=${category}&platform=${platform}&type=${type}`);
    } else {
      // For no filters, use the base URL
      navigate("/services");
    }
    
    // Set the selected filters
    setSelectedCategory(category);
    setSelectedPlatform(platform);
    setSelectedType(type);
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === "all") {
      clearFilters();
    }
  };
  
  // Parse query parameters for combined filters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get("category") as ServiceCategory | null;
    const platformParam = searchParams.get("platform") as SocialPlatform | null;
    const typeParam = searchParams.get("type") as ServiceType | null;
    
    console.log("URL search params:", { categoryParam, platformParam, typeParam });
    
    // Only update state if parameters exist and are different from current state
    if (categoryParam && categoryParam !== selectedCategory) {
      console.log("Setting category from URL search:", categoryParam);
      setSelectedCategory(categoryParam);
    }
    
    if (platformParam && platformParam !== selectedPlatform) {
      console.log("Setting platform from URL search:", platformParam);
      setSelectedPlatform(platformParam);
    }
    
    if (typeParam && typeParam !== selectedType) {
      console.log("Setting type from URL search:", typeParam);
      setSelectedType(typeParam);
    }
    
    // Set active tab based on which filters are present
    if (categoryParam && !platformParam && !typeParam) {
      setActiveTab("category");
    } else if (!categoryParam && platformParam && !typeParam) {
      setActiveTab("platform");
    } else if (!categoryParam && !platformParam && typeParam) {
      setActiveTab("type");
    } else if (categoryParam || platformParam || typeParam) {
      // If multiple filters are active, show the first one in hierarchy
      if (categoryParam) setActiveTab("category");
      else if (platformParam) setActiveTab("platform");
      else if (typeParam) setActiveTab("type");
    }
  }, [location.search]);
  
  const hasActiveFilters = searchTerm || selectedCategory !== "all" || selectedPlatform !== "all" || selectedType !== "all";
  
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
            
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="category">Catégories</TabsTrigger>
                <TabsTrigger value="platform">Plateformes</TabsTrigger>
                <TabsTrigger value="type">Types</TabsTrigger>
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
                    onClick={() => updateFilters("all", selectedPlatform, selectedType)}
                    className="mb-2"
                  >
                    Toutes
                  </Button>
                  
                  {serviceCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFilters(category.id as ServiceCategory, selectedPlatform, selectedType)}
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
                    onClick={() => updateFilters(selectedCategory, "all", selectedType)}
                    className="mb-2"
                  >
                    Toutes
                  </Button>
                  
                  {socialPlatforms.map((platform) => (
                    <Button
                      key={platform.id}
                      variant={selectedPlatform === platform.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFilters(selectedCategory, platform.id as SocialPlatform, selectedType)}
                      className="mb-2"
                    >
                      <platform.icon size={16} className="mr-2" style={{ color: platform.color }} />
                      {platform.name}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="type" className="mt-0">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedType === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateFilters(selectedCategory, selectedPlatform, "all")}
                    className="mb-2"
                  >
                    Tous
                  </Button>
                  
                  {serviceTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={selectedType === type.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFilters(selectedCategory, selectedPlatform, type.id as ServiceType)}
                      className="mb-2"
                    >
                      <type.icon size={16} className="mr-2" />
                      {type.name}
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
