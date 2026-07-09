import React, { useEffect, useState } from "react";
import currencyNames from "../utils/currencyNames";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_API_KEY}/latest/${fromCurrency}`,
        );
        const data = await response.json();

        if (data.result === "success") {
          setRates(data.conversion_rates);
          setCurrencies(Object.keys(data.conversion_rates));
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
      setLoading(false);
    };

    fetchCurrencies();
  }, [fromCurrency]);

  const convertCurrency = () => {
    if (!amount || !rates[toCurrency]) return;
    const convertedAmount = (amount * rates[toCurrency]).toFixed(2);
    setResult(convertedAmount);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") convertCurrency();
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative backdrop-blur-xl bg-white/[0.06] border border-white/10 rounded-3xl shadow-2xl shadow-black/20 p-8 space-y-7">
        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full" />

        <div className="text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Currency Converter
          </h1>
          <p className="text-sm text-white/30 mt-1.5">
            Real-time exchange rates at your fingertips
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/50 mb-2">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-medium">
              {fromCurrency}
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="0.00"
              className="w-full pl-16 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 font-medium focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
          <div>
            <label className="block text-sm font-medium text-white/50 mb-2">
              From
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white appearance-none cursor-pointer focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.75rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.25rem",
              }}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency} className="bg-[#0a0a1a]">
                  {currency} - {currencyNames[currency] || currency}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={swapCurrencies}
            className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group mt-6 shrink-0"
            title="Swap currencies"
          >
            <svg
              className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors duration-300 group-active:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              style={{ transitionProperty: "transform, color" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>

          <div>
            <label className="block text-sm font-medium text-white/50 mb-2">
              To
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white appearance-none cursor-pointer focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.75rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.25rem",
              }}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency} className="bg-[#0a0a1a]">
                  {currency} - {currencyNames[currency] || currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={convertCurrency}
          disabled={loading}
          className="relative w-full py-3.5 rounded-2xl font-semibold text-white overflow-hidden group transition-all duration-300 disabled:opacity-60"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] group-hover:bg-right-top transition-all duration-500" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] transition-opacity duration-500" />
          <div className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Converting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 0v10m0-10V3M9 7V3m0 4H4m16 0h-5" />
                </svg>
                Convert
              </>
            )}
          </div>
        </button>

        {result && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 p-5 animate-[fadeIn_0.4s_ease-out]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <p className="text-sm text-emerald-400/70 font-medium">Converted Amount</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent mt-1">
              {result} {toCurrency}
            </p>
            <p className="text-xs text-emerald-400/40 mt-1.5">
              1 {fromCurrency} = {rates[toCurrency]?.toFixed(6)} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
