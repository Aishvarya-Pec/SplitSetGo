import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Users, Calendar } from "lucide-react";

const monthlyData = [
  { month: 'Jan', amount: 1200, percentage: 65 },
  { month: 'Feb', amount: 1890, percentage: 85 },
  { month: 'Mar', amount: 1567, percentage: 70 },
  { month: 'Apr', amount: 2340, percentage: 95 },
  { month: 'May', amount: 1980, percentage: 80 },
  { month: 'Jun', amount: 2847, percentage: 100 },
];

const categoryData = [
  { name: 'Food & Dining', value: 45, amount: 1280.50, color: 'hsl(158, 64%, 52%)' },
  { name: 'Transportation', value: 25, amount: 712.30, color: 'hsl(158, 84%, 58%)' },
  { name: 'Entertainment', value: 20, amount: 569.60, color: 'hsl(158, 44%, 42%)' },
  { name: 'Shopping', value: 10, amount: 284.80, color: 'hsl(158, 24%, 32%)' },
];

const weeklyData = [
  { day: 'Mon', spent: 45, height: 30 },
  { day: 'Tue', spent: 78, height: 52 },
  { day: 'Wed', spent: 123, height: 82 },
  { day: 'Thu', spent: 67, height: 45 },
  { day: 'Fri', spent: 156, height: 100 },
  { day: 'Sat', spent: 234, height: 100 },
  { day: 'Sun', spent: 89, height: 60 },
];

export const ExpenseCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Expense Trend */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-luxury text-lg text-foreground flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Expense Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((item, index) => (
              <div key={item.month} className="flex items-center space-x-4">
                <div className="w-8 text-xs text-muted-foreground font-medium">
                  {item.month}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">
                      ${item.amount.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-primary h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${item.percentage}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-luxury text-lg text-foreground flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-primary" />
            Spending Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{category.name}</p>
                    <p className="text-xs text-muted-foreground">${category.amount.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{category.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card className="glass-card lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-luxury text-lg text-foreground flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            Weekly Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between space-x-2 h-40">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex flex-col items-center space-y-2 flex-1">
                <div className="flex-1 flex items-end">
                  <div 
                    className="bg-gradient-primary rounded-t-lg w-full min-h-[20px] transition-all duration-1000 ease-out hover:shadow-glow"
                    style={{ 
                      height: `${day.height}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground font-medium">{day.day}</p>
                  <p className="text-xs text-foreground font-semibold">${day.spent}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};