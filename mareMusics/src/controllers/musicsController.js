const musics = require("../models/musics.json");

const getAllMusics = (req, res) => {
    console.log(req.url);
    res.status(200).send(musics)
}

module.exports = {
    getAllMusics,
}