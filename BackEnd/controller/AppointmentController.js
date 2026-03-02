const Appointment = require("../models/AppointmentModel");

/* CREATE APPOINTMENT */
exports.createAppointment = async (req, res) => {
  try {
    // Use the logged-in user's ID as parentId
    const parentId = req.user.id;
    const { childId, date, time, notes } = req.body;

    const appointment = await Appointment.create({
      parentId,
      childId,
      date,
      time,
      notes,
      status: "pending"
    });

    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* GET APPOINTMENTS BY PARENT ID */
exports.getAppointmentsByParent = async (req, res) => {
  try {
    // Use the logged-in user's ID or the URL parameter
    const parentId = req.params.parentId || req.user.id;
    const appointments = await Appointment.find({ parentId, isDeleted: false })
      .populate("childId", "firstName lastName")
      .sort({ date: -1 });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* GET APPOINTMENTS BY CHILD ID */
exports.getAppointmentsByChild = async (req, res) => {
  try {
    const { childId } = req.params;
    const appointments = await Appointment.find({ childId, isDeleted: false })
      .sort({ date: -1 });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* GET SINGLE APPOINTMENT */
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id, isDeleted: false })
      .populate("childId", "firstName lastName");
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    
    // Verify ownership
    if (appointment.parentId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }
    
    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* UPDATE APPOINTMENT */
exports.updateAppointment = async (req, res) => {
  try {
    const { date, time, notes, status } = req.body;
    
    const appointment = await Appointment.findOne({ _id: req.params.id, isDeleted: false });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    // Verify ownership
    if (appointment.parentId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    if (date) appointment.date = date;
    if (time) appointment.time = time;
    if (notes) appointment.notes = notes;
    if (status) appointment.status = status;

    await appointment.save();
    res.json({ message: "Appointment updated successfully", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* UPDATE APPOINTMENT STATUS */
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const appointment = await Appointment.findOne({ _id: req.params.id, isDeleted: false });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = status;
    await appointment.save();
    res.json({ message: "Appointment status updated successfully", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* DELETE APPOINTMENT (Soft Delete) */
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id, isDeleted: false });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    // Verify ownership
    if (appointment.parentId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    await Appointment.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* GET ALL APPOINTMENTS (Admin/Doctor) */
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ isDeleted: false })
      .populate("parentId", "name email")
      .populate("childId", "firstName lastName dateOfBirth")
      .sort({ date: -1 });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
