const fs = require("fs");
const File = require("../models/File");
const config = require("config");

class FileService {
  createDir(file) {
    const filePath = `${config.get("filePath")}/${file.user}/${file.path}`;

    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);

          return resolve({ message: "File was created successfully" });
        } else {
          return reject({ message: "File was already created" });
        }
      } catch (error) {
        reject({ message: "File error" });
      }
    });
  }
}

module.exports = new FileService();
