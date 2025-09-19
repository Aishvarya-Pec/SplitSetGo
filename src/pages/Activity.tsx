import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Receipt, 
  Users, 
  CheckCircle, 
  UserPlus, 
  UserMinus, 
  DollarSign,
  Calendar,
  Search,
  Filter
} from "lucide-react"
import { userAuth } from "@/lib/userAuth"
import { appData, Group, Expense, Settlement } from "@/lib/appData"

interface ActivityItem {
  id: string
  type: "expense" | "settlement" | "group_created" | "member_added" | "member_removed"
  date: string
  groupId: string
  groupName: string
  title: string
  description: string
  amount?: number
  userId?: string
  userName?: string
  userImage?: string
  targetUserId?: string
  targetUserName?: string
}

export default function Activity() {
  const [groups, setGroups] = useState<Group[]>([])
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [filteredActivities, setFilteredActivities] = useState<ActivityItem[]>([])
  const [selectedGroup, setSelectedGroup] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const session = userAuth.getCurrentSession()
  const currentUserId = session?.user.id || "1"

  useEffect(() => {
    // Load data
    const allGroups = appData.getGroups()
    const userGroups = allGroups.filter(group => 
      group.members.some(member => member.userId === currentUserId)
    )
    setGroups(userGroups)

    // Combine all activities
    const allActivities: ActivityItem[] = []

    // Add expenses
    const expenses = appData.getExpenses()
    expenses.forEach(expense => {
      const group = allGroups.find(g => g.id === expense.groupId)
      if (group && group.members.some(member => member.userId === currentUserId)) {
        allActivities.push({
          id: `expense-${expense.id}`,
          type: "expense",
          date: expense.date,
          groupId: expense.groupId,
          groupName: group.name,
          title: expense.description,
          description: `Added by ${expense.paidByUserId === currentUserId ? "you" : expense.paidByUserName}`,
          amount: expense.amount,
          userId: expense.paidByUserId,
          userName: expense.paidByUserName,
          userImage: expense.paidByUserImage
        })
      }
    })

    // Add settlements
    const settlements = appData.getSettlements()
    settlements.forEach(settlement => {
      const group = allGroups.find(g => g.id === settlement.groupId)
      if (group && (settlement.fromUserId === currentUserId || settlement.toUserId === currentUserId)) {
        allActivities.push({
          id: `settlement-${settlement.id}`,
          type: "settlement",
          date: settlement.date,
          groupId: settlement.groupId,
          groupName: group.name,
          title: `Payment recorded`,
          description: `${settlement.fromUserId === currentUserId ? "You" : settlement.fromUserName} paid ${settlement.toUserId === currentUserId ? "you" : settlement.toUserName}`,
          amount: settlement.amount,
          userId: settlement.fromUserId,
          userName: settlement.fromUserName,
          targetUserId: settlement.toUserId,
          targetUserName: settlement.toUserName
        })
      }
    })

    // Add group creation activities (mock data)
    userGroups.forEach(group => {
      allActivities.push({
        id: `group-${group.id}`,
        type: "group_created",
        date: group.createdAt,
        groupId: group.id,
        groupName: group.name,
        title: `Group created`,
        description: `${group.name} was created`,
        userId: group.createdBy,
        userName: group.members.find(m => m.userId === group.createdBy)?.userName || "Unknown"
      })
    })

    // Sort by date (newest first)
    allActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    setActivities(allActivities)
    setFilteredActivities(allActivities)
  }, [currentUserId])

  // Filter activities
  useEffect(() => {
    let filtered = activities

    // Filter by group
    if (selectedGroup !== "all") {
      filtered = filtered.filter(activity => activity.groupId === selectedGroup)
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter(activity => activity.type === selectedType)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(activity => 
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query) ||
        activity.groupName.toLowerCase().includes(query)
      )
    }

    setFilteredActivities(filtered)
  }, [activities, selectedGroup, selectedType, searchQuery])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "expense":
        return <Receipt className="h-5 w-5" />
      case "settlement":
        return <CheckCircle className="h-5 w-5" />
      case "group_created":
        return <Users className="h-5 w-5" />
      case "member_added":
        return <UserPlus className="h-5 w-5" />
      case "member_removed":
        return <UserMinus className="h-5 w-5" />
      default:
        return <DollarSign className="h-5 w-5" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "expense":
        return "bg-blue-100 text-blue-600"
      case "settlement":
        return "bg-green-100 text-green-600"
      case "group_created":
        return "bg-purple-100 text-purple-600"
      case "member_added":
        return "bg-emerald-100 text-emerald-600"
      case "member_removed":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "expense":
        return "Expense"
      case "settlement":
        return "Settlement"
      case "group_created":
        return "Group Created"
      case "member_added":
        return "Member Added"
      case "member_removed":
        return "Member Removed"
      default:
        return "Activity"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      return "Today"
    } else if (diffDays === 2) {
      return "Yesterday"
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.date).toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {} as { [key: string]: ActivityItem[] })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
          <p className="text-muted-foreground">
            Track all your group activities and transactions
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search activities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Group</Label>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Groups</SelectItem>
                    {groups.map(group => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="expense">Expenses</SelectItem>
                    <SelectItem value="settlement">Settlements</SelectItem>
                    <SelectItem value="group_created">Group Created</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <div className="text-sm text-muted-foreground">
                  {filteredActivities.length} activities found
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities */}
        <div className="space-y-6">
          {Object.keys(groupedActivities).length > 0 ? (
            Object.entries(groupedActivities).map(([date, dayActivities]) => (
              <div key={date} className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(dayActivities[0].date)}
                </div>
                
                <div className="space-y-3">
                  {dayActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                              {getActivityIcon(activity.type)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold">{activity.title}</h3>
                                    <Badge variant="outline" className="text-xs">
                                      {getTypeLabel(activity.type)}
                                    </Badge>
                                  </div>
                                  
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {activity.description}
                                  </p>
                                  
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>{activity.groupName}</span>
                                    <span>{new Date(activity.date).toLocaleTimeString()}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  {activity.amount && (
                                    <div className={`font-bold text-lg ${
                                      activity.type === "settlement" ? "text-green-600" : "text-blue-600"
                                    }`}>
                                      ${activity.amount.toFixed(2)}
                                    </div>
                                  )}
                                  
                                  {activity.userId && (
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={activity.userImage} />
                                      <AvatarFallback className="text-xs">
                                        {activity.userName?.split(' ').map(n => n[0]).join('') || "?"}
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Filter className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No activities found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}