import { 
  Home, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Settings, 
  Bell,
  PlusCircle,
  LogOut,
  Receipt,
  Activity,
  User,
  LayoutDashboard
} from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation, Link } from "react-router-dom";

const navigation = [
  { name: "Home", icon: Home, href: "/home" },
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Groups", icon: Users, href: "/groups" },
  { name: "Expenses", icon: Receipt, href: "/expenses" },
  { name: "Settlements", icon: CreditCard, href: "/settlements" },
  { name: "Activity", icon: Activity, href: "/activity" },
  { name: "Profile", icon: User, href: "/profile" },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useUser();
  
  // Mock user data for demo purposes
  const mockUser = {
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    imageUrl: null
  };

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 pb-4 bg-card border-r border-border">
        {/* Brand */}
        <div className="flex items-center flex-shrink-0 px-6 mb-8">
          <span className="text-xl font-luxury font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            SplitSetGo
          </span>
        </div>

        {/* User Profile */}
        <div className="px-6 mb-8">
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                  {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.fullName || user?.emailAddresses[0]?.emailAddress || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.emailAddresses[0]?.emailAddress || "user@example.com"}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2" role="navigation" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:shadow-card"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 transition-transform duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-105"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="px-4 mt-6 space-y-3">
          <Button variant="luxury" className="w-full justify-start glow-effect" asChild>
            <Link to="/expenses">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Expense
            </Link>
          </Button>
          <Button variant="glass" className="w-full justify-start" asChild>
            <Link to="/groups">
              <Users className="mr-2 h-4 w-4" />
              Create Group
            </Link>
          </Button>
        </div>

        {/* Logout */}
        <div className="px-4 py-4">
          <SignOutButton>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
};