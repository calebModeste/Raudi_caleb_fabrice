const express = require("express");
const db = require("./database/database");
const cors = require("cors");
const bodyParse = require("body-parser");

// const entityRoutes = require('./routes/entityRoutes')
const carRoues = require("./routes/carRoutes");

const app = express();

app.use(cors());
app.use(bodyParse.json());

// app.use('/raudiApi/',entityRoutes)
app.use("/raudiApi/", carRoues);

app.listen(5000, () => {
  console.log("running......");
  console.log("http://localhost:5000/raudiApi/cars");
});
