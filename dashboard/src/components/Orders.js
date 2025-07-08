import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import {useNavigate } from 'react-router-dom';
import { DummyDataList } from "../data/dummydata";

const dummyData = [
        { name: "Reliance", qty: 10, price: 2500, mode: "BUY" },
        { name: "TCS", qty: 5, price: 3200, mode: "SELL" },
      ]

const Orders = () => {

  const navigate = useNavigate();

const [allOrders, setAllOrders] = useState([]);

  // useEffect(() => {
  //     axios.get("http://localhost:3002/allOrders").then((res) => {
  //     // console.log(res.data);
  //     setAllOrders(res.data);
  //   });     
    
  // }, []);

  useEffect(() => {
  axios.get("http://localhost:3002/allOrders")
    .then((res) => {
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        setAllOrders(res.data);
      } else {
        // Set dummy data if response is empty
        setAllOrders(DummyDataList);
        toast.info("Using dummy data: Bcoz no user loggedIn.");
      }
    })
    .catch((error) => {
      console.error("Failed to fetch orders:", error.message);
      // Set dummy data if request fails
      setAllOrders(DummyDataList);
      toast.error("Network error — showing dummy data.");
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