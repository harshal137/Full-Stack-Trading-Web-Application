import React, { useEffect, useState } from "react";
import { watchlist } from "../data/data"; // use your local watchlist

const dummyOrders = [
  { name: "TCS.BSE", quantity: 5, price: 3650 },
  { name: "INFY.BSE", quantity: 2, price: 1700 },
  { name: "RELIANCE.BSE", quantity: 3, price: 3800 },
];

const ProfitSection = () => {
  const [profitList, setProfitList] = useState([]);

  useEffect(() => {
    const calculated = dummyOrders.map((order) => {
      const current = watchlist.find((s) => s.name === order.name);
      const currentPrice = current ? current.price : order.price;
      const profit = (currentPrice - order.price) * order.quantity;

      return {
        ...order,
        currentPrice,
        profit,
      };
    });

    setProfitList(calculated);
  }, []);

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Profit / Loss</h2>
      {profitList.length === 0 ? (
        <p>No dummy orders available.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead>
            <tr>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Buy Price</th>
              <th className="border p-2">Current Price</th>
              <th className="border p-2">Profit</th>
              <th className="border p-2">Loss</th>
            </tr>
          </thead>
          <tbody>
            {profitList.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">₹ {item.price}</td>
                <td className="border p-2">₹ {item.currentPrice}</td>
                <td
                  className={`border p-2 font-semibold ${
                    item.profit >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₹ {item.profit.toFixed(2)}
                </td>
                <td
                  className={`border p-2 font-semibold ${
                    item.profit >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₹ {item.profit.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProfitSection;
