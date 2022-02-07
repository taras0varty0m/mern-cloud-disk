const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");
const fileController = require("../controllers/file.controller");

router.post("", authMiddleware, fileController.createDir);
router.post("/upload", authMiddleware, fileController.uploadFile);
router.get("", authMiddleware, fileController.getFiles);

module.exports = router;
