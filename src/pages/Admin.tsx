
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';
import { toast } from 'sonner';

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const handleAddGrocery = async (groceryData: any) => {
    try {
      await addDoc(collection(db, 'groceries'), {
        ...groceryData,
        createdAt: new Date().toISOString()
      });
      toast.success('Grocery added successfully!');
      return true;
    } catch (error) {
      console.error('Error adding grocery:', error);
      toast.error('Failed to add grocery. Please try again.');
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard user={user} onLogout={handleLogout} onAddGrocery={handleAddGrocery} />;
};

export default Admin;
