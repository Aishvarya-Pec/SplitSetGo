import { 
  Home, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Settings, 
  Bell,
  PlusCircle,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigation = [
  { name: "Dashboard", icon: Home, href: "/dashboard", current: true },
  { name: "Groups", icon: Users, href: "/groups", current: false },
  { name: "Expenses", icon: CreditCard, href: "/expenses", current: false },
  { name: "Analytics", icon: TrendingUp, href: "/analytics", current: false },
  { name: "Settings", icon: Settings, href: "/settings", current: false },
];

export const DashboardSidebar = () => {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 pb-4 bg-card border-r border-border">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-6 mb-8">
          <img 
            src="/lovable-uploads/7ac35f37-7312-4713-824e-f1d0e46f3c62.png" 
            alt="SplitSetGo" 
            className="h-8 w-auto"
          />
        </div>

        {/* User Profile */}
        <div className="px-6 mb-8">
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">Premium Member</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                item.current
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:shadow-card"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 transition-transform duration-300 ${
                  item.current ? "scale-110" : "group-hover:scale-105"
                }`}
              />
              {item.name}
            </a>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="px-4 mt-6 space-y-3">
          <Button variant="luxury" className="w-full justify-start glow-effect" asChild>
            <a href="/dashboard">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Expense
            </a>
          </Button>
          <Button variant="glass" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </div>

        {/* Logout */}
        <div className="px-4 py-4">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};