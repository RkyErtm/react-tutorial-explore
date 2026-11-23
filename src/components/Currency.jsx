import React from "react";
import "../css/currency.css";
import { FaArrowAltCircleRight } from "react-icons/fa";

function Currency() {
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
            />
          </div>

          <div className="field">
            <label htmlFor="from">From</label>
            <select id="from" className="from-currency-select">
              <option value="TRY">TRY</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <FaArrowAltCircleRight className="arrow-icon" />

          <div className="field">
            <label htmlFor="to">To</label>
            <select id="to" className="to-currency-select">
              <option value="TRY">TRY</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="result">Result</label>
          <input
            id="result"
            type="number"
            className="result"
            placeholder="Result"
            disabled
          />
        </div>

        <div className="field">
          <button className="convert-button">Convert</button>
        </div>
      </div>
    </div>
  );
}

export default Currency;
