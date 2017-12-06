const mangoose = require("mongoose");
const { Schema } = mangoose;

const userSchema = new Schema({
  googleId: String
});

mangoose.model("users", userSchema);
