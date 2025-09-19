// Application data service for development
export interface Group {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: GroupMember[];
  expenses: Expense[];
}

export interface GroupMember {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userImage?: string;
  role: 'ADMIN' | 'MEMBER';
  joinedAt: string;
}

export interface Expense {
  id: string;
  groupId: string;
  title: string;
  description?: string;
  amount: number;
  paidById: string;
  paidByName: string;
  category: string;
  date: string;
  createdAt: string;
  splits: ExpenseSplit[];
}

export interface ExpenseSplit {
  id: string;
  expenseId: string;
  userId: string;
  userName: string;
  amount: number;
  settled: boolean;
}

export interface Settlement {
  id: string;
  groupId: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  amount: number;
  description?: string;
  date: string;
  status: 'PENDING' | 'COMPLETED';
}

// Type aliases for backward compatibility with Mock types
export type MockGroup = Group;
export type MockExpense = Expense;
export type MockExpenseSplit = ExpenseSplit;

// Sample data
let sampleGroups: Group[] = [
  {
    id: "1",
    name: "Weekend Trip",
    description: "Our amazing weekend getaway expenses",
    createdAt: "2024-01-15T10:00:00Z",
    members: [
      {
        id: "1",
        userId: "1",
        userName: "John Doe",
        userEmail: "john@example.com",
        userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        role: "ADMIN",
        joinedAt: "2024-01-15T10:00:00Z"
      },
      {
        id: "2", 
        userId: "2",
        userName: "Jane Smith",
        userEmail: "jane@example.com",
        userImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
        role: "MEMBER",
        joinedAt: "2024-01-15T10:30:00Z"
      },
      {
        id: "3",
        userId: "3", 
        userName: "Mike Johnson",
        userEmail: "mike@example.com",
        userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        role: "MEMBER",
        joinedAt: "2024-01-15T11:00:00Z"
      }
    ],
    expenses: [
      {
        id: "1",
        groupId: "1",
        title: "Hotel Booking",
        description: "3 nights at Grand Hotel",
        amount: 450.00,
        paidById: "1",
        paidByName: "John Doe",
        category: "Accommodation",
        date: "2024-01-20T00:00:00Z",
        createdAt: "2024-01-15T12:00:00Z",
        splits: [
          { id: "1", expenseId: "1", userId: "1", userName: "John Doe", amount: 150.00, settled: true },
          { id: "2", expenseId: "1", userId: "2", userName: "Jane Smith", amount: 150.00, settled: false },
          { id: "3", expenseId: "1", userId: "3", userName: "Mike Johnson", amount: 150.00, settled: false }
        ]
      },
      {
        id: "2",
        groupId: "1", 
        title: "Dinner at Restaurant",
        description: "Italian cuisine for the group",
        amount: 120.00,
        paidById: "2",
        paidByName: "Jane Smith",
        category: "Food",
        date: "2024-01-21T19:30:00Z",
        createdAt: "2024-01-21T20:00:00Z",
        splits: [
          { id: "4", expenseId: "2", userId: "1", userName: "John Doe", amount: 40.00, settled: false },
          { id: "5", expenseId: "2", userId: "2", userName: "Jane Smith", amount: 40.00, settled: true },
          { id: "6", expenseId: "2", userId: "3", userName: "Mike Johnson", amount: 40.00, settled: false }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Office Lunch",
    description: "Weekly team lunch expenses",
    createdAt: "2024-01-10T09:00:00Z",
    members: [
      {
        id: "4",
        userId: "1",
        userName: "John Doe", 
        userEmail: "john@example.com",
        userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        role: "ADMIN",
        joinedAt: "2024-01-10T09:00:00Z"
      },
      {
        id: "5",
        userId: "2",
        userName: "Jane Smith",
        userEmail: "jane@example.com", 
        userImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
        role: "MEMBER",
        joinedAt: "2024-01-10T09:15:00Z"
      }
    ],
    expenses: [
      {
        id: "3",
        groupId: "2",
        title: "Pizza Order",
        description: "Large pepperoni and veggie pizzas",
        amount: 45.00,
        paidById: "1",
        paidByName: "John Doe",
        category: "Food",
        date: "2024-01-22T12:30:00Z",
        createdAt: "2024-01-22T13:00:00Z",
        splits: [
          { id: "7", expenseId: "3", userId: "1", userName: "John Doe", amount: 22.50, settled: true },
          { id: "8", expenseId: "3", userId: "2", userName: "Jane Smith", amount: 22.50, settled: false }
        ]
      }
    ]
  }
];

let sampleSettlements: Settlement[] = [
  {
    id: "1",
    groupId: "1",
    fromUserId: "2",
    fromUserName: "Jane Smith",
    toUserId: "1", 
    toUserName: "John Doe",
    amount: 150.00,
    description: "Hotel booking settlement",
    date: "2024-01-23T10:00:00Z",
    status: "COMPLETED"
  }
];

// Application data management service
export const appData = {
  // Groups
  getGroups: (): Group[] => sampleGroups,
  
  getGroup: (id: string): Group | null => {
    return sampleGroups.find(g => g.id === id) || null;
  },

  createGroup: (name: string, description: string, creatorId: string, creatorName: string, creatorEmail: string): Group => {
    const newGroup: Group = {
      id: (sampleGroups.length + 1).toString(),
      name,
      description,
      createdAt: new Date().toISOString(),
      members: [{
        id: "1",
        userId: creatorId,
        userName: creatorName,
        userEmail: creatorEmail,
        role: "ADMIN",
        joinedAt: new Date().toISOString()
      }],
      expenses: []
    };
    sampleGroups.push(newGroup);
    return newGroup;
  },

  addGroupMember: (groupId: string, email: string): boolean => {
    const group = sampleGroups.find(g => g.id === groupId);
    if (!group) return false;
    
    // Check if user is already a member
    if (group.members.some(m => m.userEmail === email)) return false;
    
    const newMemberId = (Math.max(...group.members.map(m => parseInt(m.id))) + 1).toString();
    group.members.push({
      id: newMemberId,
      userId: Date.now().toString(),
      userName: email.split('@')[0],
      userEmail: email,
      role: "MEMBER",
      joinedAt: new Date().toISOString()
    });
    
    return true;
  },

  removeGroupMember: (groupId: string, userId: string): boolean => {
    const group = sampleGroups.find(g => g.id === groupId);
    if (!group) return false;
    
    const memberIndex = group.members.findIndex(m => m.userId === userId);
    if (memberIndex === -1) return false;
    
    group.members.splice(memberIndex, 1);
    return true;
  },

  createSettlement: (settlement: Omit<Settlement, 'id'>): Settlement => {
    const newSettlement: Settlement = {
      ...settlement,
      id: Date.now().toString()
    };
    sampleSettlements.push(newSettlement);
    return newSettlement;
  },

  updateGroup: (id: string, name: string, description: string): Group | null => {
    const group = sampleGroups.find(g => g.id === id);
    if (group) {
      group.name = name;
      group.description = description;
    }
    return group || null;
  },

  deleteGroup: (id: string): boolean => {
    const index = sampleGroups.findIndex(g => g.id === id);
    if (index !== -1) {
      sampleGroups.splice(index, 1);
      return true;
    }
    return false;
  },

  // Expenses
  getExpenses: (groupId?: string): Expense[] => {
    if (groupId) {
      const group = sampleGroups.find(g => g.id === groupId);
      return group?.expenses || [];
    }
    return sampleGroups.flatMap(g => g.expenses);
  },

  createExpense: (expense: Omit<Expense, 'id' | 'createdAt'>): Expense => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const group = sampleGroups.find(g => g.id === expense.groupId);
    if (group) {
      group.expenses.push(newExpense);
    }
    
    return newExpense;
  },

  updateExpense: (id: string, updates: Partial<Expense>): Expense | null => {
    for (const group of sampleGroups) {
      const expense = group.expenses.find(e => e.id === id);
      if (expense) {
        Object.assign(expense, updates);
        return expense;
      }
    }
    return null;
  },

  deleteExpense: (id: string): boolean => {
    for (const group of sampleGroups) {
      const index = group.expenses.findIndex(e => e.id === id);
      if (index !== -1) {
        group.expenses.splice(index, 1);
        return true;
      }
    }
    return false;
  },

  // Settlements
  getSettlements: (groupId?: string): Settlement[] => {
    if (groupId) {
      return sampleSettlements.filter(s => s.groupId === groupId);
    }
    return sampleSettlements;
  },

  // Calculate balances
  calculateBalances: (groupId: string): { [userId: string]: number } => {
    const group = sampleGroups.find(g => g.id === groupId);
    if (!group) return {};

    const balances: { [userId: string]: number } = {};
    
    // Initialize balances for all members
    group.members.forEach(member => {
      balances[member.userId] = 0;
    });

    // Calculate from expenses
    group.expenses.forEach(expense => {
      // Person who paid gets positive balance
      balances[expense.paidById] = (balances[expense.paidById] || 0) + expense.amount;
      
      // People who owe get negative balance
      expense.splits.forEach(split => {
        balances[split.userId] = (balances[split.userId] || 0) - split.amount;
      });
    });

    // Adjust for settlements
    const settlements = sampleSettlements.filter(s => s.groupId === groupId && s.status === 'COMPLETED');
    settlements.forEach(settlement => {
      balances[settlement.fromUserId] = (balances[settlement.fromUserId] || 0) + settlement.amount;
      balances[settlement.toUserId] = (balances[settlement.toUserId] || 0) - settlement.amount;
    });

    return balances;
  }
};