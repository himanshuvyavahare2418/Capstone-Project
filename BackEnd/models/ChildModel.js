const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  completedVaccines: [{
    type: String
  }],
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Virtual for full name
ChildSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Calculate age dynamically
ChildSchema.virtual("age").get(function() {
  if (!this.dateOfBirth) return "";
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  if (age < 1) {
    const months = (today.getFullYear() - birthDate.getFullYear()) * 12 + monthDiff;
    return `${Math.max(0, months)} months`;
  }
  return `${age} year${age !== 1 ? 's' : ''}`;
});

ChildSchema.set("toJSON", { virtuals: true });
ChildSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Child", ChildSchema);
