const express = require("express");
const path = require("path");
const { readFile, writeFile } = require("../utils/fileUtils");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const items = await readFile(path.join(__dirname, "../data/productsData.json"));
    const updatedItems = items.filter(item => item.id !== parseInt(id));
    await writeFile(path.join(__dirname, "../data/productsData.json"), updatedItems);
    
    res.render("index", { items: updatedItems });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
