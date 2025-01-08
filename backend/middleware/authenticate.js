const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token || token === "null") {
    return res.status(401).json({ message: "No token, Authorization Denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user = decoded.user;
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Token is invalid", e });
  }
};

module.exports = authenticate