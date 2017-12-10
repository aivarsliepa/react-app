const mangoose = require("mongoose");
const { Schema } = mangoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

mangoose.model("users", userSchema);
