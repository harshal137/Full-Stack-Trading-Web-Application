const { model } = require("mongoose");

const { UserSchema } = require("../schemas/UserSchema.js");

const userModel = model("user", UserSchema);

module.exports = userModel;