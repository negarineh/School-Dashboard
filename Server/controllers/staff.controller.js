const { Staff, Class, Student }     = require('../models');
const { TeacherClass }              = require('../models');
const authService                   = require('../../services/auth.service');
const { to, ReE, ReS }              = require('../../services/util.service');

/*jshint ignore:start*/
const create = async function(req, res){
    const body = req.body;

    if(!body.unique_key && !body.email && !body.phone){
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, user;

        [err, user] = await to(Staff.create(body)); //authService.createUser(body)

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new staff.', user:user.toWeb(), token:user.getJWT()}, 201);//, token:user.getJWT()
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
    return ReS(res, {message :'Updated Staff: '+user.email});
}
module.exports.update = update;

const remove = async function(req, res){
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if(err) return ReE(res, 'error occured trying to delete staff');

    return ReS(res, {message:'Deleted Staff'}, 204);
}
module.exports.remove = remove;

const headLogin = async function(req, res){
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authHead(req.body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {token:user.getJWT(), user:user.toWeb()});
}
module.exports.headLogin = headLogin;

const login = async function(req, res){
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authStaff(req.body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {token:user.getJWT(), user:user.toWeb()});
}
module.exports.login = login;

const getAll = async function(req, res){
    let email = req.body.email;

    Staff.findAll({
        where: {email:email},
		attributes: ['id', 'first', 'last'],
		include: [{
            model:Class,
            attributes: ['id', 'name', 'day', 'hour'],
            required: true,
                include: [
                    {
                        model:Student,
                        attributes: ['id', 'first', 'last'],
                    }
                ]
		  }]
	}).then(classes => {
	   res.send(classes);
	});
}
module.exports.getAll = getAll;

const getAllStaffs = async function(req, res){
    let err, staffs;

        [err, staffs] = await to(Staff.findAll({attributes: ['id', 'first', 'last', 'email', 'phone']})); //authService.createUser(body)

        if(err) return ReE(res, err, 422);

        return ReS(res, {staffs : staffs});
}
module.exports.getAllStaffs = getAllStaffs;

const createTeacherClass = async function(req, res){
   
    let list_id        = req.body;
    let get_staff_id   = parseInt(list_id.StaffId);
    let get_class_id   = list_id.ClassId;
    let class_id_array = get_class_id.map(function(v) {
        return parseInt(v, 10);
      });
    console.log(get_staff_id, class_id_array);

    Staff.findById(get_staff_id)
        .then(staff => {
            staff.addClasses(class_id_array) 
            })
        // .then(classes => console.log(classes));

    return ReS(res, {message: 'id successfully added'}, 201)
}
module.exports.createTeacherClass = createTeacherClass;

const teachersCurrentClasses =  function(req, res){
    let id = req.body.id;
   
    Staff.findAll({
        where: {id:id},
		attributes: ['id', 'first', 'last'],
		include: [{
            model:Class,
            required: true,
			// attributes: ['id', 'name', 'day'],
			// through: {
            //     attributes: ['StaffId', 'ClassId'],
            //     // where:{ClassId:1}
			// }
		  }]
	}).then(classes => {
	   res.send(classes);
	});
}
module.exports.teachersCurrentClasses = teachersCurrentClasses;

const teachersClassStudents =  function(req, res){
    let email = req.body.email;
    let name = req.body.name;

    Staff.findAll({
        where: {email:email},
		attributes: ['id', 'first', 'last'],
		include: [{
            model:Class,
            where: {name:name},
            attributes: ['id', 'name', 'day', 'hour'],
            required: true,
                include: [
                    {
                        model:Student,
                        attributes: ['id', 'first', 'last'],
                    }
                ]
		  }]
	}).then(classes => {
	   res.send(classes);
	});
}
module.exports.teachersClassStudents = teachersClassStudents;

const logout =  function(req, res){
    
    res.clearCookie('jwt', '', { path: '/' });;
    res.json({'success' : true, message : 'logout'});
}
module.exports.logout = logout;
/*jshint ignore:end*/
