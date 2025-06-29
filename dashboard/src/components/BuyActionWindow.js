import React, { useState, useEffect , useContext} from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext.js';

import "./BuyActionWindow.css";

import { watchlist } from "../data/data";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockPrice, setStockPrice] = useState('');
  const [exchange, setExchange] = useState("NSE");
  const [isIntraday, setIsIntraday] = useState(true);

  const { closeBuyWindow } = useContext(GeneralContext);

  const { backendUrl, setUserData, setIsLoggedin } = useContext(AppContext)

  useEffect(() => {
    const selectedStock = watchlist.find((stock) => stock.name === uid);
    if (selectedStock) {
      setStockPrice(selectedStock.price);
    }
  }, [uid]);

  const handleBuyClick = async () => {


    try {

       const authRes = await axios.get(backendUrl + "/auth/is-auth");
    if (!authRes.data.success) {
      setUserData(false);
      setIsLoggedin(false);
      // toast.error("You must be logged in to buy stocks.");
      alert("Please Login or SignUp first")
      window.location.href = "https://onestock.netlify.app/signup";
      // window.location.href = "http://localhost:3000/signup";
    }

    // http://localhost:3002
      const {data} = await axios.post("https://full-stack-trading-web-application.onrender.com/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockQuantity*stockPrice,
      mode: "BUY",
    });

    if(data.success){
      toast.success(data.message)
    }else{
          toast.error(data.message)
        }
    
    closeBuyWindow();
    setTimeout(() => {
      window.location.reload();
    }, 2*1000);
    
      
    } catch (error) {
      toast.error(error.message)
    }
    
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="buy-window">
      {/* Header */}
      <div className="buy-header">
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

      {/* Tabs */}
      <div className="buy-tabs">
        <div>Quick</div>
        <div>Regular</div>
        <div>Cover</div>
        <div>AMO</div>
      </div>

      {/* Inputs */}
      <div className="buy-body">
        <div className="input-group">
          <label>Qty.</label>
          <input
            type="number"
            value={stockQuantity}
            // min={1}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label>Price</label>
          <input
            type="text"
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

      {/* Buttons */}
      <div className="buy-footer">
        <button className="buy-btn" onClick={handleBuyClick}>Buy</button>
        <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
      </div>
    </div>
  );
};

export default BuyActionWindow;