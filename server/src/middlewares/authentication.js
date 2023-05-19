const authenticationMiddleware = (req, res, next) => {
  if (req.body.email) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = authenticationMiddleware;
