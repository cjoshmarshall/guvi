const router = require("express").Router();
const path = require("path");
const profileController = require("../controllers/profile");
const authenticationMiddleware = require("../middlewares/authentication");

router.post("/profile.html", authenticationMiddleware, (req, res) => {
  const filePath = path.join(__dirname, "../../../profile.html");
  res.sendFile(filePath);
});

router.get("/", profileController.getProfileSession);

router.post("/getProfile", profileController.getProfile);

router.post("/", profileController.postProfile);

router.put("/", profileController.putProfile);

module.exports = router;
