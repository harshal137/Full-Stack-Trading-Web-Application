// utils/fetchStockPrices.js

import axios from "axios";

const API_KEY = "cc1d7c93280b421a8318b396d89b0cb0"; // Replace with your Twelve Data key

export const fetchStockPrices = async (symbols) => {
  const priceMap = {};

  for (const symbol of symbols) {
    try {
      const res = await axios.get("https://api.twelvedata.com/price", {
        params: { symbol, apikey: API_KEY },
      });

      if (res.data && res.data.price) {
        priceMap[symbol] = parseFloat(res.data.price);
      } else {
        priceMap[symbol] = NaN;
      }
    } catch (error) {
      console.error("Error fetching price for", symbol, error.message);
      priceMap[symbol] = NaN;
    }
  }

  return priceMap; // { "TCS.BSE": 3874.12, "INFY.BSE": 1511.23, ... }
};
