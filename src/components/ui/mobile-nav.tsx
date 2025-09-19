import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SignOutButton, useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Menu, 
  X, 
  Home, 
  LayoutDashboard, 
  Users, 
  Receipt, 
  CreditCard, 
  Activity, 
  User,
  PlusCircle,
  LogOut,
  Bell
} from 'lucide-react'

const navigation = [
  { name: "Home", icon: Home, href: "/home" },
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Groups", icon: Users, href: "/groups" },
  { name: "Expenses", icon: Receipt, href: "/expenses" },
  { name: "Settlements", icon: CreditCard, href: "/settlements" },
  { name: "Activity", icon: Activity, href: "/activity" },
  { name: "Profile", icon: User, href: "/profile" },
]

export const MobileNav = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { user } = useUser()

  // Mock user data for demo purposes
  const mockUser = {
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    imageUrl: null
  }

  return (
    <div className="lg:hidden">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-responsive flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-lg font-luxury font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              SplitSetGo
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 w-10 p-0"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0 bg-gradient-to-b from-background to-background/95 backdrop-blur-xl border-r border-border">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-luxury font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                      SplitSetGo
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpen(false)}
                    className="h-8 w-8"
                    aria-label="Close navigation menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* User Profile */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                      <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                        {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{user?.fullName || user?.emailAddresses[0]?.emailAddress || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.emailAddresses[0]?.emailAddress || "user@example.com"}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Notifications">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2" role="navigation" aria-label="Main navigation">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setOpen(false)}
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
                    )
                  })}
                </nav>

                {/* Quick Actions */}
                <div className="p-4 space-y-3 border-t border-border">
                  <Button 
                    variant="luxury" 
                    className="w-full justify-start glow-effect" 
                    asChild
                    onClick={() => setOpen(false)}
                  >
                    <Link to="/expenses">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Expense
                    </Link>
                  </Button>
                  <Button 
                    variant="glass" 
                    className="w-full justify-start" 
                    asChild
                    onClick={() => setOpen(false)}
                  >
                    <Link to="/groups">
                      <Users className="mr-2 h-4 w-4" />
                      Create Group
                    </Link>
                  </Button>
                </div>

                {/* Logout */}
                <div className="p-4 border-t border-border">
                  <SignOutButton>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-muted-foreground hover:text-destructive"
                      onClick={() => setOpen(false)}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </SignOutButton>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  )
}