var express = require('express');
var router = express.Router();
var models = require('../models');

/* Get List 
router.get('/', function(req, res, next) {
  models.equipement.find({}).populate('category').exec(function(err, equipements){
    if(err) res.json({error: err});
        res.json(equipements);
  });
});
*/

/* Get By user_id*/
router.get('/search/user/:_id',function(req,res){
	models.equipement.find({user:req.params._id},function(err,equipement){
		if(err) res.json({error: err});
		res.json(equipement);
    });
});
/* Get list by category*/
router.get('/', function(req, res, next){
    models.equipement.aggregate([
        {
            "$group": {
                "_id": "$category",
                "equipements": { "$push": "$$ROOT" }
            }
        }
    ]).exec(function(err, results){ 
        if (err) res.json({error: err});
        models.category.populate(results, { "path": "_id" }, function(err, result) {
            if(err) res.json({error: err});
            console.log(result);
            res.json(result);
        });
     });   
});

/* Get list by category*/
router.get('/eq', function(req, res, next){
    models.equipement.aggregate([
        {
            "$group": {
                "_id": "$user",
                "equipements": { "$push": "$$ROOT" }
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
/* add equipements */
router.post('/', function(req, res, next) {
  var equipement = new models.equipement({libelle: req.body.libelle, marque: req.body.marque, category: req.body.category, user:req.body.user } );
   //var equipement = new models.equipement(req.body);
  equipement.save(function(err, b){
   if(err) res.json({error: err});
        res.json(b);
  });
});

/* GET by Id*/
router.get('/:id', function(req, res, next) {
  models.category.find({}).exec(function(e, categories){
    models.equipement.findById(req.params.id, function(err, equipement) {
      if(err) res.json({error: err});
        res.json(equipement);
        });
  });
});
/* Get By user_id*/
router.get('/search/user/:_id',function(req,res){
	models.equipement.find({user:req.params._id},function(err,equipement){
		if(err) res.json({error: err});
		res.json(equipement);
    });
});
/* Put */
router.put('/:id', function(req, res, next) {
    var data = req.body;
    if(data.posts == undefined) data.posts = [];
    
    models.equipement.findByIdAndUpdate(req.params.id,data, {new: true}, function(err, c){
        if(err) res.json({error: err});
        res.json(c);
  });
});

/* delete*/

router.delete('/:id/delete', function(req, res, next) {
  models.equipement.findByIdAndRemove(req.params.id, function(err){
        if(err) res.json({error: err});
        res.json({done: 1});
});
});

/* all equipements sorted by category's name*/
router.get('/sortbycat',function(req,res){
	Equipement.find().sort({category:1}).exec(function(err,Equipement){
		if(err) res.json({error: err});
		res.json(Equipement)
    });
});
module.exports = router;
