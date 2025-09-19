import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, TrendingUp, TrendingDown, Users, Receipt, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { userAuth } from "@/lib/userAuth"
import { appData, Group, Expense, MockGroup, MockExpense } from "@/lib/appData"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month")
  const [groups, setGroups] = useState<MockGroup[]>([])
  const [expenses, setExpenses] = useState<MockExpense[]>([])
  const [balances, setBalances] = useState<{ [groupId: string]: { [userId: string]: number } }>({})

  const session = userAuth.getCurrentSession()
  const navigate = useNavigate()
  const currentUserId = session?.user.id || "1"

  useEffect(() => {
    // Load data
    const allGroups = appData.getGroups()
    const userGroups = allGroups.filter(group => 
      group.members.some(member => member.userId === currentUserId)
    )
    setGroups(userGroups)

    const allExpenses = appData.getExpenses()
    setExpenses(allExpenses)

    // Calculate balances for each group
    const groupBalances: { [groupId: string]: { [userId: string]: number } } = {}
    userGroups.forEach(group => {
      groupBalances[group.id] = appData.calculateBalances(group.id)
    })
    setBalances(groupBalances)
  }, [currentUserId])

  // Calculate stats
  const stats = {
    totalOwed: Object.values(balances).reduce((total, groupBalance) => {
      const userBalance = groupBalance[currentUserId] || 0
      return total + (userBalance > 0 ? userBalance : 0)
    }, 0),
    totalOwing: Math.abs(Object.values(balances).reduce((total, groupBalance) => {
      const userBalance = groupBalance[currentUserId] || 0
      return total + (userBalance < 0 ? userBalance : 0)
    }, 0)),
    totalGroups: groups.length,
    totalExpenses: expenses.filter(expense => 
      groups.some(group => group.id === expense.groupId)
    ).length
  }

  // Get recent expenses for user's groups
  const recentExpenses = expenses
    .filter(expense => groups.some(group => group.id === expense.groupId))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map(expense => {
      const group = groups.find(g => g.id === expense.groupId)
      const userSplit = expense.splits.find(split => split.userId === currentUserId)
      return {
        id: expense.id,
        title: expense.title,
        group: group?.name || "Unknown Group",
        amount: expense.amount,
        date: new Date(expense.createdAt).toLocaleDateString(),
        paidBy: expense.paidById === currentUserId ? "You" : expense.paidByName,
        yourShare: userSplit?.amount || 0,
        status: userSplit?.settled ? "settled" : "pending"
      }
    })

  // Calculate individual balances with other users
  const individualBalances = Object.entries(balances).flatMap(([groupId, groupBalance]) => {
    const group = groups.find(g => g.id === groupId)
    if (!group) return []
    
    return group.members
      .filter(member => member.userId !== currentUserId)
      .map(member => {
        const memberBalance = groupBalance[member.userId] || 0
        const userBalance = groupBalance[currentUserId] || 0
        
        // Calculate net balance between current user and this member
        let netAmount = 0
        if (userBalance > 0 && memberBalance < 0) {
          netAmount = Math.min(userBalance, Math.abs(memberBalance))
        } else if (userBalance < 0 && memberBalance > 0) {
          netAmount = -Math.min(Math.abs(userBalance), memberBalance)
        }
        
        return {
          name: member.userName,
          avatar: member.userImage || "",
          amount: netAmount,
          type: netAmount > 0 ? "owes_you" : "you_owe"
        }
      })
      .filter(balance => Math.abs(balance.amount) > 0.01) // Only show non-zero balances
  })
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {session?.user.name || "User"}! Here's your expense overview.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => navigate('/expenses')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">You're Owed</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ${stats.totalOwed.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  From {stats.totalGroups} groups
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">You Owe</CardTitle>
                <ArrowDownRight className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  ${stats.totalOwing.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across {stats.totalGroups} groups
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalGroups}</div>
                <p className="text-xs text-muted-foreground">
                  Groups you're part of
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <Receipt className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalExpenses}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Expenses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>
                  Your latest expense activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentExpenses.length > 0 ? (
                  recentExpenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{expense.title}</h4>
                          <Badge variant={expense.status === "settled" ? "default" : "secondary"}>
                            {expense.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {expense.group} • Paid by {expense.paidBy}
                        </p>
                        <p className="text-xs text-muted-foreground">{expense.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${expense.amount.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">
                          Your share: ${expense.yourShare.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No recent expenses</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Balances */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Balances</CardTitle>
                <CardDescription>
                  Who owes what
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {individualBalances.length > 0 ? (
                  individualBalances.map((balance, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={balance.avatar} />
                          <AvatarFallback>
                            {balance.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{balance.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {balance.type === "owes_you" ? "owes you" : "you owe"}
                          </p>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        balance.type === "owes_you" ? "text-green-600" : "text-red-600"
                      }`}>
                        ${Math.abs(balance.amount).toFixed(2)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>All settled up!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}