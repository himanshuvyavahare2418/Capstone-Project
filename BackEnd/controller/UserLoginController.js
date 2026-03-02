const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* USER SIGNUP */
exports.userSignup = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email, isDeleted: false });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashedPassword });

  res.status(201).json({ message: "User signup successful" });
};

/* FIXED CREDENTIALS FOR DOCTOR AND STAFF */
const FIXED_CREDENTIALS = {
  doctor: {
    email: "doctor@babyvax.com",
    password: "doctor123",
    name: "Dr. Smith",
    role: "doctor"
  },
  staff: {
    email: "staff@babyvax.com",
    password: "staff123",
    name: "Staff Admin",
    role: "staff"
  }
};

/* USER LOGIN */
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check for fixed Doctor credentials
  if (email === FIXED_CREDENTIALS.doctor.email && password === FIXED_CREDENTIALS.doctor.password) {
    const token = jwt.sign(
      { id: "fixed-doctor-id", role: "doctor" },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Doctor login successful",
      token,
      user: {
        id: "fixed-doctor-id",
        name: FIXED_CREDENTIALS.doctor.name,
        email: FIXED_CREDENTIALS.doctor.email,
        role: "doctor"
      }
    });
  }

  // Check for fixed Staff credentials
  if (email === FIXED_CREDENTIALS.staff.email && password === FIXED_CREDENTIALS.staff.password) {
    const token = jwt.sign(
      { id: "fixed-staff-id", role: "staff" },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Staff login successful",
      token,
      user: {
        id: "fixed-staff-id",
        name: FIXED_CREDENTIALS.staff.name,
        email: FIXED_CREDENTIALS.staff.email,
        role: "staff"
      }
    });
  }

  // Check for admin credentials (same as staff for dashboard purposes)
  if (email === "admin@babyvax.com" && password === "admin123") {
    const token = jwt.sign(
      { id: "fixed-admin-id", role: "admin" },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Admin login successful",
      token,
      user: {
        id: "fixed-admin-id",
        name: "Admin User",
        email: "admin@babyvax.com",
        role: "admin"
      }
    });
  }

  // Regular database authentication for other users
  const user = await User.findOne({ email, isDeleted: false });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: "user" },
    "SECRET_KEY",
    { expiresIn: "1d" }
  );

  res.json({
    message: "User login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: "user"
    }
  });
};

/* USER COUNT */
exports.countUsers = async (req, res) => {
  const count = await User.countDocuments({ isDeleted: false });
  res.json({ count });
};

/* GET ALL USERS */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* SEARCH USERS */
exports.searchUsers = async (req, res) => {
  try {
    const { keyword } = req.query;
    const users = await User.find({
      isDeleted: false,
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ],
    }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* UPDATE USER */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ALL USERS (Admin) ================= */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false })
      .select("-password")
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET USER BY ID (Admin) ================= */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, isDeleted: false }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE USER (Admin - Soft Delete) ================= */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


