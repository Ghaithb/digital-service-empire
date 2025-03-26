
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Badge as BadgeIcon, Medal, Crown } from "lucide-react";
import { LoyaltyTierInfo } from '../lib/loyalty';

interface LoyaltyTierCardProps {
  tier: LoyaltyTierInfo;
  isCurrentTier: boolean;
  isNextTier?: boolean;
  pointsToNextTier?: number;
}

const LoyaltyTierCard = ({ 
  tier, 
  isCurrentTier, 
  isNextTier = false,
  pointsToNextTier = 0
}: LoyaltyTierCardProps) => {
  // Choose the right icon based on tier name
  const IconComponent = () => {
    switch(tier.icon) {
      case 'badge':
        return <BadgeIcon className={`h-6 w-6 ${tier.color}`} />;
      case 'medal':
        return <Medal className={`h-6 w-6 ${tier.color}`} />;
      case 'crown':
        return <Crown className={`h-6 w-6 ${tier.color}`} />;
      default:
        return <Award className={`h-6 w-6 ${tier.color}`} />;
    }
  };

  return (
    <Card className={`${isCurrentTier ? 'border-primary' : ''} ${isNextTier ? 'border-dashed' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <IconComponent />
            <span className={`capitalize ${tier.color}`}>{tier.name}</span>
          </CardTitle>
          
          {isCurrentTier && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
              Niveau actuel
            </Badge>
          )}
          
          {isNextTier && (
            <Badge variant="outline" className="bg-muted text-muted-foreground">
              Prochain palier
            </Badge>
          )}
        </div>
        <CardDescription>
          {isCurrentTier ? 
            "Votre niveau actuel de fidélité" : 
            `Minimum ${tier.minPoints} points`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1 text-sm">
          {tier.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mt-1.5 mr-2"></span>
              {benefit}
            </li>
          ))}
        </ul>
        
        {isNextTier && pointsToNextTier > 0 && (
          <div className="mt-4 pt-3 border-t text-sm text-muted-foreground">
            <p>Il vous manque <span className="font-medium text-primary">{pointsToNextTier} points</span> pour atteindre ce niveau</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoyaltyTierCard;
