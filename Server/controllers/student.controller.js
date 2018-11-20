const { Student, Class, Staff }  = require('../models');
const authService         = require('../../services/auth.service');
const { to, ReE, ReS }    = require('../../services/util.service');

/*jshint ignore:start*/
const create = async function(req, res){
    const body = req.body;

    if(!body.unique_key && !body.email && !body.phone){
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, user;

        [err, user] = await to(Student.create(body)); //authService.createUser(body)

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new student.', user:user.toWeb(), token:user.getJWT()}, 201);//, token:user.getJWT()
    }
}
module.exports.create = create;

const get = async function(req, res){
    let user = req.user;

    return ReS(res, {user:user.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if(err){
        if(err.message=='Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, {message :'Updated Student: '+user.email});
}
module.exports.update = update;

const remove = async function(req, res){
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if(err) return ReE(res, 'error occured trying to delete student');

    return ReS(res, {message:'Deleted Student'}, 204);
}
module.exports.remove = remove;


const login = async function(req, res){
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {token:user.getJWT(), user:user.toWeb()});
}
module.exports.login = login;

const getAll = async function(req, res){
    
    let email = req.body.email;

    Student.findAll({
        where: {email: email},
		attributes: ['id', 'first', 'last'],
		include: [{
            model:Class,
            required: true,
			// attributes: ['id', 'name', 'day'],
			through: {
                attributes: ['StudentId', 'ClassId'],
                // where:{StudentId:1}
            },
            include: [
                {
                    model:Staff
                }
            ]
          }]
        
	}).then(classes => {
	   res.send(classes);
	});

}
module.exports.getAll = getAll;

const getAllStudents = async function(req, res){
    let err, students;

        [err, students] = await to(Student.findAll({attributes: ['id', 'first', 'last', 'email', 'phone']})); //authService.createUser(body)

        if(err) return ReE(res, err, 422);

        return ReS(res, {students : students});
}
module.exports.getAllStudents = getAllStudents;

const createStudentClass = async function(req, res){
   
    let list_id        = req.body;
    let get_student_id = parseInt(list_id.StudentId);
    let get_class_id   = list_id.ClassId;
    let class_id_array = get_class_id.map(function(v) {
        return parseInt(v, 10);
      });

    Student.findById(get_student_id)
        .then(student => {
            student.addClasses(class_id_array) 
            })
        // .then(classes => console.log(classes));

    return ReS(res, {message: 'id successfully added'}, 201)
}
module.exports.createStudentClass = createStudentClass;

const studentsCurrentClasses =  function(req, res){
    let id = req.body.id;

    Student.findAll({
        where: {id: id},
		attributes: ['id', 'first', 'last'],
		include: [{
            model:Class,
            required: true,
			// attributes: ['id', 'name', 'day'],
			through: {
                attributes: ['StudentId', 'ClassId'],
                // where:{StudentId:1}
            },
          }]
        
	}).then(classes => {
	   res.send(classes);
	});
}
module.exports.studentsCurrentClasses = studentsCurrentClasses;

const studentsClassTeachers =  function(req, res){
    let email = req.body.email;
    let name = req.body.name;
   
    Student.findAll({
        where: {email:email},
		attributes: ['id', 'first', 'last'],
		include: [{
            model:Class,
            where: {name: name},
            required: true,
                include: [
                    {
                        model:Staff
                    }
                ]
		  }]
	}).then(classes => {
	   res.send(classes);
	});
}
module.exports.studentsClassTeachers = studentsClassTeachers;

/*jshint ignore:end*/
