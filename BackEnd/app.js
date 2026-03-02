require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Baby-Vaccinee")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/user", require("./routes/UserLoginRoute"));
app.use("/contact", require("./routes/contactRoutes"));
app.use("/child", require("./routes/childRoutes"));
app.use("/appointment", require("./routes/appointmentRoutes"));
app.use("/note", require("./routes/noteRoutes"));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
