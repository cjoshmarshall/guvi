const sql = require("../middlewares/sql");
const bcrypt = require("bcrypt");

exports.postRegister = async (req, res, next) => {
  const { email, password } = req.body;

  const q = "SELECT * FROM users WHERE email=?";

  sql.query(q, [email], (err, data) => {
    if (err) return res.sendStatus(500);

    if (email === "") return res.sendStatus(404);

    // check existing user
    if (data.length) return res.status(409).json("User Already Exists");

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // insert user
    const q = "INSERT INTO users (`email`,`password`) VALUES (?)";
    const values = [email, hash];

    sql.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      res.status(200).json(data);
    });
  });
};
