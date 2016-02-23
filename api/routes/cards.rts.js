//Dependency
var HSDataBase = require('../models/HSDataBase');
var request = require('request');
var express = require('express');
var router = express.Router();

//controllers
var HS_ctrl = require('../models/HSctrl');

//routing
router.get('/getNewCards',function(req,res){
    HS_ctrl.RemoveThing();
    console.log("Database removed")

    request("https://raw.githubusercontent.com/pdyck/hearthstone-db/master/cards/all-cards.json", function (error, response, body) {
            if (!error && response.statusCode == 200) {
                HS_ctrl.HSctrl(JSON.parse(body));
            }
    });
    
});


router.get('/cards',function(req,res){
        HS_ctrl.getCards().then(function(data) {
            console.log(data);
            res.json(data);
            
        });
});

router.get('/dropall',function(req,res){
        HS_ctrl.RemoveThing();
});

router.get('/card/:name',function(req,res){
        HS_ctrl.getCard(req.params.name);
});

module.exports = router;