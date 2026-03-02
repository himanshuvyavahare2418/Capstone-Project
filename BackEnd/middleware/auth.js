const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "No token" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");

    req.user = decoded;   // VERY IMPORTANT
    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};