var models = require('../models');
var express = require('express');
var router = express.Router();



/*Get liste */

router.get('/', function(req, res, next) {
    models.category.find({}).exec(function(err, categories){
        if(err) res.json({error: err});
        res.json(categories);
    });
});

/* Ajouter  */ 
router.post('/', function(req, res, next) {
    var category = new models.category({name: req.body.name,equipements: req.body.equipements});
    category.save(function(err, c){
        if(err) res.json({error: err});
        res.json(c);
    });
});
/* Get by Id*/ 
router.get('/:id', function(req, res, next) {
    models.category.findById(req.params.id, function(err, c) {
       if(err) res.json({error: err});
        res.json(c);
    });
});

router.put('/:id', function(req, res) {
     var data = req.body;
    if(data.posts == undefined) data.posts = [];
   models.category.findByIdAndUpdate(req.params.id, data, {new: true}, function(err, c){
        if(err) res.json({error: err});
        res.json(c);
    });
});

router.delete('/:id/delete', function(req, res) {
    models.category.findByIdAndRemove(req.params.id, function(err) {
        if(err) res.json({error: err});
        res.json({done: 1});
    });
});

module.exports = router;
