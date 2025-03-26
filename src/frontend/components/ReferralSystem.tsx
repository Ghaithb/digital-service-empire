
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { processReferral, trackLoyaltyEvent } from '../lib/loyalty';
import SocialShareModal from './SocialShareModal';
import { Users, Gift, Copy, Check } from "lucide-react";

interface ReferralSystemProps {
  referralCode: string;
  referrals: number;
  userName: string;
  onSuccess?: () => void;
}

const ReferralSystem = ({ 
  referralCode, 
  referrals,
  userName,
  onSuccess 
}: ReferralSystemProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [friendCode, setFriendCode] = useState('');
  const [processing, setProcessing] = useState(false);
  
  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    
    toast({
      title: "Code copié",
      description: "Le code de parrainage a été copié dans le presse-papier.",
    });
    
    setTimeout(() => setCopied(false), 2000);
    
    trackLoyaltyEvent('referral_code_copied', {
      referralCode,
      userName
    });
  };
  
  const handleRedeemCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!friendCode.trim()) {
      toast({
        title: "Code manquant",
        description: "Veuillez entrer un code de parrainage.",
        variant: "destructive"
      });
      return;
    }
    
    if (friendCode === referralCode) {
      toast({
        title: "Code invalide",
        description: "Vous ne pouvez pas utiliser votre propre code de parrainage.",
        variant: "destructive"
      });
      return;
    }
    
    setProcessing(true);
    
    try {
      const success = await processReferral(friendCode, userName);
      
      if (success) {
        toast({
          title: "Code validé",
          description: "Le code de parrainage a été validé avec succès !",
        });
        
        trackLoyaltyEvent('referral_code_redeemed', {
          referralCode: friendCode,
          userName
        });
        
        setFriendCode('');
        if (onSuccess) onSuccess();
      } else {
        toast({
          title: "Code invalide",
          description: "Le code de parrainage est invalide ou a déjà été utilisé.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la validation du code.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Programme de Parrainage
          </CardTitle>
          <CardDescription>
            Parrainez vos amis et recevez des points bonus !
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Votre code de parrainage unique :
            </p>
            <div className="flex space-x-2">
              <div className="flex-1 bg-muted font-mono p-2.5 rounded-md text-center">
                {referralCode}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={copyReferralCode}
                aria-label="Copier le code"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="py-3">
            <p className="text-sm font-medium mb-1">
              Nombre de parrainages réussis : <span className="text-primary">{referrals}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Vous gagnez jusqu'à 600 points pour chaque ami qui rejoint avec votre code !
            </p>
          </div>
          
          <SocialShareModal referralCode={referralCode} userName={userName} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Avez-vous un code de parrainage ?
          </CardTitle>
          <CardDescription>
            Entrez le code d'un ami pour gagner 100 points bonus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRedeemCode} className="flex space-x-2">
            <Input
              placeholder="Saisissez le code" 
              value={friendCode}
              onChange={(e) => setFriendCode(e.target.value)}
              className="font-mono uppercase"
            />
            <Button 
              type="submit" 
              disabled={processing}
            >
              {processing ? "Traitement..." : "Valider"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralSystem;
