const express = require("express");
const path = require("path");
const { readFile, writeFile } = require("../utils/fileUtils");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const items = await readFile(path.join(__dirname, "../data/productsData.json"));
  const item = items.find(item => item.id === parseInt(id));
  res.render("edit", { item });
});

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const items = await readFile(path.join(__dirname, "../data/productsData.json"));
    const index = items.findIndex(item => item.id === parseInt(id));
    
    if (index !== -1) {
      items[index].name = name;
      items[index].price = `${price}$`;
      await writeFile(path.join(__dirname, "../data/productsData.json"), items);
    }
    
    res.render("index", { items });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
