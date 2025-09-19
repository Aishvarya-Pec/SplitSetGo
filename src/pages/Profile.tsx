import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard,
  Users,
  Receipt,
  CheckCircle,
  Edit3,
  Save,
  X
} from "lucide-react"
import { userAuth, User } from "@/lib/userAuth"
import { appData } from "@/lib/appData"

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: ""
  })
  const [stats, setStats] = useState({
    totalGroups: 0,
    totalExpenses: 0,
    totalSettlements: 0,
    totalAmount: 0
  })
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    expenseReminders: true,
    settlementReminders: true
  })

  const session = userAuth.getCurrentSession()
  const currentUserId = session?.user.id || "1"

  useEffect(() => {
    // Load user data from session
    if (session?.user) {
      setUser(session.user)
      setEditForm({
        name: session.user.name,
        email: session.user.email,
        phone: session.user.phone || "",
        bio: session.user.bio || ""
      })
    }

    // Calculate user stats
    const groups = appData.getGroups().filter(group => 
      group.members.some(member => member.userId === currentUserId)
    )
    
    const expenses = appData.getExpenses().filter(expense =>
      expense.paidById === currentUserId || 
      expense.splits.some(split => split.userId === currentUserId)
    )
    
    const settlements = appData.getSettlements().filter(settlement =>
      settlement.fromUserId === currentUserId || settlement.toUserId === currentUserId
    )
    
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    setStats({
      totalGroups: groups.length,
      totalExpenses: expenses.length,
      totalSettlements: settlements.length,
      totalAmount
    })
  }, [currentUserId])

  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        bio: editForm.bio
      }
      
      // In a real app, this would make an API call
      userAuth.updateUserProfile(updatedUser)
      setUser(updatedUser)
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        bio: user.bio || ""
      })
    }
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and profile information
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.image} />
                    <AvatarFallback className="text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                    <Badge variant="outline" className="mt-2">
                      Member since {new Date(user.createdAt).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2">
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{user.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{user.phone || "Not provided"}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="joined">Member Since</Label>
                    <div className="flex items-center gap-2 p-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={editForm.bio}
                      onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  ) : (
                    <div className="p-2 min-h-[60px] text-sm text-muted-foreground">
                      {user.bio || "No bio provided"}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your expenses and groups
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get instant notifications on your device
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, pushNotifications: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="expense-reminders">Expense Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Reminders about new expenses in your groups
                    </p>
                  </div>
                  <Switch
                    id="expense-reminders"
                    checked={notifications.expenseReminders}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, expenseReminders: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="settlement-reminders">Settlement Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Reminders about pending payments and settlements
                    </p>
                  </div>
                  <Switch
                    id="settlement-reminders"
                    checked={notifications.settlementReminders}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, settlementReminders: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Privacy
                </CardTitle>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Methods
                </Button>
                
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                  <X className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Activity Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Overview</CardTitle>
                <CardDescription>
                  Your activity summary
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div 
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{stats.totalGroups}</p>
                      <p className="text-sm text-muted-foreground">Groups</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Receipt className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{stats.totalExpenses}</p>
                      <p className="text-sm text-muted-foreground">Expenses</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center justify-between p-3 bg-purple-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{stats.totalSettlements}</p>
                      <p className="text-sm text-muted-foreground">Settlements</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <CreditCard className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold">${stats.totalAmount.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Receipt className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Create Group
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Record Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}