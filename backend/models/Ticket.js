const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ticket = new Schema({
    Bus: {
        type: Schema.Types.ObjectId,
        ref: "Bus",
        required: true,
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Seat: {
        type: [Number],
        required: true,
    },
    Status: {
        type: String,
        default: "Booked",
    },
    BookingDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Ticket", Ticket);
