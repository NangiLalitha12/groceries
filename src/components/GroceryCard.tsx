
import React from 'react';
import { Grocery } from '../types/grocery';

interface GroceryCardProps {
  grocery: Grocery;
  index: number;
}

const GroceryCard: React.FC<GroceryCardProps> = ({ grocery, index }) => {
  return (
    <div 
      className="group relative bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        animation: 'fade-in 0.6s ease-out forwards'
      }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-emerald-100 to-teal-100">
        <img
          src={grocery.imageUrl}
          alt={grocery.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
          ${grocery.price.toFixed(2)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
          {grocery.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {grocery.description}
        </p>
        
        <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Add to Cart
        </button>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default GroceryCard;
