const { Schema,Types  } = require("mongoose");

const OrdersSchema = new Schema({
  userId: {
    type: Types.ObjectId,     
    required: true,
    ref: "User",           
  },
  name: String,
  qty: Number,
  price: Number,
  mode: String,
});

module.exports = { OrdersSchema };