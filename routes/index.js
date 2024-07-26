const express = require("express");
const path = require("path");
const { readFile } = require("../utils/fileUtils");
const router = express.Router();

router.get("/", async (req, res) => {
  const items = await readFile(path.join(__dirname, "../data/productsData.json"));
  res.render("index", { items });
});

module.exports = router;
