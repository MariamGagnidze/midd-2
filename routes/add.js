const express = require("express");
const path = require("path");
const { readFile, writeFile } = require("../utils/fileUtils");
const currentTime = require("../utils/time");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;
    
    if (!name || !price) {
      return res.status(400).render("add", { error: "Name and price are required" });
    }

    const items = await readFile(path.join(__dirname, "../data/productsData.json"));
    const newExpense = {
      id: generateId(items),
      name,
      price: `${price}$`,
      time: currentTime(),
    };
    items.push(newExpense);
    await writeFile(path.join(__dirname, "../data/productsData.json"), items);
    
    res.render("index", { items });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


function generateId(items) {
  const maxId = items.reduce((max, item) => (item.id > max ? item.id : max), 0);
  return maxId + 1;
}

module.exports = router;
