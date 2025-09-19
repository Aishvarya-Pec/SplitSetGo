import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { Plus, Users, Settings, Trash2, UserPlus, UserMinus, DollarSign } from 'lucide-react'
import { userAuth } from '@/lib/userAuth'
import { appData, type Group, MockGroup } from '@/lib/appData'

export default function Groups() {
  const [groups, setGroups] = useState<MockGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [membersDialogOpen, setMembersDialogOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<MockGroup | null>(null)
  const [formData, setFormData] = useState({ name: '', description: '' })
  const [newMemberEmail, setNewMemberEmail] = useState('')
  const { toast } = useToast()
  const session = userAuth.getCurrentSession()
  const currentUser = session?.user

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setGroups(appData.getGroups())
      setLoading(false)
    }, 500)
  }, [])

  const handleCreateGroup = async () => {
    if (!formData.name.trim() || !currentUser) return

    try {
      const newGroup = appData.createGroup(
        formData.name,
        formData.description,
        currentUser.id,
        currentUser.name,
        currentUser.email
      )
      
      setGroups([...groups, newGroup])
      setFormData({ name: '', description: '' })
      setCreateDialogOpen(false)
      
      toast({
        title: "Group created",
        description: `${newGroup.name} has been created successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create group. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditGroup = async () => {
    if (!selectedGroup || !formData.name.trim()) return

    try {
      const updatedGroup = appData.updateGroup(
        selectedGroup.id,
        formData.name,
        formData.description
      )
      
      if (updatedGroup) {
        setGroups(groups.map(g => g.id === selectedGroup.id ? updatedGroup : g))
        setEditDialogOpen(false)
        setSelectedGroup(null)
        setFormData({ name: '', description: '' })
        
        toast({
          title: "Group updated",
          description: `${updatedGroup.name} has been updated successfully.`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update group. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteGroup = async (groupId: string) => {
    try {
      const success = appData.deleteGroup(groupId)
      if (success) {
        setGroups(groups.filter(g => g.id !== groupId))
        toast({
          title: "Group deleted",
          description: "Group has been deleted successfully.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete group. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddMember = async () => {
    if (!selectedGroup || !newMemberEmail.trim()) return

    try {
      const success = appData.addGroupMember(selectedGroup.id, newMemberEmail)
      if (success) {
        // Refresh groups to get updated member list
        const updatedGroups = groups.map(g => 
          g.id === selectedGroup.id 
            ? appData.getGroups().find(mg => mg.id === selectedGroup.id) || g
            : g
        )
        setGroups(updatedGroups)
        setNewMemberEmail('')
        
        toast({
          title: "Member added",
          description: `${newMemberEmail} has been added to the group.`,
        })
      } else {
        toast({
          title: "Error",
          description: "User not found or already a member.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add member. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveMember = async (userId: string) => {
    if (!selectedGroup) return

    try {
      const success = appData.removeGroupMember(selectedGroup.id, userId)
      if (success) {
        // Refresh groups to get updated member list
        const updatedGroups = groups.map(g => 
          g.id === selectedGroup.id 
            ? appData.getGroups().find(mg => mg.id === selectedGroup.id) || g
            : g
        )
        setGroups(updatedGroups)
        
        toast({
          title: "Member removed",
          description: "Member has been removed from the group.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove member. Please try again.",
        variant: "destructive",
      })
    }
  }

  const openEditDialog = (group: MockGroup) => {
    setSelectedGroup(group)
    setFormData({ name: group.name, description: group.description || '' })
    setEditDialogOpen(true)
  }

  const openMembersDialog = (group: MockGroup) => {
    setSelectedGroup(group)
    setMembersDialogOpen(true)
  }

  const isAdmin = (group: MockGroup) => {
    return currentUser && group.members.some(m => m.userId === currentUser.id && m.role === 'ADMIN')
  }

  const getTotalExpenses = (groupId: string) => {
    return appData.getExpenses()
      .filter(e => e.groupId === groupId)
      .reduce((sum, e) => sum + e.amount, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Groups</h1>
            <p className="text-muted-foreground">Manage your expense groups</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Group</DialogTitle>
                <DialogDescription>
                  Create a new group to start splitting expenses with friends.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Group Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter group name"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter group description"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateGroup} disabled={!formData.name.trim()}>
                    Create Group
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {groups.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No groups yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Create your first group to start splitting expenses with friends.
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Group
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{group.name}</CardTitle>
                      {group.description && (
                        <CardDescription className="mt-1">{group.description}</CardDescription>
                      )}
                    </div>
                    {isAdmin(group) && (
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(group)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteGroup(group.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Expenses</span>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-semibold">${getTotalExpenses(group.id).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Members ({group.members.length})</span>
                        {isAdmin(group) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openMembersDialog(group)}
                          >
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="flex -space-x-2">
                        {group.members.slice(0, 4).map((member) => (
                          <Avatar key={member.userId} className="border-2 border-background">
                            <AvatarImage src={member.userImage} />
                            <AvatarFallback>{member.userName.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        ))}
                        {group.members.length > 4 && (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted border-2 border-background text-xs font-medium">
                            +{group.members.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Group Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Group</DialogTitle>
              <DialogDescription>
                Update your group information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Group Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter group name"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description (Optional)</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter group description"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditGroup} disabled={!formData.name.trim()}>
                  Update Group
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Members Management Dialog */}
        <Dialog open={membersDialogOpen} onOpenChange={setMembersDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Manage Members</DialogTitle>
              <DialogDescription>
                Add or remove members from {selectedGroup?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="member-email">Add Member by Email</Label>
                <div className="flex space-x-2">
                  <Input
                    id="member-email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    placeholder="Enter email address"
                  />
                  <Button onClick={handleAddMember} disabled={!newMemberEmail.trim()}>
                    Add
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Current Members</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedGroup?.members.map((member) => (
                    <div key={member.userId} className="flex items-center justify-between p-2 rounded-lg border">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.userImage} />
                          <AvatarFallback>{member.userName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.userName}</p>
                          <p className="text-xs text-muted-foreground">{member.userEmail}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                         <Badge variant={member.role === 'ADMIN' ? 'default' : 'secondary'}>
                           {member.role}
                         </Badge>
                         {member.role !== 'ADMIN' && isAdmin(selectedGroup!) && (
                           <Button
                             variant="ghost"
                             size="sm"
                             onClick={() => handleRemoveMember(member.userId)}
                           >
                             <UserMinus className="h-4 w-4" />
                           </Button>
                         )}
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}