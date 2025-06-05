
import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg border border-white/50 animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
      
      {/* Content skeleton */}
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded-lg mb-2"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
