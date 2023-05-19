const router = require("express").Router();
// const path = require("path");
const registerController = require("../controllers/register");

router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../../register.html");
  res.sendFile(filePath);
});

router.post("/", registerController.postRegister);

module.exports = router;
