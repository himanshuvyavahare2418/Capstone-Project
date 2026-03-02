const Child = require("../models/ChildModel");

/*
--------------------------------
CREATE CHILD
--------------------------------
*/
exports.createChild = async (req, res) => {
  try {
    const child = new Child({
      ...req.body,
      parentId: req.user.id   // login user id
    });

    await child.save();

    res.status(201).json({
      success: true,
      message: "Child added successfully",
      data: child
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*
--------------------------------
GET ALL CHILDREN (Parent wise)
--------------------------------
*/
exports.getChildren = async (req, res) => {
  try {
    // Get parentId from URL params or use logged-in user's id
    const parentId = req.params.parentId || req.user.id;
    
    const children = await Child.find({
      parentId: parentId,
      isDeleted: false
    }).sort({ createdAt: -1 });

    res.json(children);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*
--------------------------------
GET ALL CHILDREN (Doctor/Admin view - all patients)
--------------------------------
*/
exports.getAllChildren = async (req, res) => {
  try {
    // Doctors and admins can see all children
    const children = await Child.find({ isDeleted: false })
      .populate("parentId", "name email")
      .sort({ createdAt: -1 });

    res.json(children);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*
--------------------------------
UPDATE CHILD VACCINATIONS (Doctor can mark vaccines as completed)
--------------------------------
*/
exports.updateChildVaccinations = async (req, res) => {
  try {
    const { id } = req.params;
    const { completedVaccines } = req.body;

    const child = await Child.findById(id);
    if (!child || child.isDeleted) {
      return res.status(404).json({ message: "Child not found" });
    }

    // Update completed vaccines
    if (completedVaccines) {
      child.completedVaccines = completedVaccines;
    }

    await child.save();

    res.json({
      message: "Vaccination records updated successfully",
      data: child
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*
--------------------------------
ADD SINGLE VACCINE TO CHILD (Doctor can add one vaccine at a time)
--------------------------------
exports.addVaccineToChild = async (req, res) => {
  try {
    const { id } = req.params;
    const { vaccineName } = req.body;

    const child = await Child.findById(id);
    if (!child || child.isDeleted) {
      return res.status(404).json({ message: "Child not found" });
    }

    // Add vaccine if not already present
    if (vaccineName && !child.completedVaccines.includes(vaccineName)) {
      child.completedVaccines.push(vaccineName);
      await child.save();
    }

    res.json({
      message: "Vaccine added successfully",
      data: child
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/


/*
--------------------------------
GET SINGLE CHILD
--------------------------------
*/
exports.getChildById = async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);

    if (!child || child.isDeleted) {
      return res.status(404).json({ message: "Child not found" });
    }

    // Verify the user owns this child or is admin
    if (child.parentId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(child);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*
--------------------------------
UPDATE CHILD
--------------------------------
*/
exports.updateChild = async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);

    if (!child || child.isDeleted) {
      return res.status(404).json({ message: "Child not found" });
    }

    // Verify the user owns this child
    if (child.parentId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedChild = await Child.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Child updated successfully",
      data: updatedChild
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*
--------------------------------
DELETE CHILD (Soft Delete)
--------------------------------
*/
exports.deleteChild = async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);

    if (!child || child.isDeleted) {
      return res.status(404).json({ message: "Child not found" });
    }

    // Verify the user owns this child
    if (child.parentId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Child.findByIdAndUpdate(req.params.id, {
      isDeleted: true
    });

    res.json({ message: "Child deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
