
import React from 'react';
import { CreditCard } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onChange: (value: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ 
  selectedMethod, 
  onChange 
}) => {
  // Définir automatiquement la méthode de paiement par défaut à "card" (Stripe)
  React.useEffect(() => {
    if (selectedMethod !== 'card') {
      onChange('card');
    }
  }, [selectedMethod, onChange]);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Méthode de paiement</h3>
      
      <RadioGroup 
        value={selectedMethod} 
        onValueChange={onChange} 
        className="space-y-3"
      >
        <div className="flex items-center space-x-3 border rounded-md p-3 hover:bg-accent cursor-pointer">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
            <CreditCard className="mr-2 h-5 w-5" />
            <div>
              <span className="font-medium">Carte bancaire (Stripe)</span>
              <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
            </div>
          </Label>
          <div className="flex items-center space-x-1">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" className="h-8 w-auto" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-plain.svg" alt="MasterCard" className="h-8 w-auto" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amex/amex-original.svg" alt="American Express" className="h-8 w-auto" />
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
