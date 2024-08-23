const connect = require("../database/database");
const byCrypt =require('bcrypt')

exports.getPaymentAll = async (req, res) => {
  try {
    console.log("query running....");
    const rows = await connect.pool.query(
      "SELECT payment.*, users.name, car.serieCode FROM (payment,users,car) WHERE (payment.idUser = users.id and payment.idCar = car.id)"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log("erreur", error);
  }
};



exports.Payed = async(req,res) =>{
  const {idUser,idCar,price} = req.body

  try {
    //  const sericode = await connect.pool.query(
    //    "SELECT car.serieCode FROM `payment` JOIN car on payment.idCar = car.id WHERE payment.idUser = ? AND payment.idCar =?"
    //    [idUser,idCar]
    //   );

    //   sericode = sericode

      const code = await byCrypt.hash("facture", 1);


    await connect.pool.query(
      "INSERT INTO `payment`(idUser, idCar, CodeFacture, prixTotal) VALUES (?,?,?,?)",
      [idUser, idCar, code, price]
    );
    res.status(200).json({sucess:'query sucessfull'})
  } catch (error) {
      console.log("erreur", error);
  }
}
