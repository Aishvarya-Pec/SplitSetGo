import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "expense",
    description: "Dinner at The Ritz",
    amount: -85.50,
    group: "Weekend Getaway",
    participants: ["JD", "AS", "MK"],
    date: "2 hours ago",
    status: "pending"
  },
  {
    id: 2,
    type: "settlement",
    description: "Payment from Alex",
    amount: +120.00,
    group: "Office Lunch",
    participants: ["AS"],
    date: "5 hours ago",
    status: "completed"
  },
  {
    id: 3,
    type: "expense",
    description: "Uber ride to airport",
    amount: -34.20,
    group: "Business Trip",
    participants: ["JD", "MK", "LT"],
    date: "1 day ago",
    status: "settled"
  },
  {
    id: 4,
    type: "settlement",
    description: "Payment to Maria",
    amount: -67.80,
    group: "Movie Night",
    participants: ["MK"],
    date: "2 days ago",
    status: "completed"
  },
  {
    id: 5,
    type: "expense",
    description: "Grocery shopping",
    amount: -156.45,
    group: "Apartment 4B",
    participants: ["JD", "AS", "MK", "LT"],
    date: "3 days ago",
    status: "pending"
  }
];

export const RecentTransactions = () => {
  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-luxury text-xl text-foreground">
          Recent Transactions
        </CardTitle>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  transaction.amount > 0 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-destructive/20 text-destructive'
                }`}>
                  {transaction.amount > 0 ? (
                    <ArrowDownRight className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {transaction.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-muted-foreground">{transaction.group}</p>
                    <Badge 
                      variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {transaction.participants.slice(0, 3).map((participant, i) => (
                    <Avatar key={i} className="h-6 w-6 border-2 border-background">
                      <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                        {participant}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {transaction.participants.length > 3 && (
                    <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">
                        +{transaction.participants.length - 3}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${
                    transaction.amount > 0 ? 'text-primary' : 'text-foreground'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};