const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/vehicles", (req, res) => {
  fs.readFile(path.join(__dirname, "vehicles.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read vehicles data." });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`🚗 Server running at http://localhost:${PORT}`);
});
