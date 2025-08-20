import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";

const stats = [
  {
    title: "Total Balance",
    value: "$2,847.50",
    change: "+12.5%",
    changeType: "positive",
    icon: DollarSign,
    gradient: "from-emerald-500/20 to-green-500/20"
  },
  {
    title: "You Owe",
    value: "$342.80",
    change: "-8.2%",
    changeType: "negative",
    icon: TrendingDown,
    gradient: "from-red-500/20 to-orange-500/20"
  },
  {
    title: "Owed to You",
    value: "$1,247.30",
    change: "+23.1%",
    changeType: "positive",
    icon: TrendingUp,
    gradient: "from-blue-500/20 to-emerald-500/20"
  },
  {
    title: "Active Groups",
    value: "12",
    change: "+2 new",
    changeType: "positive",
    icon: Users,
    gradient: "from-purple-500/20 to-emerald-500/20"
  }
];

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title}
          className="glass-card hover:shadow-glow transition-all duration-500 animate-luxury-scale"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold font-luxury text-foreground">
                {stat.value}
              </div>
              <p className={`text-xs flex items-center ${
                stat.changeType === 'positive' ? 'text-primary' : 'text-destructive'
              }`}>
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                {stat.change}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};