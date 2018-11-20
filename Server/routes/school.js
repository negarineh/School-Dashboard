const express 			= require('express');
const router 			  = express.Router();

const StudentController 	= require('../controllers/student.controller');
const HomeController 	    = require('../controllers/home.controller');
const StaffController     = require('../controllers/staff.controller');
const ClassController     = require('../controllers/class.controller');

const passport      	= require('passport');

require('../../middleware/passport')(passport);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"REST API"});
});

router.post(    '/staffs/headlogin',                StaffController.headLogin);

router.post(    '/students',                        StudentController.create);                                                    // C
router.get(     '/students',                        passport.authenticate('jwt', {session:false}), StudentController.get);        // R
router.put(     '/students',                        passport.authenticate('jwt', {session:false}), StudentController.update);     // U
router.delete(  '/students',                        passport.authenticate('jwt', {session:false}), StudentController.remove);     // D
router.post(    '/students/login',                  StudentController.login);
router.post(    '/students/getall',                 StudentController.getAll);
router.get(     '/students/getallstudents',         StudentController.getAllStudents);
router.post(    '/students/add_class',              StudentController.createStudentClass);
router.post(    '/students/student_class',          StudentController.studentsCurrentClasses);
router.post(    '/students/students_class_teachers',StudentController.studentsClassTeachers);

router.post(    '/staffs',                         StaffController.create);
router.post(    '/staffs/login',                   StaffController.login);
router.post(    '/staffs/getall',                  StaffController.getAll);
router.get(     '/staffs/getallstaffs',            StaffController.getAllStaffs);
router.post(    '/staffs/add_class',               StaffController.createTeacherClass);
router.post(    '/staffs/teacher_class',           StaffController.teachersCurrentClasses);
router.post(    '/staffs/teachers_class_students', StaffController.teachersClassStudents);

router.post(    '/classes',            ClassController.create);
router.get(     '/classes/getall',     ClassController.getAll);

router.post(    '/JWT',                HomeController.getJWT);

module.exports = router;
