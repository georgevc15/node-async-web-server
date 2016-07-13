
var _ = require('lodash');
var Cat = require('../models/cat.js');


module.exports = function(app) {
    /* Create */
    app.post('/cat', function (req, res) {
        var newCat = new Cat(req.body);
        newCat.save(function(err) {
            if (err) {
                res.json({info: 'error during cat create', error: err});
            };
            res.json({info: 'cat created successfully'});
        });
    });

    /* Read */
    app.get('/cat', function (req, res) {
        Cat.find(function(err, cats) {
            if (err) {
                res.json({info: 'error during find cats', error: err});
            };
            res.json({info: 'cats found successfully', data: cats});
        });
    });

    app.get('/cat/:id', function (req, res) {
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
    });

    /* Update */
    app.put('/cat/:id', function (req, res) {
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
    });

    /* Delete */
    app.delete('/cat/:id', function (req, res) {
        Cat.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove cat', error: err});
            };
            res.json({info: 'cat removed successfully'});
        });
    });
};



/*

var express = require('express');
var router = express.Router();

module.exports = function(router) {

  router.route('/cat')
       
    /* Create
    .post(function (req, res, next) {
            
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

    /* Read 
    .get(function (req, res) {
        Cat.find(function(err, cats) {
            if (err) {
                res.json({info: 'error during find cats', error: err});
            };
            res.json({info: 'cats found successfully', data: cats});
        });
    });

    
/* Record detail 
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

     /* Update 
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

   
    .delete(function (req, res, next) {

        Cat.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove cat', error: err});
            };
            res.json({info: 'cat removed successfully'});
        });
    
            next();
    });

      
};
*/