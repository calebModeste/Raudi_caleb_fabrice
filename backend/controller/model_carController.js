const connect = require("../database/database");

exports.getModel_carAll = async (req, res) => {
  try {
    console.log("query running....");
    const rows = await connect.pool.query("SELECT * FROM model_car");
    res.status(200).json(rows);
  } catch (error) {
    console.log("erreur", error);
  }
};
exports.getModel_carById = async (req, res) => {
  let id = parseInt(req.params.id)
  try {
    console.log("query running....");
    const rows = await connect.pool.query("SELECT * FROM model_car WHERE id = ?",[id]);
    res.status(200).json(rows);
  } catch (error) {
    console.log("erreur", error);
  }
};
