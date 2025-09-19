import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Receipt, Calendar, DollarSign, Users, Search, Filter } from "lucide-react"
import { userAuth } from "@/lib/userAuth"
import { appData, Group, Expense, MockGroup, MockExpense, MockExpenseSplit } from "@/lib/appData"

export default function Expenses() {
  const [expenses, setExpenses] = useState<MockExpense[]>([])
  const [groups, setGroups] = useState<MockGroup[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<MockExpense[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<MockExpense | null>(null)
  
  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    groupId: "",
    category: "Food",
    date: new Date().toISOString().split('T')[0],
    splitType: "equal" as "equal" | "unequal" | "custom",
    splits: [] as { userId: string; amount: string }[]
  })

  const session = userAuth.getCurrentSession()
  const currentUserId = session?.user.id || "1"

  const categories = ["Food", "Transportation", "Accommodation", "Entertainment", "Shopping", "Utilities", "Other"]

  useEffect(() => {
    // Load data
    const allGroups = appData.getGroups()
    const userGroups = allGroups.filter(group => 
      group.members.some(member => member.userId === currentUserId)
    )
    setGroups(userGroups)

    const allExpenses = appData.getExpenses()
    const userExpenses = allExpenses.filter(expense => 
      userGroups.some(group => group.id === expense.groupId)
    )
    setExpenses(userExpenses)
    setFilteredExpenses(userExpenses)
  }, [currentUserId])

  // Filter expenses
  useEffect(() => {
    let filtered = expenses

    if (searchTerm) {
      filtered = filtered.filter(expense => 
        expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedGroup !== "all") {
      filtered = filtered.filter(expense => expense.groupId === selectedGroup)
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(expense => expense.category === selectedCategory)
    }

    setFilteredExpenses(filtered)
  }, [expenses, searchTerm, selectedGroup, selectedCategory])

  const handleAddExpense = () => {
    if (!formData.title || !formData.amount || !formData.groupId) return

    const group = groups.find(g => g.id === formData.groupId)
    if (!group) return

    const amount = parseFloat(formData.amount)
    let splits: MockExpenseSplit[] = []

    if (formData.splitType === "equal") {
      const splitAmount = amount / group.members.length
      splits = group.members.map((member, index) => ({
        id: (Date.now() + index).toString(),
        expenseId: "",
        userId: member.userId,
        userName: member.userName,
        amount: splitAmount,
        settled: member.userId === currentUserId
      }))
    } else if (formData.splitType === "custom" && formData.splits.length > 0) {
      splits = formData.splits.map((split, index) => ({
        id: (Date.now() + index).toString(),
        expenseId: "",
        userId: split.userId,
        userName: group.members.find(m => m.userId === split.userId)?.userName || "",
        amount: parseFloat(split.amount) || 0,
        settled: split.userId === currentUserId
      }))
    }

    const newExpense = appData.createExpense({
      groupId: formData.groupId,
      title: formData.title,
      description: formData.description,
      amount,
      paidById: currentUserId,
      paidByName: session?.user.name || "User",
      category: formData.category,
      date: new Date(formData.date).toISOString(),
      splits
    })

    // Update splits with correct expense ID
    newExpense.splits = newExpense.splits.map(split => ({
      ...split,
      expenseId: newExpense.id
    }))

    setExpenses(prev => [newExpense, ...prev])
    setAddDialogOpen(false)
    resetForm()
  }

  const handleEditExpense = () => {
    if (!selectedExpense || !formData.title || !formData.amount) return

    const amount = parseFloat(formData.amount)
    const updatedExpense = appData.updateExpense(selectedExpense.id, {
      title: formData.title,
      description: formData.description,
      amount,
      category: formData.category,
      date: new Date(formData.date).toISOString()
    })

    if (updatedExpense) {
      setExpenses(prev => prev.map(exp => exp.id === selectedExpense.id ? updatedExpense : exp))
    }

    setEditDialogOpen(false)
    setSelectedExpense(null)
    resetForm()
  }

  const handleDeleteExpense = (expenseId: string) => {
    if (appData.deleteExpense(expenseId)) {
      setExpenses(prev => prev.filter(exp => exp.id !== expenseId))
    }
  }

  const openEditDialog = (expense: MockExpense) => {
    setSelectedExpense(expense)
    setFormData({
      title: expense.title,
      description: expense.description || "",
      amount: expense.amount.toString(),
      groupId: expense.groupId,
      category: expense.category,
      date: new Date(expense.date).toISOString().split('T')[0],
      splitType: "equal",
      splits: []
    })
    setEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      amount: "",
      groupId: "",
      category: "Food",
      date: new Date().toISOString().split('T')[0],
      splitType: "equal",
      splits: []
    })
  }

  const initializeCustomSplits = (groupId: string) => {
    const group = groups.find(g => g.id === groupId)
    if (group) {
      const splits = group.members.map(member => ({
        userId: member.userId,
        amount: ""
      }))
      setFormData(prev => ({ ...prev, splits }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
            <p className="text-muted-foreground">
              Manage and track all your shared expenses
            </p>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Create a new expense and split it with your group members.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="col-span-3"
                    placeholder="Dinner at restaurant"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    className="col-span-3"
                    placeholder="0.00"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="group" className="text-right">Group</Label>
                  <Select 
                    value={formData.groupId} 
                    onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, groupId: value }))
                      if (formData.splitType === "custom") {
                        initializeCustomSplits(value)
                      }
                    }}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map(group => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="col-span-3"
                    placeholder="Optional description"
                    rows={3}
                  />
                </div>
                
                {/* Split Type Selection */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Split Type</Label>
                  <Tabs 
                    value={formData.splitType} 
                    onValueChange={(value: "equal" | "unequal" | "custom") => {
                      setFormData(prev => ({ ...prev, splitType: value }))
                      if (value === "custom" && formData.groupId) {
                        initializeCustomSplits(formData.groupId)
                      }
                    }}
                    className="col-span-3"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="equal">Equal Split</TabsTrigger>
                      <TabsTrigger value="custom">Custom Split</TabsTrigger>
                    </TabsList>
                    <TabsContent value="equal" className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        The expense will be split equally among all group members.
                      </p>
                    </TabsContent>
                    <TabsContent value="custom" className="mt-4 space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Specify custom amounts for each member:
                      </p>
                      {formData.splits.map((split, index) => {
                        const member = groups.find(g => g.id === formData.groupId)?.members.find(m => m.userId === split.userId)
                        return (
                          <div key={split.userId} className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member?.userImage} />
                              <AvatarFallback>
                                {member?.userName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="flex-1 text-sm">{member?.userName}</span>
                            <Input
                              type="number"
                              step="0.01"
                              value={split.amount}
                              onChange={(e) => {
                                const newSplits = [...formData.splits]
                                newSplits[index].amount = e.target.value
                                setFormData(prev => ({ ...prev, splits: newSplits }))
                              }}
                              className="w-24"
                              placeholder="0.00"
                            />
                          </div>
                        )
                      })}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddExpense}>
                  Add Expense
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Groups" />
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
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Expenses List */}
        <div className="space-y-4">
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense, index) => {
              const group = groups.find(g => g.id === expense.groupId)
              const userSplit = expense.splits.find(split => split.userId === currentUserId)
              
              return (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Receipt className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{expense.title}</h3>
                              <Badge variant="outline">{expense.category}</Badge>
                              <Badge variant={userSplit?.settled ? "default" : "secondary"}>
                                {userSplit?.settled ? "Settled" : "Pending"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {group?.name} • Paid by {expense.paidById === currentUserId ? "You" : expense.paidByName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(expense.date).toLocaleDateString()} • {expense.splits.length} people
                            </p>
                            {expense.description && (
                              <p className="text-sm text-muted-foreground mt-1">{expense.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-bold text-lg">${expense.amount.toFixed(2)}</div>
                            <div className="text-sm text-muted-foreground">
                              Your share: ${userSplit?.amount.toFixed(2) || "0.00"}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditDialog(expense)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDeleteExpense(expense.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Receipt className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No expenses found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || selectedGroup !== "all" || selectedCategory !== "all" 
                      ? "Try adjusting your filters or search terms"
                      : "Start by adding your first expense"
                    }
                  </p>
                  {!searchTerm && selectedGroup === "all" && selectedCategory === "all" && (
                    <Button onClick={() => setAddDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Expense
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Edit Expense Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Expense</DialogTitle>
              <DialogDescription>
                Update the expense details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-amount" className="text-right">Amount</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-date" className="text-right">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditExpense}>
                Update Expense
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}