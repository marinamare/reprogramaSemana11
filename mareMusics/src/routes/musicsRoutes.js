const express = require("express"); 
const router = express.Router();
const controller = require("../controllers/musicsController");


router.get("/", controller.getAllMusics);
router.post("/", controller.createMusic);

module.exports = router; 