const connect = require("../database/database");

exports.getUserAll = async (req, res) => {
  try {
    console.log("query running....");
    const rows = await connect.pool.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    console.log("erreur", error);
  }
};

exports.getUserById = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    console.log("query running....");
    const rows = await connect.pool.query("SELECT * FROM users WHERE id = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.log("erreur", error);
  }
};