const User = require('../models/Student');

module.exports = {
    index,
}

function index(req, res, next) {
    Student.find({}, (err, students) => {
      if (err) log(err);
  
      res.render('backend/index', { 
        title: 'Backend',
        students,
      });
  })
}