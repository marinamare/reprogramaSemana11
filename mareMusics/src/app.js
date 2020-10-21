const express = require("express");
const app = express();
const index = require("./routes/index");
const musics = require("./routes/musicsRoutes");


app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use("/", index);
app.use("/musics", musics);

module.exports = app 