var express = require('express');
var router = express.Router();
var Student = require('../models/Student');

// GET /
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home',
  });
});

// GET /result
router.get('/result', function (req, res) {
  Student.find({}, (err, students) => {
    if (err) log(err);

    res.render('result', {
      title: 'Result',
      students,
    });
  });
});

// GET /result/id/show
router.get('/result/:id/show', (req, res) => {
  Student.findById(req.params.id, (err, student) => {
    if(err) log(err)

    res.render('showResult', {
      title: 'Result',
      student
    })

  })
})

module.exports = router;