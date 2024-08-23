const connect = require("../database/database");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getUserAll = async (req, res) => {
  try {
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
    const rows = await connect.pool.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    console.log("erreur", error);
  }
};

exports.register = async (req, res) => {
  const { name, email, pswd } = req.body;
  try {
    const user = await connect.pool.query(
      "SELECT * FROM users WHERE mail = ?",
      [email]
    );

    if (user.length > 0) {
      res.status(400).json({ error: "user exist" });
    }
    const hash = await bycript.hash(pswd, 10);
    await connect.pool.query(
      "INSERT INTO users (name, mail, password) VALUES (?,?,?)",
      [name, email, hash]
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
  const { email, pswd } = req.body;
  try {
    const userValid = await connect.pool.query(
      "SELECT * FROM users WHERE mail = ?",
      [email]
    );
    const user = userValid[0];
    console.log(user);

    if (userValid.length === 0) {
      res.status(401).json({ error: "user mail not exist" });
    } else {
      const passwordCheck = await bycript.compare(pswd, user.password);

      if (!passwordCheck) {
        res.status(401).json({ error: "user password not correct" });
      }
      const tokken = jwt.sign(
        { email: user.email, id: user.id },
        process.env.ApiKEY,
        {
          expiresIn: "30m",
        }
      );
      res.json({ tokken });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "login no sucess" });
  }
};

let tokkenBlacklist = [];

exports.logout = async (req, res) => {
  try {
    const tokken = req.headers.authorization.split(" ")[1];
    tokkenBlacklist.push(tokken);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const tokken = req.headers.authorization.split(" ")[1];
    console.log(tokken);

    const decoded = jwt.verify(tokken, process.env.ApiKEY);
    console.log(decoded);

    const user = await connect.pool.query("SELECT * FROM users WHERE id = ?", [
      decoded.id,
    ]);

    console.log(user);

    if (user.length > 0) {
      res.status(200).json(user[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid tokken" });
  }
};
