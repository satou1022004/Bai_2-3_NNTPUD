const Role = require("../Models/Role");

// ======================== CREATE ========================
const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existing = await Role.findOne({ name, isDeleted: false });
    if (existing) {
      return res.status(400).json({ message: "Role name already exists" });
    }

    const role = await Role.create({ name, description });
    return res.status(201).json({ message: "Role created successfully", data: role });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ======================== GET ALL ========================
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({ isDeleted: false }).sort({ createdAt: -1 });
    return res.status(200).json({ message: "Success", data: roles });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ======================== GET BY ID ========================
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findOne({ _id: id, isDeleted: false });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    return res.status(200).json({ message: "Success", data: role });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ======================== UPDATE ========================
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const role = await Role.findOne({ _id: id, isDeleted: false });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    if (name && name !== role.name) {
      const existing = await Role.findOne({ name, isDeleted: false });
      if (existing) {
        return res.status(400).json({ message: "Role name already exists" });
      }
    }

    const updated = await Role.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ message: "Role updated successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ======================== SOFT DELETE ========================
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findOne({ _id: id, isDeleted: false });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    await Role.findByIdAndUpdate(id, { isDeleted: true });
    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createRole, getAllRoles, getRoleById, updateRole, deleteRole };