
import { User } from '../types';

const STORAGE_KEY = 'ecoloop_session';
const USERS_KEY = 'ecoloop_users';

// Pre-seed a test user for convenience
const seedTestUser = () => {
  const usersRaw = localStorage.getItem(USERS_KEY);
  if (!usersRaw) {
    const testUser = {
      id: 'test-user-001',
      name: 'Alex Eco',
      email: 'test@ecoloop.com',
      password: 'password123',
      role: 'consumer'
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([testUser]));
  }
};

// Execute seed on module load
seedTestUser();

export const authService = {
  // Simulate JWT generation/validation
  getToken: () => localStorage.getItem(STORAGE_KEY),
  
  setToken: (user: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Mock Register
  register: async (name: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usersRaw = localStorage.getItem(USERS_KEY);
        const users = usersRaw ? JSON.parse(usersRaw) : [];
        
        if (users.find((u: any) => u.email === email)) {
          reject(new Error('Email already registered'));
          return;
        }

        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          role: 'consumer'
        };

        users.push({ ...newUser, password }); // In real apps, password would be hashed
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        resolve(newUser);
      }, 800);
    });
  },

  // Mock Login
  login: async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usersRaw = localStorage.getItem(USERS_KEY);
        const users = usersRaw ? JSON.parse(usersRaw) : [];
        
        const user = users.find((u: any) => u.email === email && u.password === password);
        
        if (user) {
          const { password, ...userData } = user;
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials. Try test@ecoloop.com / password123'));
        }
      }, 800);
    });
  }
};
