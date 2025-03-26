
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ArrowUp, 
  ArrowDown, 
  UserPlus, 
  Users
} from "lucide-react";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { PointsTransaction } from '../lib/loyalty';

interface PointsHistoryProps {
  transactions: PointsTransaction[];
  isLoading?: boolean;
}

const PointsHistory = ({ transactions, isLoading = false }: PointsHistoryProps) => {
  // Helper to get the right icon for the transaction type
  const getTransactionIcon = (type: PointsTransaction['type']) => {
    switch (type) {
      case 'earned':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'spent':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      case 'referral':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'signup':
        return <UserPlus className="h-4 w-4 text-purple-500" />;
      default:
        return <ArrowUp className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Historique des points</h3>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : transactions.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-mono text-xs">
                    {format(transaction.date, 'dd/MM/yyyy', { locale: fr })}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getTransactionIcon(transaction.type)}
                      <span className="text-sm capitalize">
                        {transaction.type === 'earned' && 'Gagné'}
                        {transaction.type === 'spent' && 'Utilisé'}
                        {transaction.type === 'referral' && 'Parrainage'}
                        {transaction.type === 'signup' && 'Inscription'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    transaction.type === 'spent' ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {transaction.type === 'spent' ? '-' : '+'}{transaction.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="py-8 text-center border rounded-md bg-muted/20">
          <p className="text-muted-foreground">Aucune transaction trouvée</p>
        </div>
      )}
    </div>
  );
};

export default PointsHistory;
