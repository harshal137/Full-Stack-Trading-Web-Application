import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

import axios from "axios";

axios.defaults.baseURL = "https://full-stack-trading-web-application.onrender.com";
axios.defaults.withCredentials = true;


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
    
      <Routes>
        <Route path="/dashboard/*" element={<Home />} />
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);