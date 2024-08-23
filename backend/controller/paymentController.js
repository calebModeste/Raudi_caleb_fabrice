const connect = require("../database/database");

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


    await connect.pool.query("",[])


    res.status(200).json({sucess:'query sucessfull'})
  } catch (error) {
      console.log("erreur", error);
  }
}
