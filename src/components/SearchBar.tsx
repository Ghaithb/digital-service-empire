
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
    // Search logic - improved to make filtering more accurate
    if (query.trim().length > 1) {
      const allServices = getAllServices();
      // Enhanced filtering logic
      const filtered = allServices.filter(service => 
        service.title.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase()) ||
        service.platform.toLowerCase().includes(query.toLowerCase()) ||
        service.category.toLowerCase().includes(query.toLowerCase()) ||
        // Also check variants if they exist
        (service.variants && service.variants.some(variant => 
          variant.title.toLowerCase().includes(query.toLowerCase()) ||
          (variant.description && variant.description.toLowerCase().includes(query.toLowerCase())) ||
          (variant.type && variant.type.toLowerCase().includes(query.toLowerCase()))
        ))
      );
      
      setResults(filtered.map(service => ({
        id: service.id,
        title: service.title,
        platform: service.platform,
        icon: service.icon
      })));
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
                            result.platform === "snapchat" ? "#FFFC00" : "#0077B5"
                        }}
                      >
                        <result.icon size={16} className="text-white" />
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
