const { Schema, Types  } = require("mongoose");

const OrdersSchema = new Schema({
  userId : {
    type: Types.ObjectId,       
    ref: "user",               
  },
  name: String,
  qty: Number,
  price: Number,
  mode: String,
});

module.exports = { OrdersSchema };