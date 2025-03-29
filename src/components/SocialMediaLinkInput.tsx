
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link } from "lucide-react";

interface SocialMediaLinkInputProps {
  value: string;
  onChange: (value: string) => void;
  serviceType?: string;
  form?: any;
  index?: number;
}

const SocialMediaLinkInput = ({ value, onChange, serviceType, form, index }: SocialMediaLinkInputProps) => {
  const getPlaceholderText = () => {
    const action = serviceType === 'followers' ? 'obtenir des abonnés' : 
            serviceType === 'likes' ? 'obtenir des likes' : 
            serviceType === 'views' ? 'obtenir des vues' : 
            'appliquer le service';
    
    if (index !== undefined) {
      return `Entrez le lien du compte ${index + 1} où vous souhaitez ${action}`;
    }
    return `Entrez le lien où vous souhaitez ${action}`;
  };

  if (form) {
    return (
      <FormField
        control={form.control}
        name="socialMediaLink"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Lien du profil/post {serviceType || "social"}</FormLabel>
            <FormControl>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  className="pl-10"
                  placeholder={getPlaceholderText()}
                  {...field}
                />
              </div>
            </FormControl>
            <FormDescription>
              Par exemple: https://www.instagram.com/votre_profil ou https://www.facebook.com/votre_post
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <div className="mb-4">
      <Label htmlFor={`socialMediaLink${index || ''}`} className="block mb-2">
        Lien du profil/post {serviceType || "social"} {index !== undefined ? `#${index + 1}` : ''}
      </Label>
      <div className="relative">
        <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          id={`socialMediaLink${index || ''}`}
          className="pl-10"
          placeholder={getPlaceholderText()}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-1">
        Par exemple: https://www.instagram.com/votre_profil ou https://www.facebook.com/votre_post
      </p>
    </div>
  );
};

export default SocialMediaLinkInput;
