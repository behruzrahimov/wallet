const { Level } = require("level");

// Create a database
const db = new Level("example", { valueEncoding: "json" });

module.exports = db;
