const express = require("express");
const { user, sequelize } = require("../../models");
const op = sequelize.Op;
const { generateAuthToken } = require("../auth/token_utils");
const user_auth = require("../auth/user-auth");
const admin_auth = require("../auth/admin-auth");
const router = express.Router();

router.post("/signup", async (req, res) => {
  let doesUsernameExist = false;

  try {
    const userData = {
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    };

    await user
      .findOne({
        where: {
          username: req.body.username,
        },
      })
      .then((user) => {
        if (user) {
          doesUsernameExist = true;
          console.log("Found user");
        } else {
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        return res.status(500).json({
          success: false,
          error: error,
        });
      });

    if (doesUsernameExist) {
      return res.status(200).json({
        success: false,
        message: "Username already exist, please enter a different one",
      });
    }

    let result = await user.create(userData);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
});

router.get("/login", async (req, res) => {
  let doesUserExist = false;
  let token;

  try {
    const userData = {
      username: req.body.username,
      password: req.body.password,
    };

    await user

      .findOne({
        where: {
          username: userData.username,
          password: userData.password,
        },
      })
      .then(async (user) => {
        if (user) {
          doesUserExist = true;
          token = await generateAuthToken(user);
          console.log("Found user");
        } else {
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        return res.status(500).json({
          success: false,
          error: error,
        });
      });

    if (doesUserExist) {
      user
        .update(
          {
            token,
          },
          {
            where: userData,
          }
        )
        .then((result) => {
          // 'result' is an array where the first element is the number of affected rows
          const affectedRows = result[0];

          if (affectedRows > 0) {
            console.log(
              `User updated successfully. ${affectedRows} rows affected.`
            );
          } else {
            console.log("User not found or no changes made.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          return res.status(500).json({
            success: false,
            error: error,
          });
        });

      return res.status(200).json({
        success: true,
        token,
      });
    } else {
      return res.status(200).json({
        success: false,
        data: "User not found, please register first",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
});

router.get("/username", user_auth, async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      username: req.user.username,
    });
  } catch (error) {}
});

module.exports = router;
