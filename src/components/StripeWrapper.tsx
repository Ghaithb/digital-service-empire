
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';

interface StripeWrapperProps {
  children: React.ReactNode;
  options?: {
    clientSecret?: string;
    [key: string]: any;
  };
}

const StripeWrapper = ({ children, options = {} }: StripeWrapperProps) => {
  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;
