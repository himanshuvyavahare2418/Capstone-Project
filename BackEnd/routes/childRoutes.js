const express = require("express");
const router = express.Router();

const {
  createChild,
  getChildren,
  getAllChildren,
  getChildById,
  updateChild,
  updateChildVaccinations,
  deleteChild
} = require("../controller/ChildController");

// middleware (JWT auth)
const auth = require("../middleware/auth");

router.post("/addchild", auth, createChild);

// Get children by parent ID
router.get("/parent/:parentId", auth, getChildren);

// Get all children (Doctor/Admin view - all patients)
router.get("/all", auth, getAllChildren);

// Get all children (alternative route for doctor)
router.get("/", auth, getChildren);

router.get("/getchild/:id", auth, getChildById);

router.put("/upchild/:id", auth, updateChild);

// Update child vaccinations (Doctor can mark vaccines as completed)
router.put("/vaccinations/:id", auth, updateChildVaccinations);

router.delete("/delchild/:id", auth, deleteChild);

module.exports = router;
