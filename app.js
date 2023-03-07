const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes")
require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.set('view engine', 'ejs');


const mongodb = `mongodb+srv://${process.env.MONGOOSEUSR}:${process.env.MONGOOSEPWD}@smoothierecipes.joied6a.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongodb).then((result) => app.listen(80)).catch((err) => console.log(err))


app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));

app.use(authRoutes)