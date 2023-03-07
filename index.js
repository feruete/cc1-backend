const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const users = require("./routes/users");

app.use("/api", users);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server ${port}`);
});
