const router = require("express").Router();
const noteCtrl = require("../controller/NoteController");
const auth = require("../middleware/auth");

// Get notes by parent ID (protected) - must be before generic "/"
router.get("/parent/:parentId", auth, noteCtrl.getNotesByParent);

// Get notes by child ID (protected) - must be before generic "/"
router.get("/child/:childId", auth, noteCtrl.getNotesByChild);

// Get all notes (Admin/Doctor) - protected - should be after specific routes
router.get("/", auth, noteCtrl.getAllNotes);

// Create note (protected)
router.post("/", auth, noteCtrl.createNote);

// Toggle resolved status (protected) - must be before /:id
router.put("/:id/toggle", auth, noteCtrl.toggleResolved);

// Get single note (protected)
router.get("/:id", auth, noteCtrl.getNoteById);

// Update note (protected)
router.put("/:id", auth, noteCtrl.updateNote);

// Delete note (soft delete) (protected)
router.delete("/:id", auth, noteCtrl.deleteNote);

module.exports = router;
