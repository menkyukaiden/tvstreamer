var express = require('express');
var router = express.Router();
const config = require('../../config/config.json')

const index_params = {
    page: "tuning_settings",
    title: "Tuning Settings",
    config_menu: config.interface.menu
}

router.get('/', function(req, res, next) {
  res.render('index', index_params);
});

module.exports = router;
