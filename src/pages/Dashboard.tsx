import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { ActiveGroups } from "@/components/dashboard/ActiveGroups";
import { ExpenseCharts } from "@/components/dashboard/ExpenseCharts";
import { Button } from "@/components/ui/button";
import { Search, Filter, Bell, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="bg-card/50 backdrop-blur-xl border-b border-border sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search expenses, groups, or people..."
                    className="pl-10 bg-muted/50 border-border"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-glow-pulse" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-8">
          {/* Welcome Section */}
          <div className="animate-luxury-fade-in">
            <h1 className="font-luxury text-3xl font-bold text-foreground mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your expenses today.
            </p>
          </div>

          {/* Stats Overview */}
          <StatsOverview />

          {/* Charts Section */}
          <div className="animate-luxury-fade-in" style={{ animationDelay: '0.2s' }}>
            <ExpenseCharts />
          </div>

          {/* Transactions and Groups */}
          <div className="grid lg:grid-cols-2 gap-8 animate-luxury-fade-in" style={{ animationDelay: '0.3s' }}>
            <RecentTransactions />
            <ActiveGroups />
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-emerald rounded-3xl p-8 text-center animate-luxury-scale" style={{ animationDelay: '0.4s' }}>
            <h2 className="font-luxury text-2xl font-bold text-foreground mb-4">
              Ready to split your next expense?
            </h2>
            <p className="text-muted-foreground mb-6">
              Add a new expense or create a group to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="luxury" size="lg" className="glow-effect">
                Add New Expense
              </Button>
              <Button variant="glass" size="lg">
                Create Group
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;