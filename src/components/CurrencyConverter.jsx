import React, { useEffect, useState } from "react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch currencies when component loads
  useEffect(() => {
  const fetchCurrencies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/22e965051116701189c85e2a/latest/${fromCurrency}`
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
  setResult(null); // optional (clears old result)
};


  return (
    <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Currency Converter
      </h1>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* From Currency */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          From
        </label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      {/* Swap Button */}
<div className="flex justify-center m-0">
  <button
    onClick={swapCurrencies}
    className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition"
  >
      &#x21C4; Swap
  </button>
</div>


      {/* To Currency */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          To
        </label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      {/* Convert Button */}
      <button
        onClick={convertCurrency}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
      >
        {loading ? "Converting..." : "Convert"}
      </button>

      {/* Result */}
      {result && (
        <div className="text-center mt-4">
          <p className="text-gray-500 text-sm">Converted Amount</p>
          <p className="text-2xl font-bold text-indigo-600">
            {result} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
}
