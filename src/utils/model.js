const fs = require("fs");
const path = require("path");

function read(fileName) {
  let data = fs.readFileSync(
    path.join(process.cwd(), "src", "database", fileName + ".json"),
    "utf-8"
  );
  return JSON.parse(data) || [];
}

module.exports = {
  read,
};
