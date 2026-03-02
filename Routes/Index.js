const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  enableUser,
  disableUser,
} = require("../Controllers/userController");

const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require("../Controllers/roleController");

// ── USER ROUTES ──────────────────────────────────────────
router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.post("/users/enable", enableUser);
router.post("/users/disable", disableUser);

// ── ROLE ROUTES ──────────────────────────────────────────
router.post("/roles", createRole);
router.get("/roles", getAllRoles);
router.get("/roles/:id", getRoleById);
router.put("/roles/:id", updateRole);
router.delete("/roles/:id", deleteRole);

module.exports = router;