const User = require("../models/User");

// ======================== CREATE ========================
const createUser = async (req, res) => {
  try {
    const { username, password, email, fullName, avatarUrl, role } = req.body;

    const existing = await User.findOne({
      $or: [{ username }, { email }],
      isDeleted: false,
    });
    if (existing) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // NOTE: Hash password trước khi lưu trong thực tế (bcrypt)
    const user = await User.create({ username, password, email, fullName, avatarUrl, role });
    return res.status(201).json({ message: "User created successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ======================== GET ALL ========================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false })
      .populate("role", "name description")
      .sort({ createdAt: -1 });

    return res.status(200).json({ message: "Success", data: users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ======================== GET BY ID ========================
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id, isDeleted: false }).populate(
      "role",
      "name description"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Success", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ======================== UPDATE ========================
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, avatarUrl, role } = req.body;

    const user = await User.findOne({ _id: id, isDeleted: false });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updated = await User.findByIdAndUpdate(
      id,
      { fullName, avatarUrl, role },
      { new: true, runValidators: true }
    ).populate("role", "name description");

    return res.status(200).json({ message: "User updated successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ======================== SOFT DELETE ========================
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id, isDeleted: false });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(id, { isDeleted: true });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ======================== ENABLE (status → true) ========================
// POST /users/enable
// Body: { email, username }
const enableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({ message: "email and username are required" });
    }

    const user = await User.findOne({ email, username, isDeleted: false });
    if (!user) {
      return res.status(404).json({ message: "User not found or information is incorrect" });
    }

    if (user.status === true) {
      return res.status(400).json({ message: "User is already enabled" });
    }

    await User.findByIdAndUpdate(user._id, { status: true });
    return res.status(200).json({ message: "User enabled successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ======================== DISABLE (status → false) ========================
// POST /users/disable
// Body: { email, username }
const disableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({ message: "email and username are required" });
    }

    const user = await User.findOne({ email, username, isDeleted: false });
    if (!user) {
      return res.status(404).json({ message: "User not found or information is incorrect" });
    }

    if (user.status === false) {
      return res.status(400).json({ message: "User is already disabled" });
    }

    await User.findByIdAndUpdate(user._id, { status: false });
    return res.status(200).json({ message: "User disabled successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  enableUser,
  disableUser,
};