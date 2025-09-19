import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trash2, UserPlus, Crown, User } from "lucide-react"
import { motion } from "framer-motion"

interface GroupMember {
  id: string
  user: {
    id: string
    name: string
    email: string
    image?: string
  }
  role: string
}

interface GroupMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groupId: string
  members: GroupMember[]
  currentUserId: string
  isAdmin: boolean
  onMemberAdded: () => void
  onMemberRemoved: () => void
}

export const GroupMemberDialog = ({
  open,
  onOpenChange,
  groupId,
  members,
  currentUserId,
  isAdmin,
  onMemberAdded,
  onMemberRemoved
}: GroupMemberDialogProps) => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/groups/${groupId}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      if (response.ok) {
        setEmail("")
        onMemberAdded()
      } else {
        const data = await response.json()
        setError(data.error || "Failed to add member")
      }
    } catch (error) {
      setError("Failed to add member")
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveMember = async (userId: string) => {
    if (!confirm("Are you sure you want to remove this member?")) return

    try {
      const response = await fetch(`/api/groups/${groupId}/members`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        onMemberRemoved()
      } else {
        const data = await response.json()
        alert(data.error || "Failed to remove member")
      }
    } catch (error) {
      alert("Failed to remove member")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Group Members
          </DialogTitle>
          <DialogDescription>
            Manage who can access this group and split expenses.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add Member Form */}
          {isAdmin && (
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <Label htmlFor="member-email">Add Member by Email</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="member-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    disabled={loading}
                  />
                  <Button type="submit" disabled={loading || !email.trim()}>
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
                {error && (
                  <p className="text-sm text-destructive mt-1">{error}</p>
                )}
              </div>
            </form>
          )}

          {/* Members List */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              Members ({members.length})
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.user.image} />
                      <AvatarFallback className="text-xs">
                        {member.user.name?.charAt(0) || member.user.email.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {member.user.name || member.user.email}
                        {member.user.id === currentUserId && (
                          <span className="text-muted-foreground"> (You)</span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {member.user.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={member.role === "ADMIN" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {member.role === "ADMIN" ? (
                        <>
                          <Crown className="h-3 w-3 mr-1" />
                          Admin
                        </>
                      ) : (
                        "Member"
                      )}
                    </Badge>
                    
                    {isAdmin && member.user.id !== currentUserId && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveMember(member.user.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}