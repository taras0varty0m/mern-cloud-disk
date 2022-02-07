const fileService = require("../services/file.service");
const File = require("../models/File");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require("config");
class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({ message: "Incorrect request", errors });

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate)
        return res
          .status(400)
          .json({ message: `User with email ${email} already registered` });

      const hashPassword = await bcrypt.hash(password, 8);
      const user = new User({ email, password: hashPassword });
      await user.save();

      await fileService.createDir(new File({ user: user.id, name: "" }));

      const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
        expiresIn: "1h",
      });

      return res.json({
        message: "User registered successfully",
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) return res.status(404).json({ message: "User not found" });

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword)
        return res.status(400).json({ message: "Invalid password" });

      const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
        expiresIn: "1h",
      });

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
  async auth(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id });

      const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
        expiresIn: "1h",
      });

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = new AuthController();
