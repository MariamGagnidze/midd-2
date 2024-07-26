const express = require("express");
const path = require("path");
const apiRoutes = require("./routes/api");

const app = express();

app.set("view engine", "ejs");
app.use(express.json()); 

app.use("/", apiRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
