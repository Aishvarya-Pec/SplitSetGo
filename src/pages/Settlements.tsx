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
import { ArrowRight, CheckCircle, Clock, DollarSign, Users, CreditCard, Smartphone } from "lucide-react"
import { userAuth } from "@/lib/userAuth"
import { appData, Group, Settlement } from "@/lib/appData"

export default function Settlements() {
  const [groups, setGroups] = useState<Group[]>([])
  const [settlements, setSettlements] = useState<Settlement[]>([])
  const [balances, setBalances] = useState<{ [groupId: string]: { [userId: string]: number } }>({})
  const [selectedGroup, setSelectedGroup] = useState<string>("all")
  
  // Dialog states
  const [recordDialogOpen, setRecordDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    groupId: "",
    fromUserId: "",
    toUserId: "",
    amount: "",
    description: "",
    paymentMethod: "cash" as "cash" | "upi" | "paypal" | "bank_transfer"
  })

  const session = userAuth.getCurrentSession()
  const currentUserId = session?.user.id || "1"

  useEffect(() => {
    // Load data
    const allGroups = appData.getGroups()
    const userGroups = allGroups.filter(group => 
      group.members.some(member => member.userId === currentUserId)
    )
    setGroups(userGroups)

    const allSettlements = appData.getSettlements()
    const userSettlements = allSettlements.filter(settlement =>
      settlement.fromUserId === currentUserId || settlement.toUserId === currentUserId
    )
    setSettlements(userSettlements)

    // Calculate balances for each group
    const groupBalances: { [groupId: string]: { [userId: string]: number } } = {}
    userGroups.forEach(group => {
      groupBalances[group.id] = appData.calculateBalances(group.id)
    })
    setBalances(groupBalances)
  }, [currentUserId])

  // Calculate who owes whom
  const calculateDebts = () => {
    const debts: Array<{
      groupId: string
      groupName: string
      fromUserId: string
      fromUserName: string
      fromUserImage?: string
      toUserId: string
      toUserName: string
      toUserImage?: string
      amount: number
    }> = []

    Object.entries(balances).forEach(([groupId, groupBalance]) => {
      const group = groups.find(g => g.id === groupId)
      if (!group) return

      // Find users who owe money (negative balance) and users who are owed money (positive balance)
      const debtors = group.members.filter(member => (groupBalance[member.userId] || 0) < 0)
      const creditors = group.members.filter(member => (groupBalance[member.userId] || 0) > 0)

      // Simple debt settlement algorithm - match debtors with creditors
      debtors.forEach(debtor => {
        const debtAmount = Math.abs(groupBalance[debtor.userId] || 0)
        let remainingDebt = debtAmount

        creditors.forEach(creditor => {
          if (remainingDebt <= 0) return
          
          const creditAmount = groupBalance[creditor.userId] || 0
          if (creditAmount <= 0) return

          const settlementAmount = Math.min(remainingDebt, creditAmount)
          
          debts.push({
            groupId,
            groupName: group.name,
            fromUserId: debtor.userId,
            fromUserName: debtor.userName,
            fromUserImage: debtor.userImage,
            toUserId: creditor.userId,
            toUserName: creditor.userName,
            toUserImage: creditor.userImage,
            amount: settlementAmount
          })

          remainingDebt -= settlementAmount
          groupBalance[creditor.userId] -= settlementAmount
        })
      })
    })

    return debts.filter(debt => debt.amount > 0.01) // Only show debts > 1 cent
  }

  const debts = calculateDebts()
  const filteredDebts = selectedGroup === "all" 
    ? debts 
    : debts.filter(debt => debt.groupId === selectedGroup)

  const handleRecordPayment = () => {
    if (!formData.groupId || !formData.fromUserId || !formData.toUserId || !formData.amount) return

    const group = groups.find(g => g.id === formData.groupId)
    const fromUser = group?.members.find(m => m.userId === formData.fromUserId)
    const toUser = group?.members.find(m => m.userId === formData.toUserId)

    if (!fromUser || !toUser) return

    const newSettlement = appData.createSettlement({
      groupId: formData.groupId,
      fromUserId: formData.fromUserId,
      fromUserName: fromUser.userName,
      toUserId: formData.toUserId,
      toUserName: toUser.userName,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: new Date().toISOString(),
      status: "COMPLETED"
    })

    setSettlements(prev => [newSettlement, ...prev])
    
    // Recalculate balances
    const groupBalances: { [groupId: string]: { [userId: string]: number } } = {}
    groups.forEach(group => {
      groupBalances[group.id] = appData.calculateBalances(group.id)
    })
    setBalances(groupBalances)

    setRecordDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      groupId: "",
      fromUserId: "",
      toUserId: "",
      amount: "",
      description: "",
      paymentMethod: "cash"
    })
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "upi":
        return <Smartphone className="h-4 w-4" />
      case "paypal":
        return <CreditCard className="h-4 w-4" />
      case "bank_transfer":
        return <CreditCard className="h-4 w-4" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "upi":
        return "UPI"
      case "paypal":
        return "PayPal"
      case "bank_transfer":
        return "Bank Transfer"
      default:
        return "Cash"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settlements</h1>
            <p className="text-muted-foreground">
              Record payments and settle your debts
            </p>
          </div>
          <Dialog open={recordDialogOpen} onOpenChange={setRecordDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Record Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Record Payment</DialogTitle>
                <DialogDescription>
                  Record a payment between group members to settle debts.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="group" className="text-right">Group</Label>
                  <Select 
                    value={formData.groupId} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, groupId: value, fromUserId: "", toUserId: "" }))}
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
                
                {formData.groupId && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="from" className="text-right">From</Label>
                      <Select value={formData.fromUserId} onValueChange={(value) => setFormData(prev => ({ ...prev, fromUserId: value }))}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Who paid?" />
                        </SelectTrigger>
                        <SelectContent>
                          {groups.find(g => g.id === formData.groupId)?.members.map(member => (
                            <SelectItem key={member.userId} value={member.userId}>
                              {member.userName} {member.userId === currentUserId ? "(You)" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="to" className="text-right">To</Label>
                      <Select value={formData.toUserId} onValueChange={(value) => setFormData(prev => ({ ...prev, toUserId: value }))}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Who received?" />
                        </SelectTrigger>
                        <SelectContent>
                          {groups.find(g => g.id === formData.groupId)?.members
                            .filter(member => member.userId !== formData.fromUserId)
                            .map(member => (
                              <SelectItem key={member.userId} value={member.userId}>
                                {member.userName} {member.userId === currentUserId ? "(You)" : ""}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                
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
                  <Label htmlFor="method" className="text-right">Method</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value: any) => setFormData(prev => ({ ...prev, paymentMethod: value }))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
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
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setRecordDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRecordPayment}>
                  Record Payment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Label>Filter by group:</Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="w-[200px]">
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
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Outstanding Debts */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Outstanding Debts</h2>
            {filteredDebts.length > 0 ? (
              filteredDebts.map((debt, index) => (
                <motion.div
                  key={`${debt.groupId}-${debt.fromUserId}-${debt.toUserId}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={debt.fromUserImage} />
                            <AvatarFallback>
                              {debt.fromUserName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={debt.toUserImage} />
                            <AvatarFallback>
                              {debt.toUserName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {debt.fromUserId === currentUserId ? "You" : debt.fromUserName} owes{" "}
                              {debt.toUserId === currentUserId ? "you" : debt.toUserName}
                            </p>
                            <p className="text-sm text-muted-foreground">{debt.groupName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-red-600">
                            ${debt.amount.toFixed(2)}
                          </div>
                          {(debt.fromUserId === currentUserId || debt.toUserId === currentUserId) && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setFormData({
                                  groupId: debt.groupId,
                                  fromUserId: debt.fromUserId,
                                  toUserId: debt.toUserId,
                                  amount: debt.amount.toString(),
                                  description: "",
                                  paymentMethod: "cash"
                                })
                                setRecordDialogOpen(true)
                              }}
                            >
                              Settle
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">All settled up!</h3>
                    <p className="text-muted-foreground">
                      No outstanding debts in your groups.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recent Settlements */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Recent Settlements</h2>
            {settlements.length > 0 ? (
              settlements
                .filter(settlement => selectedGroup === "all" || settlement.groupId === selectedGroup)
                .slice(0, 10)
                .map((settlement, index) => (
                  <motion.div
                    key={settlement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {settlement.fromUserId === currentUserId ? "You" : settlement.fromUserName} paid{" "}
                                {settlement.toUserId === currentUserId ? "you" : settlement.toUserName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {groups.find(g => g.id === settlement.groupId)?.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(settlement.date).toLocaleDateString()}
                              </p>
                              {settlement.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {settlement.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-green-600">
                              ${settlement.amount.toFixed(2)}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {settlement.status === "COMPLETED" ? "Completed" : "Pending"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">No settlements yet</h3>
                    <p className="text-muted-foreground">
                      Settlement history will appear here once payments are recorded.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}