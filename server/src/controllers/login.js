const sql = require("../middlewares/sql");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const q = "SELECT * FROM users where email=?";

  sql.query(q, [email], (err, data) => {
    if (err) return res.sendStatus(500);

    if (data.length === 0) return res.status(404).json("User not found");

    const { password: dataPassword, ...rest } = data[0];

    // check password
    const isPassword = bcrypt.compareSync(password, dataPassword);
    if (!isPassword) return res.status(400).json("Password is Wrong");

    req.session.email = email;

    res.status(200).json({ ...rest });
  });
};
