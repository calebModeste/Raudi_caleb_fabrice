const connect = require("../database/database");

exports.getAddOptionAll = async (req, res) => {
  try {
    console.log("query running....");
    const rows = await connect.pool.query("SELECT * FROM `optionadd`");
    res.status(200).json(rows);
  } catch (error) {
    console.log("erreur", error);
  }
};

exports.registerOption = async (req,res) =>{
  const {nom, prix} = req.body;
  try {
    await connect.pool.query(
      "INSERT INTO optionadd(nom, prix) VALUES (?,?)",
      [nom, prix]
    );
    res.status(200).json({success:'push it in option'});

  } catch (error) {
    console.log("erreur", error);
    
   }
}
