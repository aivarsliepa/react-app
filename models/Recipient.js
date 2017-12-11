const mangoose = require("mongoose");
const { Schema } = mangoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
