const connect = require("../database/database");

exports.getCarAll = async (req, res) => {
  try {
    console.log("query running....");
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