const mongoose = require("mongoose");
const router = require("express").Router();
const Bus = require("../../../models/Bus");
const Ticket = require("../../../models/Ticket");

const countNull = (arr) =>
  arr.reduce((acc, curr) => acc + curr.filter((el) => el === null).length, 0);

router.get("/bus/get", async (req, res) => {
  const busList = await Bus.find();
  res.status(200).json({ busList });
});

router.get("/seats", async (req, res) => {
  const { id } = req.query;
  const bus = await Bus.findById(id);

  const available = countNull(bus.Layout);
  res.status(200).json({ seats: bus.Seats, available, layout: bus.Layout });
});

router.post("/book", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id, seat } = req.body;
    const bus = await Bus.findById(id);
    console.log(bus);
    const [row, col] = seat;
    if(bus.Layout[row][col] !== null){
      return res.status(400).json({message:"Seat Already Booked"});
    }
    bus.Layout[row][col] = req.body.user.id;
    bus.save();
    const ticket = new Ticket({
      Bus: id,
      User: req.body.user.id,
      Seat: seat,
      Status: "Booked",
      BookingDate: Date.now(),
    });
    await ticket.save();
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ status: "Booked Successfully", ticketID: ticket._id });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.put("/cancel", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.body;
    const ticket = await Ticket.findById(id);
    const bus = await Bus.findById(ticket.Bus);
    const [row, col] = ticket.Seat;
    bus.Layout[row][col] = null;
    bus.save();
    ticket.Status = "Cancelled";
    await ticket.save();
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ status: "Cancelled Successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/booked", async (req, res) => {
  const ticket = await Ticket.find({
    User: req.body.user.id
  }).populate("Bus");
  res.status(200).json({ ticket });

});

module.exports = router;
