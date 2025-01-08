const mongoose = require("mongoose");
const router = require("express").Router();
const Bus = require("../../../models/Bus");
const User = require("../../../models/User");
const Ticket = require("../../../models/Ticket");

// router.get('/view-status',(req,res)=>{

// })

const createDefaultLayout = (Seats) => {
  var Layout = [];
  var rows = parseInt(Seats / 4);
  var rem = Seats % 4;
  for (let i = 0; i < rows; i++) {
    Layout.push([null, null, null, null]);
  }
  if (rem != 0) {
    var remRow = [];
    for (let j = 0; j < rem; j++) {
      remRow.push(null);
    }
    Layout.push(remRow);
  }
  return Layout;
};

router.post("/create", async (req, res) => {
  try {
    const { BusName, Source, Destination, StartDate, Duration, Seats } =
      req.body;
    console.log(
      BusName,
      " from ",
      Source,
      " to ",
      Destination,
      " starting at ",
      StartDate,
      " with duration of ",
      Duration,
      " hours having ",
      Seats,
      " Seats"
    );
    const bus = await Bus.findOne({ BusName });
    if (bus) {
      return res.status(200).json({ bus: "Bus already exists" });
    }
    const Layout = createDefaultLayout(Seats);

    const newBus = new Bus({
      BusName,
      Source,
      Destination,
      StartDate,
      Duration,
      Seats,
      Layout,
      CreatedBy: req.body.user.id,
    });
    await newBus.save();
    res.status(200).json({ message: "Bus Created Successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/reset", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { busId } = req.body;
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(400).json({ message: "Bus Not Found" });
    }
    console.log(bus);
    const Layout = createDefaultLayout(bus.Seats);
    bus.Layout = Layout;
    await bus.save();
    const ticket = await Ticket.find({ Bus: busId });
    // delete all tickets
    for (let i = 0; i < ticket.length; i++) {
      await Ticket.findByIdAndDelete(ticket[i]._id);
    }
    session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "Bus Tickets Reset Successfully" });
  } catch (e) {
    console.log(e);
    session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/get", async (req, res) => {
  const allBusses = await Bus.find({ CreatedBy: req.body.user.id });
  console.log(allBusses);
  res.status(200).json({ busList: allBusses });
});

router.get("/seats-view", async (req, res) => {
  const { id } = req.query;
  const bus = await Bus.findById(id).populate("Layout");
  const Layout = bus.Layout;
  let responseLayout = [];
  for (let i = 0; i < Layout.length; i++) {
    var test = []
    for (let j = 0; j < Layout[i].length; j++) {
      if (Layout[i][j] !== null) {
        const data = await User.findById(Layout[i][j]);
        obj = {
          id: Layout[i][j],
          name: data.name,
          email: data.email,
        };
        test.push(obj);
        console.log(data);
      }
      else{
        test.push(null);
      }
    }
    responseLayout.push(test);
  }
  console.log(responseLayout);
  res.status(200).json({ responseLayout });
});

module.exports = router;
