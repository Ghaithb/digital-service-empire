
import React from 'react';
import { CreditCard, Banknote } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onChange: (value: string) => void;
}

// Create a PayPal icon since it's not in lucide-react
const PaypalIcon = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="text-blue-600"
    >
      <path d="M7.144 19.532l1.049-5.751c.11-.606.691-1.002 1.304-.948 2.155.192 6.877.1 8.818-4.002 2.554-5.397-.59-7.769-6.295-7.769H7.43a1.97 1.97 0 0 0-1.944 1.655L2.77 19.532a1.35 1.35 0 0 0 1.337 1.608h1.757a1.35 1.35 0 0 0 1.28-1.608z" />
      <path d="M7.967 22.522a.74.74 0 0 0 .666.478h1.526c.761 0 1.497-.517 1.71-1.277l.11-.53-.55-3.02H9.736c-.69 0-1.33.464-1.517 1.138l-.776 3.033a.95.95 0 0 0 .524 1.178z" />
    </svg>
  );
};

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ 
  selectedMethod, 
  onChange 
}) => {
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
              <span className="font-medium">Carte bancaire</span>
              <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
            </div>
          </Label>
          <div className="flex items-center space-x-1">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" className="h-8 w-auto" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-plain.svg" alt="MasterCard" className="h-8 w-auto" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amex/amex-original.svg" alt="American Express" className="h-8 w-auto" />
          </div>
        </div>
        
        <div className="flex items-center space-x-3 border rounded-md p-3 hover:bg-accent cursor-pointer">
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal" className="flex items-center cursor-pointer flex-1">
            <PaypalIcon />
            <div className="ml-2">
              <span className="font-medium">PayPal</span>
              <p className="text-sm text-muted-foreground">Paiement sécurisé via PayPal</p>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-3 border rounded-md p-3 hover:bg-accent cursor-pointer">
          <RadioGroupItem value="bank_transfer" id="bank_transfer" />
          <Label htmlFor="bank_transfer" className="flex items-center cursor-pointer">
            <Banknote className="mr-2 h-5 w-5" />
            <div>
              <span className="font-medium">Virement bancaire</span>
              <p className="text-sm text-muted-foreground">Paiement par virement SEPA</p>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
