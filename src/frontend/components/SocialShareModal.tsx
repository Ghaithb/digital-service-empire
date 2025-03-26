
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Twitter, Mail, Linkedin, Share2, Check, Copy } from "lucide-react";
import { trackLoyaltyEvent } from '../lib/loyalty';

interface SocialShareModalProps {
  referralCode: string;
  userName: string;
}

const SocialShareModal = ({ referralCode, userName }: SocialShareModalProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const shareMessage = `Rejoignez-moi sur DIGITAL EMPIRE SERVICE! Utilisez mon code de parrainage "${referralCode}" pour obtenir 100 points de fidélité bonus. Inscrivez-vous maintenant!`;
  const shareUrl = window.location.origin + '/loyalty?ref=' + referralCode;
  
  const encodedMessage = encodeURIComponent(shareMessage);
  const encodedUrl = encodeURIComponent(shareUrl);
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=Rejoignez le programme de fidélité&body=${encodedMessage} ${shareUrl}`
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    
    toast({
      title: "Lien copié",
      description: "Le lien de parrainage a été copié dans le presse-papier.",
    });
    
    setTimeout(() => setCopied(false), 2000);
    
    trackLoyaltyEvent('referral_link_copied', {
      referralCode,
      userName
    });
  };
  
  const handleShare = (platform: string) => {
    trackLoyaltyEvent('referral_shared', {
      platform,
      referralCode,
      userName
    });
    
    window.open(shareLinks[platform as keyof typeof shareLinks], '_blank');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" onClick={() => setIsOpen(true)}>
          <Share2 className="mr-2 h-4 w-4" />
          Partager votre code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Partagez votre code de parrainage</DialogTitle>
          <DialogDescription>
            Partagez ce lien avec vos amis et gagnez des points lorsqu'ils rejoignent le programme.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="font-mono text-sm"
              />
            </div>
            <Button size="sm" variant="secondary" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou partagez via
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-10 w-10 bg-[#1877F2] hover:bg-[#166FE5] text-white border-none"
              onClick={() => handleShare('facebook')}
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-10 w-10 bg-[#1DA1F2] hover:bg-[#1a94da] text-white border-none"
              onClick={() => handleShare('twitter')}
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-10 w-10 bg-[#0A66C2] hover:bg-[#0959ab] text-white border-none"
              onClick={() => handleShare('linkedin')}
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-10 w-10 bg-[#EA4335] hover:bg-[#d33b2d] text-white border-none"
              onClick={() => handleShare('email')}
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShareModal;
