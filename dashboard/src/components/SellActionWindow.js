import React, { useState, useEffect, useContext } from "react";
import GeneralContext from "./GeneralContext"; // ✅ import your context
import { watchlist } from "../data/data";
import "./BuyActionWindow.css";


import axios from "axios";

const SellActionWindow = ({ uid }) => {
  const { closeSellWindow } = useContext(GeneralContext); // Reuse closeBuyWindow to close popup

  const [stockQuantity, setStockQuantity] = useState("");
    const [stockPrice, setStockPrice] = useState('');
    const [exchange, setExchange] = useState("NSE");
    const [isIntraday, setIsIntraday] = useState(true);

  useEffect(() => {
    const selected = watchlist.find((item) => item.name === uid);
    setStockPrice(selected.price);
  }, [uid]);

  const handleSellClick = () => {
   axios.post("https://full-stack-trading-web-application.onrender.com/sellOrder", {
      name: uid,
      quantity: stockQuantity,
      price: stockQuantity* stockPrice,
      mode: "SELL",
    });

    closeSellWindow(); // ✅ Close the window after selling
    window.location.reload();
  };

  const handleCancelClick = () => {
    closeSellWindow(); // ✅ Using context to close
  };

  return (
    <div className="buy-window">
      <div className="buy-header sell-header">
        <h2>{uid || "Loading..."}</h2>
        <div className="exchanges">
          <span
            className={exchange === "BSE" ? "selected" : ""}
            onClick={() => setExchange("BSE")}
          >
            BSE ₹{(stockPrice - 0.5)}
          </span>
          <span
            className={exchange === "NSE" ? "selected" : ""}
            onClick={() => setExchange("NSE")}
          >
            NSE ₹{stockPrice}
          </span>
        </div>
      </div>

      <div className="buy-tabs">
        <div>Quick</div>
        <div>Regular</div>
        <div>Cover</div>
        <div>AMO</div>
      </div>

      <div className="buy-body">
        <div className="input-group">
          <label>Qty.</label>
          <input
            type="number"
            value={stockQuantity}
            min={1}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label>Price</label>
          <input
            type="number"
            value={stockQuantity * stockPrice}
            disabled
          />
        </div>

        <div className="intraday-checkbox">
          <input
            type="checkbox"
            checked={isIntraday}
            onChange={() => setIsIntraday(!isIntraday)}
          />
          <span>Intraday</span>
        </div>

        <div className="info-text">Margin: N/A &nbsp;&nbsp; Charges: N/A</div>
      </div>

      <div className="buy-footer">
        <button className="sell-btn" onClick={handleSellClick}>Sell</button>
        <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
      </div>
    </div>
  );
};

export default SellActionWindow;
