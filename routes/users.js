var express = require('express');
var router = express.Router();
var models = require('../models');
var jwt = require('jsonwebtoken');

router.post('/register', function(req, res, next) {
//tester si username exist
var user = new models.user({
     nom_prenom: req.body.nom_prenom,
     username: req.body.username,
     password: req.body.password,
     email: req.body.email,
     sexe: req.body.sexe,
     adresse: req.body.adresse,

     admin: false
 });
var robot = new models.robot({
   reference: req.body.reference,	
     nom: req.body.nom
  		
 });
 //user.save(function(err, u){
 //    if(err) res.json(err);
 //    res.json(u);
 //})
 robot.save(function(err, u){
    if(err) res.json(err);
	//save user only after robot is successfully saved and push its id into robots array.
	user.robots.push(u._id);
	user.save(function(err, user){
		if(err) res.json(err);
		res.json(user);
		return;
	});
	
    //res.json(u);
 });
 });


router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, require('../config/jwt'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                req.user = decoded._doc;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

router.put('/updateresume', function(req, res, next) {
    models.user.findByIdAndUpdate(req.body.id, {$set: {
		username: req.body.username,
		password: req.body.password,
        email: req.body.email,
        nom_prenom: req.body.nom_prenom,
        adresse: req.body.adresse,
		sexe: req.body.sexe,
        date_naissance: req.body.date_naissance,
    }}, {new: true}, function(err, user){
		res.json(user);
	});
    
});

router.get('/profile', function(req, res, next) {
	models.user.findById(req.user._id, function(err, user){
        return res.json(user);
    });
});

router.get('/', function(req, res, next) {
    models.user.find({}, function(err, users){
        res.json(users);
    });
});

module.exports = router;
