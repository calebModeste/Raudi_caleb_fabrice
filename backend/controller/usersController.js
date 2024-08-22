const connect = require("../database/database");
const bycript = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.getUserAll = async (req, res) => {
  try {
    console.log("query running....",[nom, prenom]);
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


exports.register = async (req, res) => {
  const { name, mail, password } = req.body;
  try {
    const user = await connect.pool.query("SELECT * FROM users WHERE mail = ?", [
      mail,
    ]);

    if (user.length > 0) {
      res.status(400).json({ error: "user exist" });
    }
      const hash = await bycript.hash(password, 10);
       await connect.pool.query(
        "INSERT INTO users (name, mail, password) VALUES (?,?,?)",[
          name, mail, hash
        ]
      );
      const tokken = jwt.sign({ email: user.email }, process.env.ApiKEY, {
        expiresIn: "1h",
      });
      res.json({ tokken });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "inscription no sucess" });
  }
};


exports.login = async (req, res) => {
  const { mail, password } = req.body;
  try {
    const userValid = await connect.pool.query(
      "SELECT * FROM users WHERE mail = ?",
      [mail]
    );
    const user = userValid[0];
    console.log(user)

    if (userValid.length === 0) {
      res.status(401).json({ error: "user mail not existe" });
    } else {
      const passwordCheck = await bycript.compare(password, user.password);

      if (!passwordCheck) {
        res.status(401).json({ error: "user password not correct" });
      }
      const tokken = jwt.sign({ mail: user.mail }, process.env.ApiKEY, {
        expiresIn: "30m",
      });
      res.json({ tokken });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "login no sucess" });
  }
};