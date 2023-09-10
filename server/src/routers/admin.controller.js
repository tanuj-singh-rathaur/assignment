const express = require("express");
const { user, sequelize } = require("../../models");
const op = sequelize.Op;
const admin_auth = require("../auth/admin-auth");
const router = express.Router();

router.get("/admin", admin_auth, async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      username: req.user.username,
      role: req.user.role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
});

module.exports = router;
