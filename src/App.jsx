import Header from "./components/Header";
import Footer from "./components/Footer";
import CurrencyConverter from "./components/CurrencyConverter";

export default function App() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-[#0a0a1a]">
        <div className="absolute inset-0 bg-grid" />
        <div
          className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-blob1"
        />
        <div
          className="absolute top-1/3 -right-40 w-80 h-80 bg-purple-600/25 rounded-full blur-3xl animate-blob2"
        />
        <div
          className="absolute -bottom-40 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-blob3"
        />
      </div>
      <Header />
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-10">
        <CurrencyConverter />
      </main>
      <Footer />
    </div>
  );
}
