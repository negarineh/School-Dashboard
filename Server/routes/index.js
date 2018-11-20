const express = require('express');
const router = express.Router();
const StudentController 	= require('../controllers/student.controller');
const StaffController     = require('../controllers/staff.controller');

/* GET home page. */
  router.post('/', (req, res) => {
    var selected = req.body;

    if (selected === 'Head' || 'Teacher') 
      StaffController.login;
    if (selected === 'Student')
      StudentController.login;

	res.json({status:"success", data:{}});
  });
  
module.exports = router;
