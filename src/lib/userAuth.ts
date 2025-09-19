// User authentication service for development
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  bio?: string;
  createdAt?: string;
}

export interface UserSession {
  user: User;
  expires: string;
}

// Sample users for development
const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2", 
    name: "Jane Smith",
    email: "jane@example.com",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    createdAt: "2024-01-02T00:00:00Z"
  },
  {
    id: "3",
    name: "Mike Johnson", 
    email: "mike@example.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    createdAt: "2024-01-03T00:00:00Z"
  }
];

let activeUser: User | null = sampleUsers[0]; // Default logged in user

export const userAuth = {
  // Get current session
  getCurrentSession: (): UserSession | null => {
    if (!activeUser) return null;
    
    return {
      user: activeUser,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
    };
  },

  // Sign in with email/password
  signIn: async (email: string, password: string): Promise<User | null> => {
    const user = sampleUsers.find(u => u.email === email);
    if (user && password === "password") { // Simple password check for demo
      activeUser = user;
      return user;
    }
    return null;
  },

  // Sign up new user
  signUp: async (name: string, email: string, password: string): Promise<User | null> => {
    // Check if user already exists
    if (sampleUsers.find(u => u.email === email)) {
      return null; // User already exists
    }

    const newUser: User = {
      id: (sampleUsers.length + 1).toString(),
      name,
      email,
      image: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face`
    };

    sampleUsers.push(newUser);
    activeUser = newUser;
    return newUser;
  },

  // Sign out
  signOut: async (): Promise<void> => {
    activeUser = null;
  },

  // Get all users (for adding to groups)
  getAllUsers: (): User[] => {
    return sampleUsers;
  },

  // Get user by email
  findUserByEmail: (email: string): User | null => {
    return sampleUsers.find(u => u.email === email) || null;
  },

  // Update user
  updateUserProfile: (user: User) => {
    const index = sampleUsers.findIndex(u => u.id === user.id)
    if (index !== -1) {
      sampleUsers[index] = user
    }
  }
};