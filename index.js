const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const authRoutes = require("./routes/auth")
const habitRoutes = require("./routes/habit")

const app = express();
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Mongo connected"))
    .catch((err) => console.log("DB error", err));


app.get("/", (req, res) => {
    res.json({message: "running "});
})

app.use("/auth", authRoutes)
app.use("/habit", habitRoutes);

app.listen(3000, () => {
    console.log("running on port 3000 http://localhost:3000");
})