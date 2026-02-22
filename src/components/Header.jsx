import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo / Title */}
        <h1 className="text-xl font-bold text-indigo-600">
          Currency Converter
        </h1>
      </div>
    </header>
  );
}
