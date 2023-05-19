const router = require("express").Router();
const path = require("path");
const loginController = require("../controllers/login");

router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../../login.html");
  res.sendFile(filePath);
});

router.post("/", loginController.postLogin);

module.exports = router;
