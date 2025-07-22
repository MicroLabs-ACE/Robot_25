import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, database } from '../firebase/config';
import { toast } from 'react-toastify';

interface UserData {
  uid: string;
  email: string;
  name: string;
  role: 'customer' | 'chef';
  phoneNumber?: string;
}

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  register: (email: string, password: string, name: string, role: 'customer' | 'chef', phoneNumber?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isChef: boolean;
  setIsChef: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean; // <-- Add this line
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChef, setIsChef] = useState(false);

  // Add this line to compute isAuthenticated
  const isAuthenticated = !!user;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch additional user data from the database
        const userRef = ref(database, `users/${firebaseUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            name: userData.name,
            role: userData.role,
            phoneNumber: userData.phoneNumber
          });
          // Set isChef based on role
          setIsChef(userData.role === 'chef');
        }
      } else {
        setUser(null);
        setIsChef(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email: string, password: string, name: string, role: 'customer' | 'chef', phoneNumber?: string) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Store additional user data in the database
      const userData = {
        email,
        name,
        role,
        phoneNumber,
        createdAt: new Date().toISOString()
      };
      
      await set(ref(database, `users/${firebaseUser.uid}`), userData);
      
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        name,
        role,
        phoneNumber
      });
      
      toast.success('Registration successful!');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register');
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);

      // Fetch user data from the database
      const userRef = ref(database, `users/${firebaseUser.uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email!,
          name: userData.name,
          role: userData.role,
          phoneNumber: userData.phoneNumber
        });
        // Set isChef based on role
        setIsChef(userData.role === 'chef');
        toast.success('Login successful!');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to login');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Failed to logout');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout, isChef, setIsChef, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

