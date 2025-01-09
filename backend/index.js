const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./Routes/Common/Auth/auth");
const bus = require("./Routes/Admin/Bus/bus");
const ticket = require("./Routes/Users/Ticket/ticket")
const authenticate = require("./middleware/authenticate");
const authorize = require("./middleware/authorize");

require("./connection/connection");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

/// --------------------------------- test routes ----------------------------
app.get("/", (req, res) => {
  return res.status(200).send("API is up");
});
app.get("/test-admin", authenticate,authorize(["A"]), (req, res) => {
  return res.status(200).send("Admin MW working");
});
app.get("/test-user", authenticate,authorize(["U"]), (req, res) => {
  return res.status(200).send("User MW working");
});
/// --------------------------------- test routes ----------------------------

//common
app.use("/auth", auth);
app.get("/auth-check",authenticate,(req,res)=>{
  return res.status(200).json({isAuthenticated:true})
})

//admin
app.use("/bus", authenticate, authorize(["A"]), bus);

//user
app.use("/ticket",authenticate, authorize(["U"]),ticket)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
