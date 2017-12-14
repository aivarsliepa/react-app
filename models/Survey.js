const mangoose = require("mongoose");
const { Schema } = mangoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  subject: String,
  title: String,
  body: String,
  recipients: { type: [RecipientSchema], select: false },
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  dateSent: Date,
  lastResponded: Date,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mangoose.model("surveys", surveySchema);
