var _ = require('lodash');
var Cat = require('../models/cat.js');
var express = require('express');
var router = express.Router();


/*
var app = express();
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
});
*/


module.exports = function(router) {

    
  router.route('/cat')
    
   /* .use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
    })*/
   
    /* Create*/
    .post(function (req, res, next) {
            
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
              res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
              res.setHeader('Access-Control-Allow-Credentials', true);

            var newPet = req.body;
              if(!newPet.name || !newPet.age || !newPet.type) {
                    res.sendStaus(400);
                    return false;
              } else {
                    var newCat = new Cat(req.body);
                    newCat.save(function(err) {
                        if (err) {
                            res.json({info: 'error during cat create', error: err});
                        };
                        res.json({info: 'cat created successfully'});
                    });
                }
    })

    /* Read */
    .get(function (req, res) {
        Cat.find(function(err, cats) {
            if (err) {
                res.json({info: 'error during find cats', error: err});
            };
            res.json({info: 'cats found successfully', data: cats});
        });
    });

    
/* Record detail */
  router.route('/cat/:id') 
    .get(function (req, res) {
        Cat.findById(req.params.id, function(err, cat) {
            if (err) {
                res.json({info: 'error during find cat', error: err});
            };
            if (cat) {
                res.json({info: 'cat found successfully', data: cat});
            } else {
                res.json({info: 'cat not found'});
            }
        });
    })

     /* Update */
    .put(function (req, res) {
        Cat.findById(req.params.id, function(err, cat) {
            if (err) {
                res.json({info: 'error during find cat', error: err});
            };
            if (cat) {
                _.merge(cat, req.body);
                cat.save(function(err) {
                    if (err) {
                        res.json({info: 'error during cat update', error: err});
                    };
                    res.json({info: 'cat updated successfully'});
                });
            } else {
                res.json({info: 'cat not found'});
            }

        });
    })

   
    .delete(function (req, res) {
        Cat.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove cat', error: err});
            };
            res.json({info: 'cat removed successfully'});
        });
    });


};