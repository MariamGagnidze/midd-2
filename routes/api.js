const express = require("express");
const router = express.Router();

const indexRoutes = require("./index");
const addRoutes = require("./add");
const deleteRoutes = require("./delete");
const editRoutes = require("./edit");

router.use("/", indexRoutes);
router.use("/add", addRoutes);
router.use("/delete", deleteRoutes);
router.use("/edit", editRoutes);

module.exports = router;
