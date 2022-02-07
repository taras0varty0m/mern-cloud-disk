const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fileRouter = require("./routes/file.routes");
const authRouter = require("./routes/auth.routes");

const app = express();
const PORT = config.get("serverPort") || 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));

app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"));

    app.listen(PORT, () =>
      console.log("> Server is up and running on port : " + PORT)
    );
  } catch (error) {
    console.error(error);
  }
};

start();
