import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-6 text-center">
        
        <p className="text-sm">
          © {new Date().getFullYear()} Currency Converter. All rights reserved.
        </p>

        <p className="text-xs text-gray-400 mt-2">
          Built with React & Tailwind CSS
        </p>

      </div>
    </footer>
  );
}
