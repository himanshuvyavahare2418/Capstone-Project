const router = require("express").Router();
const appointmentCtrl = require("../controller/AppointmentController");
const auth = require("../middleware/auth");

// Get appointments by parent ID (protected) - must be before generic "/"
router.get("/parent/:parentId", auth, appointmentCtrl.getAppointmentsByParent);

// Get appointments by child ID (protected) - must be before generic "/"
router.get("/child/:childId", auth, appointmentCtrl.getAppointmentsByChild);

// Get all appointments (Admin/Doctor) - protected - should be after specific routes
router.get("/", auth, appointmentCtrl.getAllAppointments);

// Create appointment (protected)
router.post("/", auth, appointmentCtrl.createAppointment);

// Get single appointment (protected)
router.get("/:id", auth, appointmentCtrl.getAppointmentById);

// Update appointment (protected)
router.put("/:id", auth, appointmentCtrl.updateAppointment);

// Update appointment status (protected)
router.put("/:id/status", auth, appointmentCtrl.updateAppointmentStatus);

// Delete appointment (soft delete) (protected)
router.delete("/:id", auth, appointmentCtrl.deleteAppointment);

module.exports = router;
