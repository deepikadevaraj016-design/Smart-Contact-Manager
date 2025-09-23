const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const app = express();
const jwt = require("jsonwebtoken")
const cors = require("cors");
require("dotenv").config();
dotenv.config({ path: __dirname + "/.env" });

require("./config/db");

const authroutes = require("./routes/authroutes");
const contactroutes = require("./routes/contactroutes")
app.use(cors());

app.use(express.json());

app.use("/api", authroutes);
app.use("/api/contact", contactroutes)


app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
