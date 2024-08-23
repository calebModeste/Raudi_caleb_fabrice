const connect = require("../database/database");
const byCrypt = require('bcrypt')


exports.getCarAll = async (req, res) => {
  try {
    console.log("query running....",);
    const rows = await connect.pool.query(
      "SELECT c.id, c.serieCode,mc.nameModel,mc.picture,mc.doors,mc.dimension,mc.place,mc.basePrice FROM car c JOIN model_car mc ON c.IdModel = mc.id"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log("erreur", error);
  }
};

exports.getCarById = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    console.log("query running....");
    const rows = await connect.pool.query(
      "SELECT c.id, c.serieCode,mc.nameModel,mc.picture,mc.doors,mc.dimension,mc.place,mc.basePrice FROM car c JOIN model_car mc ON c.IdModel = mc.id WHERE c.id = ?",
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log("erreur", error);
  }
};

exports.registerCar = async (req,res)=>{
  const {idCar} = req.body

  try {
    const serieCode =  await byCrypt.hash('raudi_model',1);
    await connect.pool.query("INSERT INTO car(IdModel, serieCode) VALUES (?,?)",[idCar,serieCode])

    res.status(200).json({success:'it push'})

  } catch (error) {
    console.log(error)
  }
}