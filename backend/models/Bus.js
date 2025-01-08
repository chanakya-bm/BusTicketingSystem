const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bus = new Schema({
  BusName: {
    type: String,
    required: true,
    unique:true
  },
  Source: {
    type: String,
    required: true,
  },
  Destination: {
    type: String,
    required: true,
  },
  StartDate: {
    type: Date,
    required: true,
  },
  Duration: {
    type: Number,
    required: true,
  },
  CreatedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Seats: {  
    type: Number,
    default: 8,
  },
  Layout: {
    type: [[Schema.Types.ObjectId]],
    ref:"User",
    default: [
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
});

module.exports = mongoose.model("Bus", Bus);
