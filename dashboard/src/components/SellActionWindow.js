import React, { useState, useEffect, useContext } from "react";
import GeneralContext from "./GeneralContext"; // ✅ import your context
import { watchlist } from "../data/data";
import "./BuyActionWindow.css";
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext.js';


import axios from "axios";

const SellActionWindow = ({ uid }) => {
  const { closeSellWindow } = useContext(GeneralContext); // Reuse closeBuyWindow to close popup

  const [stockQuantity, setStockQuantity] = useState("");
    const [stockPrice, setStockPrice] = useState('');
    const [exchange, setExchange] = useState("NSE");
    const [isIntraday, setIsIntraday] = useState(true);

    
      const { backendUrl, setUserData, setIsLoggedin } = useContext(AppContext)

  useEffect(() => {
    const selected = watchlist.find((item) => item.name === uid);
    setStockPrice(selected.price);
  }, [uid]);

  const handleSellClick = async() => {

    try {

  const authRes = await axios.get(backendUrl + "/auth/is-auth");
    if (!authRes.data.success) {
      setUserData(false);
      setIsLoggedin(false);
      // toast.error("You must be logged in to buy stocks.");
      alert("Please Login or SignUp first")
      // window.location.href = "https://onestock.netlify.app/signup";
      window.location.href = "http://localhost:3000/signup";
    }

    // http://localhost:3002/
      const {data} = await axios.post("http://localhost:3002/sellOrder", {
      name: uid,
      quantity: stockQuantity,
      price: stockQuantity* stockPrice,
      mode: "SELL",
    });

    if(data.success){
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }

    closeSellWindow(); // ✅ Close the window after selling
    setTimeout(() => {
      window.location.reload();
    }, 2*1000);

    
    } 
    catch (error) {
       toast.error(error.message)
    }
   
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

        <div className="info-text">Margin: 3.4 &nbsp;&nbsp; Charges: 1.26%</div>
      </div>

      <div className="buy-footer">
        <button className="sell-btn" onClick={handleSellClick}>Sell</button>
        <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
      </div>
    </div>
  );
};

export default SellActionWindow;
