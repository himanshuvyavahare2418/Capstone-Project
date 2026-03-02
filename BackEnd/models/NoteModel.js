const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Child",
    required: true
  },
  type: {
    type: String,
    enum: ["fever", "allergy", "reaction", "other"],
    required: true
  },
  note: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  resolved: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Note", NoteSchema);
