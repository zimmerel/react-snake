const path = require("path");

module.exports = {
  roots: [path.resolve(__dirname, "./src")],
  testMatch: ["**/*.@(test|spec).@(j|t)s?(x)"],
  testURL: "http://localhost",
  setupFilesAfterEnv: [path.resolve(__dirname, "./src/setupTests.js")]
};
