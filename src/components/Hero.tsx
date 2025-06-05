
import React from 'react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative container mx-auto px-4 py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Fresh<span className="text-emerald-200">Mart</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-emerald-100 animate-fade-in">
            Premium quality groceries delivered fresh to your doorstep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <div className="bg-white/20 backdrop-blur-md rounded-full px-8 py-3 border border-white/30">
              <span className="text-lg font-semibold">🌱 100% Organic</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-full px-8 py-3 border border-white/30">
              <span className="text-lg font-semibold">🚚 Fast Delivery</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-full px-8 py-3 border border-white/30">
              <span className="text-lg font-semibold">💎 Premium Quality</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-bounce delay-75">
        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
      </div>
      <div className="absolute top-40 right-20 animate-bounce delay-150">
        <div className="w-6 h-6 bg-emerald-300/30 rounded-full"></div>
      </div>
      <div className="absolute bottom-20 left-1/4 animate-bounce delay-300">
        <div className="w-4 h-4 bg-teal-300/40 rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
