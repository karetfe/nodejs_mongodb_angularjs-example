var express = require('express');
var router = express.Router();
var models = require('../models');


/* GET rappel by _id*/
router.get('/:id', function(req, res, next) {
    models.rappel.findById(req.params.id, function(err, rappel) {
      if(err) res.json({error: err});
        res.json(rappel);
        });
  });

/* Get By robot_id */
router.get('/search/robot/:_id',function(req,res){
	models.rappel.find({robot:req.params._id},function(err,rappel){
		if(err) res.json({error: err});
		res.json(rappel);
    });
});

/* Get By robot_id where suppr=0 */
router.get('/search/robot/suppre/:_id',function(req,res){
  var suppre = req.body.suppre;   
	models.rappel.find({robot:req.params._id}, function(err,rappel){
		if(err) res.json({error: err});
		res.json(rappel);
    }).select({ "suppre": 0});
});

/* Get list by robot*/
router.get('/', function(req, res, next){
    models.rappel.aggregate([
        {
            "$group": {
                "_id": "$robot",
                "rappels": { "$push": "$$ROOT" }
            }
        }
    ]).exec(function(err, results){ 
        if (err) res.json({error: err});
        models.robot.populate(results, { "path": "_id" }, function(err, result) {
            if(err) res.json({error: err});
            console.log(result);
            res.json(result);
        });
     });   
});

/* add rappels */
router.post('/', function(req, res, next) {
  var rappel = new models.rappel({titre: req.body.titre, date_rappel: req.body.date_rappel, heure_rappel: req.body.heure_rappel, type: req.body.type, modif: req.body.modif, suppre: req.body.suppre, repitation: req.body.repitation, robot: req.body.robot } );
  rappel.save(function(err, b){
   if(err) res.json({error: err});
        res.json(b);
  });
});

/* update rappel by autoincrement modif {$inc: { modif: 1} }*/
router.put('/:id', function(req, res, next) {
    var data = req.body;
    if(data.posts == undefined) data.posts = [];    
    models.rappel.findByIdAndUpdate(req.params.id,data, {new: true}, function(err, c){
        if(err) res.json({error: err});
        res.json(c);
        //res.json(c).send({modif: c.modif});
  });
});

module.exports = router;
