var express = require('express');
var router = express.Router();
const config = require('../../config/config.json')

/* GET home page. */
const index_params = {
    page: "options",
    title: "Options",
    config_menu: config.interface.menu
}

router.get('/', function(req, res, next) {
  res.render('index', index_params);
});

module.exports = router;
