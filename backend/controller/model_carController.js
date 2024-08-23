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

exports.pushNewModel = async (req,res) =>{
  const {Model,picture,doors,Engine,L,l,H,place,prix } = req.body
  const dimension = `L x L x H: ${L} x ${l} x ${H} mm`;

  try {
        await connect.pool.query(
          "INSERT INTO model_car(nameModel, picture, doors, idEngine, dimension, place, basePrice) VALUES (?,?,?,?,?,?,?)",
          [Model, picture, doors, Engine,dimension, place, prix]
        );

        res.status(200).json({ success: "it push" });
  } catch (error) {
    console.log("erreur", error);
  }
}