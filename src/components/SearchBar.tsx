
import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getAllServices } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  id: string;
  title: string;
  platform: string;
  icon: any;
}

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus on input when search bar opens
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }

    // Add click outside listener
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    // Improved search that includes variants and handles edge cases better
    if (query.trim().length > 1) {
      const allServices = getAllServices();
      console.log(`Searching for "${query}" in ${allServices.length} services`);
      
      // Enhanced filtering logic with better matching
      const filtered = allServices.filter(service => {
        // Check in the service itself (case-insensitive)
        const serviceMatches = 
          service.title.toLowerCase().includes(query.toLowerCase()) ||
          service.description.toLowerCase().includes(query.toLowerCase()) ||
          (typeof service.platform === 'string' && service.platform.toLowerCase().includes(query.toLowerCase())) ||
          (typeof service.category === 'string' && service.category.toLowerCase().includes(query.toLowerCase()));
        
        if (serviceMatches) return true;

        // Check in variants if they exist (case-insensitive)
        if (service.variants && service.variants.length > 0) {
          return service.variants.some(variant => 
            variant.title.toLowerCase().includes(query.toLowerCase()) ||
            (variant.description && variant.description.toLowerCase().includes(query.toLowerCase())) ||
            (variant.type && variant.type.toLowerCase().includes(query.toLowerCase()))
          );
        }

        return false;
      });
      
      console.log(`Found ${filtered.length} matching services`);
      
      // Limit results to 10 for better UX
      const limitedResults = filtered.slice(0, 10).map(service => ({
        id: service.id,
        title: service.title,
        platform: service.platform,
        icon: service.icon
      }));
      
      setResults(limitedResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearchClick = () => {
    setIsOpen(true);
  };

  const handleResultClick = (id: string) => {
    navigate(`/service/${id}`);
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Close search on Escape key
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
    
    // Navigate to services page with search query on Enter if there are no specific results
    if (e.key === 'Enter' && query.trim().length > 1) {
      navigate(`/services?search=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <Button
        variant="ghost"
        size="icon"
        className="mr-1"
        onClick={handleSearchClick}
        aria-label="Rechercher"
      >
        <Search size={20} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-12 right-0 md:right-auto md:left-0 w-[300px] md:w-[400px] bg-background/95 backdrop-blur-md border rounded-lg shadow-lg z-50"
          >
            <div className="p-3">
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Rechercher des services..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pr-8"
                />
                {query && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-0 top-0 h-full"
                    onClick={handleClear}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>

              {results.length > 0 && (
                <div className="mt-2 max-h-[300px] overflow-y-auto">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center p-2 hover:bg-muted rounded cursor-pointer"
                      onClick={() => handleResultClick(result.id)}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                        style={{
                          backgroundColor:
                            result.platform === "instagram" ? "#E1306C" :
                            result.platform === "facebook" ? "#1877F2" :
                            result.platform === "twitter" ? "#1DA1F2" :
                            result.platform === "youtube" ? "#FF0000" :
                            result.platform === "tiktok" ? "#000000" :
                            result.platform === "snapchat" ? "#FFFC00" : 
                            result.platform === "spotify" ? "#1DB954" : "#0077B5"
                        }}
                      >
                        {result.icon && <result.icon size={16} className="text-white" />}
                      </div>
                      <span>{result.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {query && query.length > 1 && results.length === 0 && (
                <div className="mt-2 p-3 text-center text-muted-foreground">
                  Aucun résultat trouvé pour "{query}"
                </div>
              )}

              {query && query.length === 1 && (
                <div className="mt-2 p-3 text-center text-muted-foreground">
                  Veuillez entrer au moins 2 caractères
                </div>
              )}
              
              {query && query.length > 1 && (
                <div className="mt-2 border-t pt-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-primary"
                    onClick={() => {
                      navigate(`/services?search=${encodeURIComponent(query)}`);
                      setIsOpen(false);
                    }}
                  >
                    <Search size={16} className="mr-2" />
                    Voir tous les résultats pour "{query}"
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
