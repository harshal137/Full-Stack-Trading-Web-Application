import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { Link } from "react-router-dom";

const Orders = () => {

const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get("https://full-stack-trading-web-application.onrender.com/allOrders").then((res) => {
      // console.log(res.data);
      setAllOrders(res.data);
    });
  }, []);

  return (
    <>
    <h3 className="title">Orders ({allOrders.length})</h3>
    <div className="orders">
      <div className="order-table">
        <table>
          <tr>
            <th>Name</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Mode</th>
          </tr>

          {allOrders.map((stock, index) => {
            

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{stock.mode}</td>
               
              </tr>
            );
          })}
        </table>
      </div>

      
    </div>
    </>
  );
};


export default Orders;