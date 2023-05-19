const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis").default;
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const sql = require("./middlewares/sql");
const nosql = require("./middlewares/nosql");

const PORT = 5000;
const staticPath = path.join(__dirname, "../../");

// const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

redisClient
  .connect()
  .then(() => {
    console.log("Connected to redis successfully");
  })
  .catch((err) => {
    console.log("Could not establish a connection with redis. " + err);
  });

dotenv.config();

sql.connect((err) => {
  if (err) throw err;
  console.log("SQL Connected");
});
nosql();

app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 10,
    },
  })
);

app.get("/index.html");

app.use("/api/login", require("./routes/login"));
app.use("/api/register", require("./routes/register"));
app.use("/api/profile", require("./routes/profile"));

app.listen(PORT, () => {
  console.log(`Server Running at port ${PORT}`);
});
