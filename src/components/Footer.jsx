import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-50 border-t border-white/5 backdrop-blur-xl bg-white/5">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} CurrencyX. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
