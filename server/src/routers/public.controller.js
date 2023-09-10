const express = require("express");
const router = express.Router();

router.get("/general", async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "This is a public API",
  });
});

module.exports = router;
