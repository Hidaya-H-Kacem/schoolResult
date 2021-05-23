var express = require('express');
var router = express.Router();
var Student = require('../models/Student');
const {
  body,
  validationResult
} = require('express-validator');
var studentsController = require('../controllers/students');

// GET /backend
router.get('/', function (req, res, next) {
  Student.find({}, (err, students) => {
    if (err) log(err);

    res.render('backend/index', {
      title: 'Backend',
      students,
    });
  })
});

// GET /backend/create
router.get('/create', function (req, res, next) {
  res.render('backend/create', {
    title: 'Backend | Create'
  });
});

// POST /backend/create
router.post('/create', [
    body('studentname')
    .trim()
    .isAlpha()
    .withMessage('Please enter a valid student name'),
    // body('cin')
    // .trim()
    // .withMessage('Please enter a valid CIN: min length = 6'),
    // body('class')
    // .notEmpty()
    // .withMessage('Class must not be empty'),
    // body('average')
    // .notEmpty()
    // .isNumeric()
    // .withMessage('Average must not be empty and must be numeric'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        req.flash('error', error.msg)
      })

      res.render('backend/create', {
        title: 'Backend',
        messages: req.flash(),
      })

      //     // Student.find({}, (err, students) => {
      //     //     res.render('/backend/create', {
      //     //         title: 'Backend',
      //     //         messages: req.flash(),
      //     //     })
      //     // })

      return;
    }

    const new_student = new Student(req.body);

    new_student.save((err) => {
      if (err) console.log(err);
      res.redirect('/backend/create')
    })
  })

// GET /backend/id/edit
router.get('/:id/edit', (req, res) => {
  Student.findById(req.params.id, (err, student) => {
    if (err) log(err)
    res.render('backend/edit', {
      title: 'Edit',
      student
    })
  })
})

// PUT /backend/:id/edit
router.put('/:id/edit', (req, res) => {
  Student.findById(req.params.id, (err, st) => {
    if (err) log(err);

    let updateStudent = Object.assign(st, req.body);

    Student.findByIdAndUpdate(req.params.id, updateStudent, (err, st) => {
      if (err) log(err);

      res.redirect(`/backend`)
    })
  })
})

// DELETE /backend/:id
router.delete('/:id', (req, res) => {
  Student.findByIdAndDelete(req.params.id, (err, deletedStudent) => {
    if (err) log(err)

    res.redirect('/backend')
  })
})

module.exports = router;