import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react"
import { Toaster } from "@/components/ui/toaster"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { MobileNav } from "@/components/ui/mobile-nav"
import Index from "@/pages/Index"
import Dashboard from "@/pages/Dashboard"
import Expenses from "@/pages/Expenses"
import Groups from "@/pages/Groups"
import Settlements from "@/pages/Settlements"
import Activity from "@/pages/Activity"
import Profile from "@/pages/Profile"
import SignInPage from "@/components/auth/SignIn"
import SignUpPage from "@/components/auth/SignUp"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Index />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route path="/dashboard" element={
            <SignedIn>
              <div className="flex h-screen bg-background">
                <DashboardSidebar />
                <MobileNav />
                <main className="flex-1 overflow-auto lg:ml-64">
                  <div className="container-responsive">
                    <Dashboard />
                  </div>
                </main>
              </div>
            </SignedIn>
          } />
          <Route path="/expenses" element={
            <SignedIn>
              <div className="flex h-screen bg-background">
                <DashboardSidebar />
                <MobileNav />
                <main className="flex-1 overflow-auto lg:ml-64">
                  <div className="container-responsive">
                    <Expenses />
                  </div>
                </main>
              </div>
            </SignedIn>
          } />
          <Route path="/groups" element={
            <SignedIn>
              <div className="flex h-screen bg-background">
                <DashboardSidebar />
                <MobileNav />
                <main className="flex-1 overflow-auto lg:ml-64">
                  <div className="container-responsive">
                    <Groups />
                  </div>
                </main>
              </div>
            </SignedIn>
          } />
          <Route path="/activity" element={
            <SignedIn>
              <div className="flex h-screen bg-background">
                <DashboardSidebar />
                <MobileNav />
                <main className="flex-1 overflow-auto lg:ml-64">
                  <div className="container-responsive">
                    <Activity />
                  </div>
                </main>
              </div>
            </SignedIn>
          } />
          <Route path="/settlements" element={
            <SignedIn>
              <div className="flex h-screen bg-background">
                <DashboardSidebar />
                <MobileNav />
                <main className="flex-1 overflow-auto lg:ml-64">
                  <div className="container-responsive">
                    <Settlements />
                  </div>
                </main>
              </div>
            </SignedIn>
          } />
          <Route path="/profile" element={
            <SignedIn>
              <div className="flex h-screen bg-background">
                <DashboardSidebar />
                <MobileNav />
                <main className="flex-1 overflow-auto lg:ml-64">
                  <div className="container-responsive">
                    <Profile />
                  </div>
                </main>
              </div>
            </SignedIn>
          } />
        </Routes>
      </div>
      <Toaster />
    </Router>
  )
}

export default App
