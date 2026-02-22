import Header from "./components/Header";
import Footer from "./components/Footer";
import CurrencyConverter from "./components/CurrencyConverter";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <CurrencyConverter />
      </main>

      <Footer />

    </div>
  );
}
