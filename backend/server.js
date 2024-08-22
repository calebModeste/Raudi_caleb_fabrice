const express = require("express");
const db = require("./database/database");
const cors = require("cors");
const bodyParse = require("body-parser");

// const entityRoutes = require('./routes/entityRoutes')
const carRoues = require('./routes/carRoutes')
const usersRoues = require('./routes/usersRoutes')
const car_optionRoues = require("./routes/car_optionRoutes");
const engine = require('./routes/engineRoutes')
const model_car = require("./routes/model_carRoutes");
const payment = require("./routes/paymentRoutes");



const app = express();

app.use(cors());
app.use(bodyParse.json());

// app.use('/raudiApi/',entityRoutes)
app.use("/raudiApi/", carRoues);
app.use("/raudiApi/", usersRoues);
app.use("/raudiApi/", car_optionRoues);
app.use("/raudiApi/", engine);
app.use("/raudiApi/", model_car);
app.use("/raudiApi/", payment);



app.listen(5000, () => {
  console.log("running......");
});