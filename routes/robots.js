var models = require('../models');
var express = require('express');
var router = express.Router();

/*Get liste */
//router.get('/', function(req, res, next) {
//models.robot.find({}).populate('user').exec(function(err, robots){
//  if(err) res.json({error: err});
//       res.json(robots);
//  });
//});


router.get('/', function(req, res, next){
    models.robot.aggregate([
        {
            "$group": {
                "_id": "$user",
                "robots": { "$push": "$$ROOT" }
            }
        }
    ]).exec(function(err, results){ 
        if (err) res.json({error: err});
        models.user.populate(results, { "path": "_id" }, function(err, result) {
            if(err) res.json({error: err});
            console.log(result);
            res.json(result);
        });
     });   
});

/* Add */
router.post('/', function(req, res) {
  var robot = new models.robot({reference: req.body.reference, nom: req.body.nom, user: req.body.user});
  robot.save(function(err, b){
    if(err) res.json({error: err});
        res.json(b);
        });
     });

/* Get by Id*/
router.get('/:_id', function(req, res, next) {
  /*models.user.find({}).exec(function(e, user){*/
    models.robot.findById(req.params.id, function(err, robot) {
      if(err) res.json({error: err});
      res.json({error: err});
    });
  /*});*/
    
});

router.put('/:_id', function(req, res, next) {
     var data = req.body;
        if(data.posts == undefined) data.posts = [];
  models.robot.findByIdAndUpdate(req.params.id, data, {new: true}, function(err, robot) {
    if(err) res.json({error: err});
        res.json(robot);
  });
});

    router.delete('/:id/delete', function(req, res) {
        models.robot.findByIdAndRemove(req.params.id, function(err) {
            if(err) res.json({error: err});
            res.json({done: 1});
    });
});

module.exports = router;
