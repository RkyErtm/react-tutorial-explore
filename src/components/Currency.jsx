import React, { useState } from "react";
import "../css/currency.css";
import { FaArrowAltCircleRight } from "react-icons/fa";
import axios from "axios";

let BASE_URL = import.meta.env.VITE_BASE_URL;
let API_KEY = import.meta.env.VITE_API_KEY;

function Currency() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [result, setResult] = useState(0);

  const exchange = async () => {
    const url = `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`;
    const resp = await axios.get(url);
    const result = (resp.data.data[toCurrency] * amount).toFixed(2);
    setResult(result);
  };

  return (
    <div className="currency-container">
      <div className="currency-card">
        <h1 className="currency-title">Currency Converter</h1>

        <div className="currency-row">
          <div className="field">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              placeholder="Enter amount"
              className="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="from">From</label>
            <select
              id="from"
              className="from-currency-select"
              onChange={(e) => setFromCurrency(e.target.value)}
              value={fromCurrency}
            >
              <option value="TRY">TRY</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <FaArrowAltCircleRight className="arrow-icon" />

          <div className="field">
            <label htmlFor="to">To</label>
            <select
              id="to"
              className="to-currency-select"
              onChange={(e) => setToCurrency(e.target.value)}
              value={toCurrency}
            >
              <option value="TRY">TRY</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="result">Result</label>
          <input
            value={result}
            id="result"
            type="number"
            className="result"
            placeholder="Result"
            disabled
          />
        </div>

        <div className="field">
          <button onClick={exchange} className="convert-button">
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}

export default Currency;
