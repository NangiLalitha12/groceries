
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import GroceryCard from '../components/GroceryCard';
import Hero from '../components/Hero';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Grocery } from '../types/grocery';

const Index = () => {
  const [groceries, setGroceries] = useState<Grocery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'groceries'));
        const groceriesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Grocery[];
        setGroceries(groceriesData);
      } catch (error) {
        console.error('Error fetching groceries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroceries();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Hero />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Fresh & Premium Groceries
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Discover our carefully selected collection of fresh, high-quality groceries 
            delivered straight to your doorstep.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : groceries.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-3xl">🛒</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No groceries available yet</h3>
            <p className="text-gray-600">Our fresh groceries will be available soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {groceries.map((grocery, index) => (
              <GroceryCard 
                key={grocery.id} 
                grocery={grocery} 
                index={index}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">FreshMart</h3>
          <p className="text-emerald-100 mb-4">Your trusted partner for fresh, quality groceries</p>
          <div className="flex justify-center space-x-6 text-sm text-emerald-200">
            <span>© 2024 FreshMart. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
