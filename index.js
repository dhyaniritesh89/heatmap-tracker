const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const app = express();
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Mongo connected"))
    .catch((err) => console.log("DB error", err));


app.get("/", (req, res) => {
    res.json({message: "running "});
})

app.listen(3000, () => {
    console.log("running on port 3000 http://localhost:3000");
})