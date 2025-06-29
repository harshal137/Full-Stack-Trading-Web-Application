
const authRouter = require('./routes/authRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const cookieParser = require("cookie-parser")
const path = require('path');

const {UserModel} = require('./model/UserModel.js');

require("dotenv").config();

const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;



const allowedOrigins = ['https://onestock.netlify.app/', "https://onestock.netlify.app/dashboard"]

const app = express();

app.use(express.json());
app.use(cookieParser());  

app.use(cors({
  origin: "https://onestock.netlify.app", // ✅ Exact Netlify domain
  credentials: true
}));
app.use(bodyParser.json());


app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});


app.get("/allOrders", async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});



app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();

  res.send("Order saved!");
});



app.post("/sellOrder", async (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    const order = await OrdersModel.findOne({ name }) 

    if (!order) {
      return res.json({ success: false, message: `${name} not in your orders.` })
    }

    if (order.qty < quantity) {
      return res.json({ success: false, message: `You only have ${order.quantity} shares.` })
    }

    if (order.qty === quantity) {
      await OrdersModel.deleteOne({ _id: order._id });
      return res.json({ success: true, message: `${name} fully sold and removed from orders.` });
    }

    if(order.qty>quantity){

      order.qty -= quantity;
      order.price -= price;
    }
    await order.save();

    return res.json({ success: true, message: `${name} updated after selling ${quantity}.`, updatedOrder: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error while processing sell order." });
  }

})



app.use("/auth", authRouter)

app.use("/user", userRouter)



app.get('/', (req,res)=>{
  res.send("backend working")
})


app.listen(3002, () => {
  console.log("app started")
  mongoose.connect(uri);
  console.log("DB started!");
})