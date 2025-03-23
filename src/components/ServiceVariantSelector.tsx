
import React from "react";
import { Service, ServiceVariant, getServiceTypeInfo } from "@/lib/data";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

interface ServiceVariantSelectorProps {
  service: Service;
  selectedVariant: ServiceVariant | null;
  onSelectVariant: (variant: ServiceVariant) => void;
}

const ServiceVariantSelector = ({
  service,
  selectedVariant,
  onSelectVariant,
}: ServiceVariantSelectorProps) => {
  if (!service.variants || service.variants.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-4">Options disponibles</h3>
      <RadioGroup
        value={selectedVariant?.id || ""}
        onValueChange={(value) => {
          const variant = service.variants?.find((v) => v.id === value);
          if (variant) {
            onSelectVariant(variant);
          }
        }}
        className="space-y-3"
      >
        {service.variants.map((variant) => {
          const typeInfo = getServiceTypeInfo(variant.type);
          
          return (
            <div
              key={variant.id}
              className={`relative flex items-start p-4 rounded-lg border ${
                selectedVariant?.id === variant.id 
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              } transition-all cursor-pointer`}
              onClick={() => onSelectVariant(variant)}
            >
              <RadioGroupItem 
                value={variant.id} 
                id={variant.id} 
                className="absolute right-4 top-4"
              />
              
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <Label 
                    htmlFor={variant.id} 
                    className="text-base font-medium cursor-pointer"
                  >
                    {variant.title}
                  </Label>
                  
                  {variant.popular && (
                    <span className="ml-2 bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                      Populaire
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {variant.description}
                </p>
                
                {typeInfo && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <typeInfo.icon size={12} className="mr-1" />
                    <span>{typeInfo.name}</span>
                  </div>
                )}
                
                <div className="mt-2 font-medium">
                  {variant.price.toFixed(2)} €
                </div>
              </div>
              
              {selectedVariant?.id === variant.id && (
                <div className="absolute top-4 right-4 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check size={12} />
                </div>
              )}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default ServiceVariantSelector;
