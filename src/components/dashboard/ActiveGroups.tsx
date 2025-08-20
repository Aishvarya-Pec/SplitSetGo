import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MoreHorizontal } from "lucide-react";

const groups = [
  {
    id: 1,
    name: "Weekend Getaway",
    members: 4,
    totalExpenses: 1247.80,
    yourBalance: -342.50,
    lastActivity: "2 hours ago",
    avatars: ["JD", "AS", "MK", "LT"],
    color: "from-emerald-500/20 to-green-500/20"
  },
  {
    id: 2,
    name: "Office Lunch Group",
    members: 8,
    totalExpenses: 856.20,
    yourBalance: +123.40,
    lastActivity: "5 hours ago",
    avatars: ["JD", "AS", "MK", "LT"],
    color: "from-blue-500/20 to-emerald-500/20"
  },
  {
    id: 3,
    name: "Apartment 4B",
    members: 4,
    totalExpenses: 2341.60,
    yourBalance: -89.20,
    lastActivity: "1 day ago",
    avatars: ["JD", "AS", "MK", "LT"],
    color: "from-purple-500/20 to-emerald-500/20"
  },
  {
    id: 4,
    name: "Movie Night",
    members: 6,
    totalExpenses: 234.50,
    yourBalance: +45.80,
    lastActivity: "2 days ago",
    avatars: ["JD", "AS", "MK"],
    color: "from-orange-500/20 to-emerald-500/20"
  }
];

export const ActiveGroups = () => {
  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-luxury text-xl text-foreground">
          Active Groups
        </CardTitle>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {groups.map((group) => (
            <div 
              key={group.id}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${group.color} group-hover:scale-105 transition-transform duration-300`}>
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {group.name}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-muted-foreground">
                      {group.members} members
                    </p>
                    <span className="text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">
                      ${group.totalExpenses.toFixed(2)} total
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {group.avatars.slice(0, 3).map((avatar, i) => (
                    <Avatar key={i} className="h-7 w-7 border-2 border-background">
                      <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                        {avatar}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {group.members > 3 && (
                    <div className="h-7 w-7 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">
                        +{group.members - 3}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${
                    group.yourBalance > 0 ? 'text-primary' : 'text-destructive'
                  }`}>
                    {group.yourBalance > 0 ? '+' : ''}${group.yourBalance.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">{group.lastActivity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};