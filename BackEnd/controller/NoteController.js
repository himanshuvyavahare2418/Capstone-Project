const Note = require("../models/NoteModel");

/* CREATE NOTE */
exports.createNote = async (req, res) => {
  try {
    // Use the logged-in user's ID as parentId
    const parentId = req.user.id;
    const { childId, type, note, date } = req.body;

    const newNote = await Note.create({
      parentId,
      childId,
      type,
      note,
      date: date || new Date(),
      resolved: false
    });

    res.status(201).json({ message: "Note created successfully", note: newNote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* GET NOTES BY CHILD ID */
exports.getNotesByChild = async (req, res) => {
  try {
    const { childId } = req.params;
    const notes = await Note.find({ childId, isDeleted: false })
      .sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* GET NOTES BY PARENT ID */
exports.getNotesByParent = async (req, res) => {
  try {
    // Use the logged-in user's ID or the URL parameter
    const parentId = req.params.parentId || req.user.id;
    const notes = await Note.find({ parentId, isDeleted: false })
      .populate("childId", "firstName lastName")
      .sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* GET SINGLE NOTE */
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, isDeleted: false });
    if (!note) return res.status(404).json({ message: "Note not found" });
    
    // Verify ownership
    if (note.parentId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }
    
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* UPDATE NOTE */
exports.updateNote = async (req, res) => {
  try {
    const { type, note, date, resolved } = req.body;
    
    const existingNote = await Note.findOne({ _id: req.params.id, isDeleted: false });
    if (!existingNote) return res.status(404).json({ message: "Note not found" });

    // Verify ownership
    if (existingNote.parentId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    if (type) existingNote.type = type;
    if (note) existingNote.note = note;
    if (date) existingNote.date = date;
    if (resolved !== undefined) existingNote.resolved = resolved;

    await existingNote.save();
    res.json({ message: "Note updated successfully", note: existingNote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* TOGGLE RESOLVED STATUS */
exports.toggleResolved = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, isDeleted: false });
    if (!note) return res.status(404).json({ message: "Note not found" });

    // Verify ownership
    if (note.parentId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    note.resolved = !note.resolved;
    await note.save();
    res.json({ message: "Note status updated successfully", note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* DELETE NOTE (Soft Delete) */
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, isDeleted: false });
    if (!note) return res.status(404).json({ message: "Note not found" });

    // Verify ownership
    if (note.parentId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    await Note.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* GET ALL NOTES (Admin/Doctor) */
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ isDeleted: false })
      .populate("parentId", "name email")
      .populate("childId", "firstName lastName dateOfBirth")
      .sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
