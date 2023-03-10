const graphql = require("graphql");
const connection = require('./connection');
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// module.exports=schema;
module.exports = mongoose.model("User", userSchema);
