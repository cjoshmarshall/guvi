const mongoose = require("mongoose");

const nosql = () => {
  mongoose
    .connect(process.env.NOSQL_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
};

module.exports = nosql;
