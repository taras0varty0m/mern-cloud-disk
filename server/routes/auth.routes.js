const express = require("express");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();
const AuthController = require("../controllers/auth.controller");
router.post("/registration", AuthController.registration, [
  check("email", "Incorrect email").isEmail(),
  check(
    "password",
    "Not enough strong password, = require(' characters"
  ).isLength({ min: 8 }),
]);

router.post("/login", AuthController.login);

router.get("/auth", authMiddleware, AuthController.auth);

module.exports = router;
